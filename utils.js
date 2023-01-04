/*Calculates the distance to the nest*/
const distanceToNest = (droneObj) => {
  const nestX = 250000;
  const nestY = 250000;
  droneX = droneObj.positionX;
  droneY = droneObj.positionY;

  distToNest = Math.sqrt(
    Math.pow(nestX - droneX, 2) + Math.pow(nestY - droneY, 2)
  );

  return distToNest;
};

/*Boolean indicating if reading is over ten minutes old*/
const isTenMinutesOld = (droneObj) => {
  timestamp = droneObj.timestamp;
  date = new Date(timestamp);
  ten = date.getTime() + 10 * 60000;

  return ten > Date.now();
};

module.exports = {
  distanceToNest: distanceToNest,
  isTenMinutesOld: isTenMinutesOld,
};
