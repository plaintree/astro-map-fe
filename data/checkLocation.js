const testData = require("./testData");

const checkLocation = (userLocation, eventCoordinates) => {
  // const filteredEvents = eventCoordinates.map((location) => {
  //   const filteredCoords = location.coordinateData.filter(
  //     (coordinate) =>
  //       coordinate.northCoordinates.latitude > userLocation.latitude &&
  //       coordinate.northCoordinates.longitude > userLocation.longitude &&
  //       coordinate.southCoordinates.latitude < userLocation.latitude &&
  //       coordinate.southCoordinates.longitude > userLocation.longitude
  //   );
  //   return filteredCoords;
  // });
  // return filteredEvents;

  return eventCoordinates
    .map((location) => location.coordinateData)
    .flat()
    .filter(
      (coor) => coor.northCoordinates !== null || coor.southCoordinates !== null
    )
    .filter(
      (coor) =>
        coor.northCoordinates?.latitude > userLocation.latitude &&
        coor.northCoordinates?.longitude < userLocation.longitude &&
        coor.southCoordinates?.latitude < userLocation.latitude &&
        coor.southCoordinates?.longitude > userLocation.longitude
    );
};
console.log(
  checkLocation({ latitude: 53.47944, longitude: -2.24528 }, testData)
);
//module.exports = { checkLocation };
