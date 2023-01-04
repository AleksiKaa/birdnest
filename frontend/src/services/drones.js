import axios from "axios";

const getAll = () => {
  const request = axios.get("/api");
  return request.then((response) => response.data);
};

const getDrone = (sn) => {
  const request = axios.get(`/api/${sn}`);
  return request.then((response) => response.data);
};

const droneService = { getAll: getAll, getDrone: getDrone };

export default droneService;
