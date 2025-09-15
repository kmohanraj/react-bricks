import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const getDeviceType = (): DeviceType => {
  const width = window.innerWidth;
  if (width <= 767) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

export const useGetDevice = () => {
  const [device, setDevice] = useState<DeviceType>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};