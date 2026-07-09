// 中国主要城市经纬度和模拟订单数据
export const chinaCities = [
  { name: '北京', lng: 116.46, lat: 39.92, orders: 8432, value: 3245600 },
  { name: '上海', lng: 121.48, lat: 31.22, orders: 10231, value: 4128000 },
  { name: '广州', lng: 113.23, lat: 23.16, orders: 7654, value: 2987000 },
  { name: '深圳', lng: 114.07, lat: 22.62, orders: 8921, value: 3564000 },
  { name: '杭州', lng: 120.19, lat: 30.26, orders: 6543, value: 2456000 },
  { name: '成都', lng: 104.06, lat: 30.67, orders: 5432, value: 1987000 },
  { name: '武汉', lng: 114.31, lat: 30.52, orders: 4321, value: 1654000 },
  { name: '南京', lng: 118.78, lat: 32.04, orders: 3876, value: 1423000 },
  { name: '重庆', lng: 106.54, lat: 29.59, orders: 4123, value: 1534000 },
  { name: '西安', lng: 108.95, lat: 34.27, orders: 3210, value: 1120000 },
  { name: '长沙', lng: 112.97, lat: 28.23, orders: 2876, value: 987000 },
  { name: '郑州', lng: 113.65, lat: 34.76, orders: 2987, value: 1034000 },
  { name: '天津', lng: 117.20, lat: 39.13, orders: 2765, value: 945000 },
  { name: '济南', lng: 117.00, lat: 36.65, orders: 2543, value: 876000 },
  { name: '青岛', lng: 120.38, lat: 36.07, orders: 2310, value: 812000 },
  { name: '苏州', lng: 120.62, lat: 31.32, orders: 3456, value: 1234000 },
  { name: '合肥', lng: 117.27, lat: 31.86, orders: 2198, value: 765000 },
  { name: '福州', lng: 119.30, lat: 26.08, orders: 1987, value: 698000 },
  { name: '厦门', lng: 118.10, lat: 24.46, orders: 1876, value: 654000 },
  { name: '南宁', lng: 108.33, lat: 22.84, orders: 1654, value: 587000 },
  { name: '昆明', lng: 102.73, lat: 25.04, orders: 1789, value: 623000 },
  { name: '贵阳', lng: 106.71, lat: 26.57, orders: 1543, value: 534000 },
  { name: '沈阳', lng: 123.38, lat: 41.80, orders: 2234, value: 789000 },
  { name: '大连', lng: 121.62, lat: 38.92, orders: 1987, value: 712000 },
  { name: '哈尔滨', lng: 126.63, lat: 45.75, orders: 1876, value: 654000 },
  { name: '长春', lng: 125.35, lat: 43.88, orders: 1654, value: 587000 },
  { name: '太原', lng: 112.53, lat: 37.87, orders: 1432, value: 502000 },
  { name: '石家庄', lng: 114.48, lat: 38.03, orders: 2134, value: 745000 },
  { name: '呼和浩特', lng: 111.65, lat: 40.82, orders: 876, value: 312000 },
  { name: '兰州', lng: 103.73, lat: 36.03, orders: 987, value: 345000 },
  { name: '西宁', lng: 101.74, lat: 36.56, orders: 654, value: 234000 },
  { name: '银川', lng: 106.27, lat: 38.47, orders: 765, value: 287000 },
  { name: '乌鲁木齐', lng: 87.68, lat: 43.77, orders: 1234, value: 432000 },
  { name: '拉萨', lng: 91.11, lat: 29.97, orders: 432, value: 156000 },
  { name: '海口', lng: 110.35, lat: 20.02, orders: 1123, value: 398000 },
  { name: '三亚', lng: 109.51, lat: 18.25, orders: 876, value: 312000 },
  { name: '南昌', lng: 115.89, lat: 28.68, orders: 2345, value: 823000 },
  { name: '宁波', lng: 121.54, lat: 29.87, orders: 2654, value: 934000 },
  { name: '无锡', lng: 120.30, lat: 31.57, orders: 2345, value: 834000 },
  { name: '东莞', lng: 113.75, lat: 23.02, orders: 3456, value: 1245000 },
  { name: '佛山', lng: 113.11, lat: 23.05, orders: 2987, value: 1054000 },
  { name: '温州', lng: 120.65, lat: 28.00, orders: 1876, value: 678000 },
  { name: '珠海', lng: 113.52, lat: 22.30, orders: 1234, value: 445000 },
  { name: '中山', lng: 113.38, lat: 22.52, orders: 1567, value: 567000 },
  { name: '惠州', lng: 114.40, lat: 23.08, orders: 1345, value: 478000 },
  { name: '烟台', lng: 121.39, lat: 37.53, orders: 1654, value: 589000 },
  { name: '泉州', lng: 118.58, lat: 24.93, orders: 1432, value: 512000 },
  { name: '南通', lng: 120.86, lat: 32.01, orders: 1876, value: 654000 },
  { name: '常州', lng: 119.95, lat: 31.79, orders: 1543, value: 543000 },
  { name: '徐州', lng: 117.20, lat: 34.27, orders: 1345, value: 478000 },
];

