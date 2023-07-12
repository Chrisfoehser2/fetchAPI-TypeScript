import { Fetch_Api, Set_Options } from "./data";
// https://frontend-take-home-service.fetch.com/auth/logout
export const authLogOut = async () => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
  return fetch(Fetch_Api + "/auth/logout", {
    ...Set_Options,
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
    })
    .catch((e) => {
      throw e;
    });
};

//https://frontend-take-home-service.fetch.com/auth/login
export const authLogin = async (username: string, email: string) => {
  const payload = {
    name: username,
    email: email,
  };
// @ts-expect-error -- TODO: Argument of type '{ method: string; body: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
  return fetch(Fetch_Api + "/auth/login", {
    ...Set_Options,
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const checkLogin = async () => {
// @ts-expect-error -- TODO: Argument of type '{ method: string; credentials: string; mode: string; cache: string; headers: Headers; referrerPolicy: string; }' is not assignable to parameter of type 'RequestInit'.
  return fetch(Fetch_Api, Set_Options)
    .then((response) => {
      if (response.status !== 401) {
        return response;
      } else {
        throw new Error("Logged Out");
      }
    })
    .catch((e) => {
      throw e;
    });
};
