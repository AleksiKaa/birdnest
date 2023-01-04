import { useState, useEffect, useRef } from "react";
import droneService from "./services/drones";
import DroneList from "./components/dronelist";

const App = () => {
  const [deviceInformation, setDeviceInformation] = useState({});
  const [drones, setDrones] = useState({});

  useEffect(() => {
    droneService.getAll().then((data) => {
      setDeviceInformation(data.report.deviceInformation);
      setDrones(data.report.capture);
    });
  }, []);

  console.log(deviceInformation);

  console.log(drones);
  return (
    <div>
      <h1>Hello world!</h1>
      <DroneList drones={drones} />
    </div>
  );
};

export default App;
