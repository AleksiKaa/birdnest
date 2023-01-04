import { useState, useEffect } from "react";
import droneService from "../services/drones";

const Drone = ({ droneSN }) => {
  const [drone, setDrone] = useState({});

  useEffect(() => {
    droneService.getDrone(droneSN).then((response) => {
      setDrone(response.data);
    });
    console.log(drone)
  }, []);

  return (
    <div>
      <ul>
        <li>Pilot name: </li>
        <li>Email: </li>
        <li>Phone number: </li>
        <li>Closest distance to birdnest:</li>
      </ul>
    </div>
  );
};

export default Drone;