// 店铺核心数据
export const storeMetrics = {
  totalGMV: 18765432,
  totalOrders: 125643,
  totalCustomers: 89654,
  avgOrderValue: 149.3,
  conversionRate: 3.82,
  liveViewers: 23456,
  liveGMV: 12345678,
  videoGMV: 4567890,
  productCount: 567,
  storeScore: 4.87,
};

// 实时监测指标
export const monitoringMetrics = [
  {
    id: 'gmv',
    name: '实时GMV',
    value: 18765432,
    prefix: '¥',
    change: 12.5,
    trend: [120, 135, 148, 155, 142, 168, 180, 175, 190, 195, 210, 230],
    color: '#10B981',
  },
  {
    id: 'orders',
    name: '实时订单数',
    value: 125643,
    change: 8.3,
    trend: [80, 85, 90, 88, 95, 100, 98, 105, 110, 108, 115, 120],
    color: '#059669',
  },
  {
    id: 'viewers',
    name: '直播间观看',
    value: 23456,
    change: -3.2,
    trend: [150, 160, 155, 145, 140, 148, 155, 150, 145, 152, 148, 155],
    color: '#14B8A6',
  },
  {
    id: 'conversion',
    name: '转化率',
    value: 3.82,
    suffix: '%',
    change: 0.5,
    trend: [3.5, 3.6, 3.55, 3.7, 3.65, 3.75, 3.8, 3.78, 3.82, 3.85, 3.82, 3.82],
    color: '#34D399',
  },
  {
    id: 'refund',
    name: '退货率',
    value: 1.85,
    suffix: '%',
    change: -0.3,
    trend: [2.1, 2.0, 2.05, 1.95, 1.9, 1.88, 1.9, 1.86, 1.85, 1.82, 1.85, 1.85],
    color: '#047857',
    inverse: true,
  },
  {
    id: 'sku',
    name: '动销SKU数',
    value: 423,
    change: 5.7,
    trend: [380, 385, 390, 395, 400, 405, 408, 410, 415, 418, 420, 423],
    color: '#10B981',
  },
];

