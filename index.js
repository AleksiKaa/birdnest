const express = require("express");
const axios = require("axios");
const convert = require("xml-js");

const app = express();

let notes = [{ kakka: "pillu" }];

app.get("/", (req, res) => {
  const request = axios.get("https://assignments.reaktor.com/birdnest/drones");
  request
    .then((response) => {
      const converted = convert.xml2json(response.data, {
        compact: false,
        space: 2,
      });
      res.json(JSON.parse(converted));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/:id", (req, res) => {
    const request = axios.get("https://assignments.reaktor.com/birdnest/drones");
    request
      .then((response) => {
        const converted = convert.xml2json(response.data, {
          compact: false,
          space: 2,
        });
        res.json(JSON.parse(converted));
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
