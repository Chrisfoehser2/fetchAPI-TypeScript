const Fetch_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";

const header = new Headers({
  "Content-Type": "application/json",
  "fetch-api-key": Fetch_Api_Key,
});

const Fetch_Api = "https://frontend-take-home-service.fetch.com";

const Set_Options = {
  method: "GET",
  credentials: "include",
  mode: "cors",
  cache: "default",
  headers: header,
  referrerPolicy: "origin-when-cross-origin",
};

const Default_Search = "/dogs/search?";
const Max_Page = 12;
const Data_Per_Page = 30;
const Filters = ["Breeds", "States", "Cities"];
const Sort = [
  { value: "asc", label: "A to Z" },
  { value: "desc", label: "Z to A" },
];
const Max_Age = { value: 14, label: 14 };
const Min_Age = { value: 1, label: 1 };
const Age_Menu = Array.from({ length: Max_Age.value }, (_, i) => i + 1);

export {
  Fetch_Api,
  Set_Options,
  Default_Search,
  Max_Page,
  Data_Per_Page,
  Filters,
  Sort,
  Max_Age,
  Min_Age,
  Age_Menu,
};
