import { Location, Permissions } from "expo";
const haversine = require("haversine");

export const calculateDistance = (start, end) => {
  return haversine(start, end);
};

export const getLocationAsync = async () => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("Ah! we can't access your location!");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    return coords;
  } catch (e) {
    console.log("e =>", e);
    throw e;
  }
};

export const measureDistance = (services, currentLocation) => {
  const arr = [];
  for (let i = 0; i < services.length; i++) {
    const distance = calculateDistance(currentLocation, services[i].location);
    console.log("distance =>", distance);

    if (distance <= 10) {
      arr.push({ ...services[i].location, title: services[i].title });
    }
  }
};
