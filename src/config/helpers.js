import { Location, Permissions } from "expo";
import geolib from "geolib";

const checkDistance = async (start, end) => {
  const inCircule = await geolib.isPointInCircle(start, end, 1000);
  console.log(inCircule);
  return inCircule;
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

export const measureDistance = async (services, currentLocation) => {
  const arr = [];
  for (let i = 0; i < services.length; i++) {
    const distance = await checkDistance(currentLocation, services[i].location);
    console.log("distance =>", distance);

    if (distance) {
      arr.push({ ...services[i].location, title: services[i].title });
    }
  }

  return arr;
};
