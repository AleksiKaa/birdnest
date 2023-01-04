const express = require("express");
const axios = require("axios");
const xml2json = require("xml2js");

const app = express();

app.get("/api/:sn", (req, res) => {
  const serialNumber = req.params.sn
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
  const request = axios.get("https://assignments.reaktor.com/birdnest/drones");
  request
    .then((response) => {
      xml2json.parseString(response.data, (error, result) => {
        res.json(result);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
