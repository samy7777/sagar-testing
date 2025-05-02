// hooks/useDeviceInfoAndLocation.js
import { useEffect, useState } from "react";
import DeviceDetector from "device-detector-js";

const useDeviceInfoAndLocation = () => {
  const [deviceInfo, setDeviceInfo] = useState({ deviceName: "", deviceType: "" });
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    const getDeviceInfo = () => {
      const deviceDetector = new DeviceDetector();
      const userAgent = navigator.userAgent;
      const device = deviceDetector.parse(userAgent);
      const deviceType = device.device.type + ", " + device.os.name + ", " + device.os.version + ", " + device.client.name + ", " + device.client.type || "Unknown";
      const deviceName = device.device.model || device.device.brand || "Unknown Device";
      setDeviceInfo({ deviceName, deviceType });
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        });
      }
    };

    getDeviceInfo();
    getLocation();
  }, []);

  return { deviceInfo, location };
};

export default useDeviceInfoAndLocation;
