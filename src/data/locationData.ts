import { State, City } from "country-state-city";
import { Set_Options, Fetch_Api } from "./data";

export const getStates = State.getStatesOfCountry("US").map(
  (state) => state.isoCode
);

export const getCities = City.getCitiesOfCountry("US");

export const getCityByState = (state) => {
  return City.getCitiesOfState("US", state);
};

export const getLocation = async (states, city) => {
  const payload = {
    states: states,
    city: city,
  };
  return fetch(Fetch_Api + "/locations/search", {
    ...Set_Options,
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((e) => {
      throw e;
    });
};
