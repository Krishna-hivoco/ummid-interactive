const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve({ location, error: null });
        },
        (error) => {
          let errorMessage = "";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred.";
              break;
            default:
              errorMessage = "An error occurred.";
          }
          reject({ location: null, error: errorMessage });
        }
      );
    } else {
      reject({
        location: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  });
};

const getFullAddress = async () => {
  try {
    const { location, error } = await getLocation();
    if (error) {
      console.error(error);
      return;
    }
    const { latitude, longitude } = location;
    const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=20b9054705a24ddaab07d549592f6dc3`;
    const response = await fetch(reverseGeocodingUrl);
    const featureCollection = await response.json();
    if (featureCollection?.features?.length === 0) {
      console.log("The address is not found");
      return;
    }
    // console.log("Address: ", featureCollection);
    return featureCollection?.features[0].properties;
  } catch (err) {
    console.error(err);
  }
};

export { getFullAddress };
