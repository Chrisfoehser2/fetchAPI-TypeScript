import { useEffect, useState } from "react";
import { getDogData, getMatch } from "../data/dogData";
import DogData from "./dog cards/DogData";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./dog cards/dogs.css";

function DogFound() {
  const [finalDog, setFinalDog] = useState({});
  const { selectedDogs } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    getMatch(selectedDogs).then((data) => {
      getDogData([data.match]).then((data) => {
        setFinalDog(data[0]);
      });
    });
  }, []);

  return (
    <div>
      <div className="dog-found-container">
        <div>
          <h3>Congratulations!, You found a new family member</h3>
          <div className="dog-found">
            <DogData dog={finalDog} />
          </div>

          <div className="go-home-button">
            <button onClick={() => navigate("/home")}>Go to Homepage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogFound;
