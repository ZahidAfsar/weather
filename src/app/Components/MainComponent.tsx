"use client";

import { WeatherIcon } from "../utils/WeatherIcons";
import {
  getCurrentWeather,
  getWeatherFiveDays,
  getWeatherReverse,
  getWeatherUnitedStates,
} from ".././utils/DataService";
import {
    formatDate,
    getDates,
    ForecastWeatherData,
  } from ".././utils/CurrentDate";
import {
  IDataWeather,
  ILocationData,
  IWeather,
} from "@/Interface/Interface";
import { StateNames } from ".././utils/States";
import ForecastFiveComponent from "./ForecastFiveComponent";
import { Button, Modal } from "flowbite-react";

import { faCircleXmark, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorage,
  removeLocalStorage,
} from ".././utils/localStorage";
import CurrentWeatherComponent from "./CurrentWeatherComponent";
import SearchBarComponent from "../Components/SearchBarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";


export default function MainComponent() {
  const [date, setDate] = useState<string>("March 30, 2024");
  const [time, setTime] = useState<string>("1:23 AM PST");
  const [citySearch, setCitySearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");


  const handleSearch = () => {
    if (searchValue) {
      setCitySearch(searchValue);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchValue) {
        setCitySearch(searchValue);
      }
    }
  };
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [locationData, setLocationData] = useState<ILocationData>();
  const [fivedayweatherdata, setfivedayweatherdata] = useState<IDataWeather>();
  const [lat, setLat] = useState<number>(37.961632);
  const [long, setLong] = useState<number>(-121.275604);

  const [firstDayDate, setfirstDayDate] = useState<string>(""),
    [firstDayWeatherIcon, setfirstDayWeatherIcon] = useState<any>(faSun);
  const [firstDayWeatherHighTemp, setfirstDayWeatherHighTemp] = useState<string>(""),
    [firstDayWeatherLowTemp, setfirstDayWeatherLowTemp] = useState<string>("");

  const [secondDayDate, setsecondDayDate] = useState<string>(""),
    [secondDayWeatherIcon, setsecondDayWeatherIcon] = useState<any>(faSun);
  const [secondDayWeatherHighTemp, setsecondDayWeatherHighTemp] = useState<string>(""),
    [secondDayWeatherLowTemp, setsecondDayWeatherLowTemp] = useState<string>("");

  const [thirdDayDate, setthirdDayDate] = useState<string>(""),
    [thirdDayWeatherIcon, setthirdDayWeatherIcon] = useState<any>(faSun);
  const [thirdDayWeatherHighTemp, setthirdDayWeatherHighTemp] = useState<string>(""),
    [thirdDayWeatherLowTemp, setthirdDayWeatherLowTemp] = useState<string>("");

  const [fourthDayDate, setfourthDayDate] = useState<string>(""),
    [fourthDayWeatherIcon, setfourthDayWeatherIcon] = useState<any>(faSun);
  const [fourthDayWeatherHighTemp, setfourthDayWeatherHighTemp] = useState<string>(""),
    [fourthDayWeatherLowTemp, setfourthDayWeatherLowTemp] = useState<string>("");

  const [fifthDayDate, setfifthDayDate] = useState<string>(""),
    [fifthDayWeatherIcon, setfifthDayWeatherIcon] = useState<any>(faSun);
  const [fifthDayWeatherHighTemp, setfifthDayWeatherHighTemp] = useState<string>(""),
    [fifthDayWeatherLowTemp, setfifthDayWeatherLowTemp] = useState<string>("");

  useEffect(() => {
    const success = (position: any) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      const getData = async () => {
        const data = await getCurrentWeather(lat, long);
        setWeatherData(data);
        const locationData = await getWeatherReverse(lat, long);
        setLocationData(locationData);
        const fiveDaysWeatherData = await getWeatherFiveDays(lat, long);
        setfivedayweatherdata(fiveDaysWeatherData);
      };
      getData();
    };

    const errorDefaultStocktonFunction = () => {
      setLat(37.961632);
      setLong(-121.275604);
    };

    navigator.geolocation.getCurrentPosition(success, errorDefaultStocktonFunction);
  }, []);


  useEffect(() => {
    const getData = async () => {
      const data = await getWeatherUnitedStates(citySearch);
      if (data && data.length > 0) {
        setLat(data[0].lat);
        setLong(data[0].lon);
      } else {
        window.alert("If You want to search a city outside of US. Search a city using City Name,Country Initials format. EX. Shibuya,JP ");
      }
    };
    getData();
  }, [citySearch]);

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
    setDate(currentDate);
    setTime(currentTime);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getCurrentWeather(lat, long);
      setWeatherData(data);
      const locationData = await getWeatherReverse(lat, long);
      setLocationData(locationData);
      const fiveDaysWeatherData = await getWeatherFiveDays(lat, long);
      setfivedayweatherdata(fiveDaysWeatherData);
    };
    getData();
  }, [lat, long]);

  useEffect(() => {
    if (weatherData && fivedayweatherdata) {
      const dateArray = getDates(weatherData);
      const setDateSetter = [
        setfirstDayDate,
        setsecondDayDate,
        setthirdDayDate,
        setfourthDayDate,
        setfifthDayDate,
      ];

      const fiveNextDaysArr = ForecastWeatherData(fivedayweatherdata, dateArray);
      const setIconSetter = [
        setfirstDayWeatherIcon,
        setsecondDayWeatherIcon,
        setthirdDayWeatherIcon,
        setfourthDayWeatherIcon,
        setfifthDayWeatherIcon,
      ];
      const setHighSetter = [
        setfirstDayWeatherHighTemp,
        setsecondDayWeatherHighTemp,
        setthirdDayWeatherHighTemp,
        setfourthDayWeatherHighTemp,
        setfifthDayWeatherHighTemp,
      ];
      const setLowSetter = [
        setfirstDayWeatherLowTemp,
        setsecondDayWeatherLowTemp,
        setthirdDayWeatherLowTemp,
        setfourthDayWeatherLowTemp,
        setfifthDayWeatherLowTemp,
      ];

      for (let i = 0; i < setDateSetter.length; i++) {
        setDateSetter[i](formatDate(dateArray[i]));
        setIconSetter[i](WeatherIcon(fiveNextDaysArr[i]));
        setHighSetter[i](fiveNextDaysArr[i + 5]);
        setLowSetter[i](fiveNextDaysArr[i + 10]);
      }
    }
  }, [weatherData, fivedayweatherdata]);

  const [favoritesArray, setFavoritesArray] = useState<string[]>([]);

  const removeFavorite = (locationToRemove: string) => {
    removeLocalStorage(locationToRemove);
    const updatedFavorites = getLocalStorage();
    setFavoritesArray(updatedFavorites);
  };

  useEffect(() => {
    const favorites = getLocalStorage();
    setFavoritesArray(favorites);
  }, []);

  const handleOpenFavorites = () => {
    setFavoritesArray(getLocalStorage());
    setOpenModal(true);
  }

  return (
    <main className="background min-w-full min-h-lvh">
      <SearchBarComponent
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        onSearch={handleSearch}
        onKeyDown={handleSearchKeyDown}
      />
      <div className="grid">
        <div className="pt-16 px-12 pb-10">
          <h1 className="flex font-Nunito justify-center textShadow text-4xl font-bold pb-4">
            Weather Forecast
          </h1>
          <p className="flex font-Nunito justify-center textShadow font-light text-xl tracking-wide pb-4">
            {date}
            <span className="tracking-widest"> | </span>
            {time}
          </p>
          <div className="flex justify-center">
            {" "}

            <Button className="bg-blue-800" onClick={handleOpenFavorites}>
              Favorites
            </Button>
          </div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Favorite Cities</Modal.Header>
            <Modal.Body>
              <div className="px-2 text-black">
                {favoritesArray.length > 0 ? (
                  favoritesArray.map((location: string, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-4 ${
                        index === favoritesArray.length - 1
                          ? ""
                          : "mb-1 border-b border-gray-700"
                      } `}
                    >
                      <span className="font-Nunito font-black text-xl">
                        {location}
                      </span>
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="cursor-pointer text-xl text-black hover:text-peach"
                        onClick={() => removeFavorite(location)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-7">
                    <p className="font-Nunito font-light text-xl pb-10">
                      No favorites saved
                    </p>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="bg-blue-800"
                onClick={() => setOpenModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {" "}
            <div>
              {weatherData && locationData && (
                <CurrentWeatherComponent
                  city={locationData[0].name} 
                  state={
                    locationData[0].state ? StateNames[locationData[0].state] : ""
                  }
                  currentIcon={WeatherIcon(weatherData.weather[0].main)}
                  currentTemp={Math.round(weatherData.main.temp)}
                  description={weatherData.weather[0].main.toLowerCase()}
                  todayHigh={Math.round(weatherData.main.temp_max)}
                  todayLow={Math.round(weatherData.main.temp_min)}
                />
              )}
            </div>
            <div>
              {weatherData && (
                <ForecastFiveComponent
                  firstDayDate={firstDayDate}
                  firstDayWeatherIcon={firstDayWeatherIcon}
                  firstDayWeatherHighTemp={firstDayWeatherHighTemp}
                  firstDayWeatherLowTemp={firstDayWeatherLowTemp}
                  secondDayDate={secondDayDate}
                  secondDayWeatherIcon={secondDayWeatherIcon}
                  secondDayWeatherHighTemp={secondDayWeatherHighTemp}
                  secondDayWeatherLowTemp={secondDayWeatherLowTemp}
                  thirdDayDate={thirdDayDate}
                  thirdDayWeatherIcon={thirdDayWeatherIcon}
                  thirdDayWeatherHighTemp={thirdDayWeatherHighTemp}
                  thirdDayWeatherLowTemp={thirdDayWeatherLowTemp}
                  fourthDayDate={fourthDayDate}
                  fourthDayWeatherIcon={fourthDayWeatherIcon}
                  fourthDayWeatherHighTemp={fourthDayWeatherHighTemp}
                  fourthDayWeatherLowTemp={fourthDayWeatherLowTemp}
                  fifthDayDate={fifthDayDate}
                  fifthDayWeatherIcon={fifthDayWeatherIcon}
                  fifthDayWeatherHighTemp={fifthDayWeatherHighTemp}
                  fifthDayWeatherLowTemp={fifthDayWeatherLowTemp}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
