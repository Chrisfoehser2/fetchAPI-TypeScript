import { Fetch_Api, Set_Options } from "./data";
// https://frontend-take-home-service.fetch.com/auth/logout
export const authLogOut = async () => {
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
export const authLogin = async (username, email) => {
  const payload = {
    name: username,
    email: email,
  };
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
