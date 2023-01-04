const express = require("express");
const axios = require("axios");
const xml2json = require("xml2js");
const utils = require("./utils")

const app = express();

let dronebase = [];

/*Fetch data from API and append the objects to local database if
  object is not already in database. If object is in database,
  check if the new reading is closer than the old one. In this
  case, update the values. Additionally removes entries over 10 minutes old.*/
const fetchData = () => {
  const request = axios.get("https://assignments.reaktor.com/birdnest/drones");
  request.then((response) => {
    xml2json.parseString(response.data, (error, result) => {
      const timestamp = result.report.capture.at(0).$.snapshotTimestamp;
      const dronesJSON = result.report.capture.at(0).drone;

      const drones = dronesJSON.map((drone) => {
        const obj = {};
        obj.timestamp = timestamp;
        obj.serialNumber = drone.serialNumber[0];
        //obj.model = drone.model[0];
        //obj.manufacturer = drone.manufacturer[0];
        //obj.mac = drone.mac[0];
        //obj.ipv4 = drone.ipv4[0];
        //obj.ipv6 = drone.ipv6[0];
        //obj.firmware = drone.ipv6[0];
        obj.positionX = Number(drone.positionX[0]);
        obj.positionY = Number(drone.positionY[0]);
        //obj.altitude = Number(drone.altitude[0]);

        return obj;
      });

      if (drones.length > 0) {
        for (let i = 0; i < drones.length; i++) {
          const current = drones[i];
          const indexInDroneBase = dronebase.findIndex(
            (obj) => obj.serialNumber === current.serialNumber
          );

          if (indexInDroneBase === -1) {
            if (utils.distanceToNest(current) < 100000) dronebase.push(current);
          } else if (
            utils.distanceToNest(current) <
            utils.distanceToNest(dronebase[indexInDroneBase])
          ) {
            dronebase[indexInDroneBase] = current;
          }
        }
      }

      dronebase = dronebase.filter((droneObj) => utils.isTenMinutesOld(droneObj));
    });
  });
};

setInterval(fetchData, 2000);

app.get("/api/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const request = axios.get(
    `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
  );
  request
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api", (req, res) => {
  res.status(200).json({drones: dronebase})
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
