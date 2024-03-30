import { ICurrentWeather } from "@/Interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import {
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorage,
  removeLocalStorage,
  savLocalStorage,
} from "../utils/localStorage";

const CurrentWeatherComponent = (props: ICurrentWeather) => {
  const [heartIcon, setHeartIcon] = useState<any>();

  const handleClickHeart = () => {
    const favorites = getLocalStorage();

    if (favorites.includes(`${props.city}, ${props.state}`)) {
      removeLocalStorage(`${props.city}, ${props.state}`);
      setHeartIcon(faHeart);
    } else {
      savLocalStorage(`${props.city}, ${props.state}`);
      setHeartIcon(faSolidHeart);
    }
  };

  useEffect(() => {
    const favorites = getLocalStorage();
    if (favorites.includes(`${props.city}, ${props.state}`)) {
      setHeartIcon(faSolidHeart);
    } else {
      setHeartIcon(faHeart);
    }
  });

  return (
    <div className="pt-20 ps-2 w-full">
      <div className="bg-blue-800 flex justify-between items-center rounded-t-md h-14 p-4">
        <h2 className="font-Nunito font-semibold text-2xl">
          {props.city}, {props.state}
        </h2>
        <button onClick={handleClickHeart}>
          <FontAwesomeIcon icon={heartIcon} className="text-2xl" />
        </button>
      </div>

      <div className="bgTransparent w-full rounded-b-md 2xl:py-4">
        <div className="flex justify-evenly items-center py-14 2xl:py-16 px-2">
          <FontAwesomeIcon icon={props.currentIcon} className="text-7xl" />
          <p className="font-Nunito text-7xl ">{props.currentTemp} °F</p>
        </div>

        <div className="flex justify-between items-center pb-5 px-5">
          <p className="font-Nunito font-regular">
            {props.description}
          </p>
          <div className="flex gap-2">
            <p className="font-Nunito font-light text-lg tracking-wide">
              H: {props.todayHigh} °
            </p>
            <p className="font-Nunito font-light text-lg tracking-wide">
              L: {props.todayLow} °
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
