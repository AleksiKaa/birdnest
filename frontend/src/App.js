import { useState, useEffect } from "react";
import droneService from "./services/drones";
import DroneList from "./components/dronelist";

const App = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    droneService.getAll().then((data) => {
      setDrones(data.drones);
    });
  }, []);

  return (
    <div>
      <h1>Birdnest</h1>
      <DroneList drones={drones} />
    </div>
  );
};

export default App;
