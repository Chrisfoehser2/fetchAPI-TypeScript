import { Fetch_Api, Set_Options } from "./data";

//https://frontend-take-home-service.fetch.com/dogs/breeds
export const getBreeds = async () => {
  return fetch(Fetch_Api + "/dogs/breeds", Set_Options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .catch((e) => {
      throw e;
    });
};

//https://frontend-take-home-service.fetch.com/dogs/search
export const getDogIds = async (search) => {
  return fetch(Fetch_Api + search, Set_Options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .catch((e) => {
      throw e;
    });
};

//https://frontend-take-home-service.fetch.com/dogs //Save dogIds and Breeds in here to create DogCards
export const getDogData = async (dogIds) => {
  return fetch(Fetch_Api + "/dogs", {
    ...Set_Options,
    method: "POST",
    body: JSON.stringify(dogIds),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .catch((e) => {
      throw e;
    });
};

//https://frontend-take-home-service.fetch.com/dogs/match
export const getMatch = async (dogIds) => {
  return fetch(Fetch_Api + "/dogs/match", {
    ...Set_Options,
    method: "POST",
    body: JSON.stringify(dogIds),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .catch((e) => {
      throw e;
    });
};
