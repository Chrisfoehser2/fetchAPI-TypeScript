import { Fetch_Api, Set_Options } from "./data";

//https://frontend-take-home-service.fetch.com/dogs/breeds
export const getBreeds = async () => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
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
export const getDogIds = async (search: string) => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
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
export const getDogData = async (dogIds: any[]) => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; body: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
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
// @ts-expect-error -- TODO: Cannot find name 'ContextProps'.
export const getMatch = async (dogIds: ContextProps) => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; body: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
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
