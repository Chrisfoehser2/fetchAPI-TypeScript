import "./home.css";
import { useState, useEffect } from "react";
import { getBreeds, getDogData, getDogIds } from "../../data/dogData";
import {
  Default_Search,
  Sort,
  Max_Age,
  Min_Age,
  Age_Menu,
} from "../../data/data";
import SearchFilters from "../../componets/SearchFilters";
import DogCards from "../dog cards/DogCards";
import PagePagination from "../../componets/PagePagination";
import {
  getCities,
  getCityByState,
  getLocation,
  getStates,
} from "../../data/locationData";
import Alert from "react-bootstrap/Alert";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [selectedSort, setSelectedSort] = useState(Sort[0]);
  const [selectedDogCards, setSelectedDogCards] = useState<string[]>([]);
  const [nextPage, setNextpage] = useState("");
  const [prevPage, setPrevpage] = useState("");
  const [curPage, setCurPage] = useState(Default_Search);
  const [total, setTotal] = useState(0);
  const [maxAge, setMaxAge] = useState(Max_Age);
  const [minAge, setMinAge] = useState(Min_Age);

  const [selectedStates, setSelectedStates] = useState([]);
  const [cities, setCities] = useState(getCities);
  const [selectedcity, setSelectedcity] = useState();
  const [ageAlert, setAgeAlert] = useState(false);
  const [alert, setAlert] = useState(false);

  const { setDogMatch, loggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    let query = Default_Search + `sort=breed:${selectedSort.value}&`;
    getBreeds().then((data) => setDogBreeds(data));
    fetchDogs(query);
  }, []);

  useEffect(() => {
    // @ts-expect-error -- TODO: Variable 'cities' implicitly has type 'any[]' in some locations where its type cannot be determined.
    const cities = [];
    selectedStates.forEach(
      (state: any) =>
        cities.push(...getCityByState(state.value).map((city) => city.name)) // Error on .value
    );
    // @ts-expect-error -- TODO: Variable 'cities' implicitly has an 'any[]' type.
    setCities(cities);
  }, [selectedStates]);

  const fetchDogs = (query: string) => {
    getDogIds(query).then((data) => {
      setTotal(data.total);
      setNextpage(data.next);
      setPrevpage(data.prev);
      getDogData(data.resultIds).then((data) => {
        let arr = data.map((dog: string[]) => {
          return { ...dog, isSelected: false };
        });
        setDogs(arr);
      });
    });
  };

  const getCurrPage = (pageNumber: number) => {
    const from = (pageNumber - 1) * 30;
    fetchDogs(curPage + `sort=breed:${selectedSort.value}&` + "from=" + from);
  };
  const getNextPage = () => {
    fetchDogs(nextPage + `sort=breed:${selectedSort.value}&`);
  };
  const getPrevPage = () => {
    fetchDogs(prevPage + `sort=breed:${selectedSort.value}&`);
  };

  const getZipCodes = async () => {
    const locations = await getLocation(selectedStates, selectedcity);
    return locations.results.map(
      (location: { zip_code: string }) => location.zip_code
    );
  };

  // @ts-expect-error -- TODO: Parameter 'data' implicitly has an 'any' type.
  const handleSelectedStates = (data) => {
    setSelectedStates(data);
  };

  const handleSelectedCity = (data: {
    value: (prevState: undefined) => undefined;
  }) => {
    setAlert(false);
    // @ts-expect-error -- TODO: Argument of type '"" | ((prevState: undefined) => undefined)' is not assignable to parameter of type '(prevState: undefined) => undefined'.
    setSelectedcity(data ? data.value : "");
  };

  // @ts-expect-error -- TODO: Parameter 'data' implicitly has an 'any' type.
  const handleSelectedBreeds = (data) => {
    setSelectedBreeds(data);
  };

  const handleMatch = async () => {
    setDogMatch(selectedDogCards);
  };
  // TODO: Parameter 'breed' implicitly has an 'any' type.

  type BreedProps = {
    value: string[];
  };

  const getSearchQuery = (zipCodes: string[]) => {
    let query = Default_Search + `sort=breed:${selectedSort.value}&`;
    query += selectedBreeds
      .map((breed: BreedProps) => `dogBreeds=${breed.value}&`)
      .join("");
    query += zipCodes.map((zipcode) => `zipCodes=${zipcode}&`).join("");
    return query + `ageMin=${minAge.value}&ageMax=${maxAge.value}&`;
  };

  const handleSearch = async () => {
    if (minAge.value > maxAge.value) {
      setAgeAlert(true);
      return;
    }
    setAgeAlert(false);
    if (selectedStates.length > 0 && !selectedcity) {
      setAlert(true);
      return;
    }
    let zipCodes = [];
    if (selectedcity) {
      zipCodes = await getZipCodes();
      if (zipCodes.length === 0) {
        setTotal(0);
        setDogs([]);
        return;
      }
    }
    const query = getSearchQuery(zipCodes);
    console.log(query);
    setCurPage(query);
    fetchDogs(query);
  };

  return (
    <div className="dog-search-wrapper">
      <div className="dog-search-container">
        <div className="dog-search-filters ">
          <div className="find-match">
            <button
              onClick={handleMatch}
              disabled={selectedDogCards.length === 0}
            >
              Find a Match
            </button>
          </div>

          <div className="dog-search-filters-header">
            <h3>Filters</h3>

            <button onClick={handleSearch}>Search</button>
          </div>

          <SearchFilters
            name="MIN AGE"
            data={Age_Menu}
            value={[minAge]}
            onChange={setMinAge}
          />

          <SearchFilters
            name="MAX AGE"
            data={Age_Menu}
            value={[maxAge]}
            onChange={setMaxAge}
          />
          {ageAlert && (
            <Alert
              variant="danger"
              onClose={() => setAgeAlert(false)}
              dismissible
            >
              <p>Maximum Age Cannot be less than Minimum Age</p>
            </Alert>
          )}

          <SearchFilters
            name="SORT BY"
            options={Sort}
            value={[selectedSort]}
            onChange={setSelectedSort}
          />

          <>
            <SearchFilters
              name="BREEDS"
              data={dogBreeds}
              placeholder="All Breeds"
              value={selectedBreeds}
              onChange={handleSelectedBreeds}
              isMulti
            />
          </>

          <>
            <SearchFilters
              name="STATES"
              data={getStates}
              placeholder="All States"
              value={selectedStates}
              onChange={handleSelectedStates}
              isMulti
            />
          </>

          <>
            <SearchFilters
              name="CITIES"
              data={cities}
              placeholder="Select City"
              onChange={handleSelectedCity}
              isClearable={true}
            />
          </>

          <div className="alert-message">
            {alert && (
              <Alert
                variant="danger"
                onClose={() => setAlert(false)}
                dismissible
              >
                <p>Please select a city</p>
              </Alert>
            )}
          </div>
        </div>

        <div className="dog-search-page">
          <DogCards
            dogs={dogs}
            selectedDogCards={selectedDogCards}
            setSelectedDogCards={setSelectedDogCards}
          />

          <PagePagination
            onPageChange={getCurrPage}
            nextPage={getNextPage}
            prevPage={getPrevPage}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
