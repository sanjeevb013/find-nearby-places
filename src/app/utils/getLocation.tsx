export const getCurrentLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
    } else {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true, // Ask for best accuracy
          timeout: 10000,           // Wait up to 10 seconds
          maximumAge: 0             // Don't use cached location
        }
      );
    }
  });