// 按时间周期的销售数据
export const salesDataByPeriod = {
  '7d': {
    dates: ['06/20', '06/21', '06/22', '06/23', '06/24', '06/25', '06/26'],
    gmv: [2345000, 2456000, 2187000, 2654000, 2891000, 3124000, 2987000],
    orders: [890, 920, 850, 1020, 1100, 1180, 1120],
    liveGMV: [1567000, 1654000, 1456000, 1789000, 1923000, 2100000, 1987000],
    videoGMV: [654000, 689000, 612000, 723000, 815000, 876000, 843000],
  },
  '30d': {
    dates: [
      '05/28', '05/31', '06/03', '06/06', '06/09',
      '06/12', '06/15', '06/18', '06/21', '06/24', '06/26',
    ],
    gmv: [
      2100000, 2230000, 2450000, 2380000, 2560000,
      2780000, 2900000, 3120000, 3250000, 3080000, 2987000,
    ],
    orders: [
      780, 830, 910, 880, 950,
      1030, 1080, 1160, 1210, 1150, 1120,
    ],
    liveGMV: [
      1400000, 1490000, 1630000, 1580000, 1710000,
      1860000, 1940000, 2080000, 2170000, 2050000, 1987000,
    ],
    videoGMV: [
      580000, 610000, 670000, 650000, 710000,
      770000, 800000, 870000, 910000, 870000, 843000,
    ],
  },
  '90d': {
    dates: [
      '03/29', '04/08', '04/18', '04/28', '05/08',
      '05/18', '05/28', '06/08', '06/18', '06/26',
    ],
    gmv: [
      1850000, 1920000, 2050000, 2180000, 2340000,
      2560000, 2780000, 2980000, 3120000, 2987000,
    ],
    orders: [
      690, 720, 770, 820, 880,
      960, 1040, 1120, 1180, 1120,
    ],
    liveGMV: [
      1230000, 1280000, 1370000, 1460000, 1560000,
      1710000, 1860000, 1980000, 2080000, 1987000,
    ],
    videoGMV: [
      510000, 530000, 570000, 610000, 670000,
      730000, 790000, 860000, 900000, 843000,
    ],
  },
};

// 品类分布数据
export const categoryData = [
  { name: '服饰鞋包', value: 3456000, percent: 24.5 },
  { name: '美妆护肤', value: 2876000, percent: 20.4 },
  { name: '食品饮料', value: 2134000, percent: 15.1 },
  { name: '家居日用', value: 1876000, percent: 13.3 },
  { name: '3C数码', value: 1654000, percent: 11.7 },
  { name: '母婴用品', value: 1234000, percent: 8.7 },
  { name: '运动户外', value: 898000, percent: 6.3 },
];

// 流量来源
export const trafficSourceData = [
  { name: '直播推荐', value: 42 },
  { name: '短视频', value: 28 },
  { name: '搜索', value: 15 },
  { name: '关注', value: 8 },
  { name: '其他', value: 7 },
];

// 时段分布（24小时）
export const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  orders: Math.floor(30 + Math.random() * 80 + (i >= 19 && i <= 22 ? 100 : 0) + (i >= 8 && i <= 10 ? 50 : 0)),
  gmv: Math.floor(5000 + Math.random() * 15000 + (i >= 19 && i <= 22 ? 20000 : 0)),
}));

// 直播场次数据
export const liveSessions = [
  { name: '早场 08:00', viewers: 12000, gmv: 890000, duration: 180 },
  { name: '午场 12:00', viewers: 18500, gmv: 1450000, duration: 240 },
  { name: '下午场 15:00', viewers: 22000, gmv: 1789000, duration: 240 },
  { name: '晚场 19:00', viewers: 45000, gmv: 3890000, duration: 300 },
  { name: '深夜场 22:00', viewers: 15000, gmv: 1120000, duration: 180 },
];

// 最新订单流（模拟实时推送）
export const generateRandomOrder = () => {
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '重庆', '西安'];
  const products = [
    '夏季连衣裙', '无线蓝牙耳机', '氨基酸洗面奶', '便携充电宝',
    '螺蛳粉6包装', '瑜伽垫加厚', '防晒霜SPF50', '智能手表',
    '坚果礼盒', '运动跑鞋',
  ];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const product = products[Math.floor(Math.random() * products.length)];
  const amount = (Math.floor(Math.random() * 5000) / 10 + 29).toFixed(1);
  return {
    id: Date.now() + Math.random(),
    city,
    product,
    amount: parseFloat(amount),
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
  };
};

// 访问码
export const ACCESS_CODE = 'DYSJ2026';
