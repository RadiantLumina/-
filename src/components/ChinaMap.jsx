import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { chinaCities } from '../data/mockData';

const CHINA_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';

export default function ChinaMap({ activeCities = [], highlightedCity }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load China map GeoJSON
  useEffect(() => {
    let cancelled = false;
    fetch(CHINA_GEO_URL)
      .then(r => r.json())
      .then(geo => {
        if (cancelled) return;
        try {
          echarts.registerMap('china', geo);
        } catch (e) {
          console.warn('China map registration failed:', e);
        }
        setMapLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setMapLoaded(true);
      });
    return () => { cancelled = true; };
  }, []);

  // Render chart
  useEffect(() => {
    if (!mapLoaded || !chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'canvas' });
    }

    const chart = chartInstance.current;
    const maxOrders = Math.max(...chinaCities.map(c => c.orders), 1);

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
        formatter: (params) => {
          if (params.seriesType === 'effectScatter' || params.seriesType === 'scatter') {
            const city = chinaCities.find(c => c.name === params.name);
            if (!city) return '';
            return `
              <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${city.name}</div>
              <div style="color:#a0aec0;">订单数：<span style="color:#10B981;">${city.orders.toLocaleString()}</span></div>
              <div style="color:#a0aec0;">GMV：<span style="color:#14B8A6;">¥${(city.value / 10000).toFixed(1)}万</span></div>
            `;
          }
          return params.name;
        },
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.15,
        center: [104.5, 35.5],
        aspectScale: 0.85,
        itemStyle: {
          areaColor: '#f1f5f9',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          shadowColor: 'rgba(0,0,0,0.02)',
          shadowBlur: 10,
        },
        emphasis: { disabled: true },
        label: { show: false },
      },
      series: [
        // Background dots — all cities
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: chinaCities.map(c => {
            const isActive = activeCities.includes(c.name);
            return {
              name: c.name,
              value: [c.lng, c.lat],
              itemStyle: {
                color: isActive ? getHeatColor(c.orders, maxOrders) : 'rgba(16, 185, 129, 0.15)',
                shadowBlur: isActive ? 15 : 0,
                shadowColor: getHeatColor(c.orders, maxOrders),
              },
            };
          }),
          symbolSize: (val) => {
            const city = chinaCities.find(c => c.name === val.name);
            return city ? 4 + (city.orders / maxOrders) * 12 : 4;
          },
          symbol: 'circle',
          label: {
            show: true,
            position: 'right',
            formatter: (p) => {
              const city = chinaCities.find(c => c.name === p.name);
              const isActive = activeCities.includes(p.name);
              if (!isActive || !city || city.orders < 1500) return '';
              return p.name;
            },
            fontSize: 10,
            color: '#475569',
            distance: 4,
          },
          animation: false,
        },
        // Ripple effect — active cities only
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: chinaCities
            .filter(c => activeCities.includes(c.name))
            .map(c => ({
              name: c.name,
              value: [c.lng, c.lat],
            })),
          symbolSize: (val) => {
            const city = chinaCities.find(c => c.name === val.name);
            return city ? 8 + (city.orders / maxOrders) * 8 : 8;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            scale: 2.5,
            period: 4,
            color: 'rgba(16, 185, 129, 0.5)',
          },
          itemStyle: {
            color: (p) => {
              const city = chinaCities.find(c => c.name === p.name);
              return getHeatColor(city?.orders || 0, maxOrders);
            },
          },
          zlevel: 1,
        },
      ],
    };

    try {
      chart.setOption(option, true);
    } catch (e) {
      console.warn('Chart setOption failed:', e);
    }

    const handleResize = () => {
      try { chart.resize(); } catch (e) { /* ignore */ }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapLoaded, activeCities, highlightedCity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={chartRef} className="w-full h-full" />
  );
}

function getHeatColor(count, max) {
  const ratio = Math.max(0.05, count / max);
  if (ratio < 0.15) return 'rgba(167, 243, 208, 0.9)';
  if (ratio < 0.3) return 'rgba(110, 231, 183, 0.9)';
  if (ratio < 0.5) return 'rgba(52, 211, 153, 0.9)';
  if (ratio < 0.7) return 'rgba(16, 185, 129, 0.9)';
  if (ratio < 0.85) return 'rgba(5, 150, 105, 0.95)';
  return 'rgba(4, 120, 87, 0.95)';
}
