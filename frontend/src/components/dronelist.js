import Drone from "./drone";

const DroneList = ({ drones }) => {
  return (
    <div>
      <p>List of drones in no-fly zone:</p>
      {drones.map((drone) => {
        return <Drone key={drone.serialNumber} droneSN={drone.serialNumber} />;
      })}
    </div>
  );
};

export default DroneList;
