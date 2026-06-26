import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const rafRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let startTime = null;

    const animate = (timestamp) => {
      if (!mountedRef.current) return;
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.floor(start + (end - start) * eased);

      if (progress < 1) {
        if (mountedRef.current) setCount(nextValue);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        if (mountedRef.current) setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [end, duration, start]);

  return count;
}

export function useCountUpFloat(end, duration = 2000, decimals = 2) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let startTime = null;

    const animate = (timestamp) => {
      if (!mountedRef.current) return;
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = parseFloat((end * eased).toFixed(decimals));

      if (progress < 1) {
        if (mountedRef.current) setCount(nextValue);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        if (mountedRef.current) setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [end, duration, decimals]);

  return count;
}
