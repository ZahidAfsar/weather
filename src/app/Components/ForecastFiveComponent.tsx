import { INextFiveDays } from "@/Interface/Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ForecastFiveComponent = (props: INextFiveDays) => {
  return (
    <div className="pt-4 ps-2 w-full">
      <div className="bgTransparent rounded-md 2xl:py-5">
        <div className="h-14 p-8">
          <h2 className="font-Nunito text-center font-semibold text-2xl">
            5 Day Forecast
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-around pt-10 pb-8 overflow-x-auto">
          <div className="flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap md:mx-5">
            <p className="font-Nunito font-light text-lg">{props.firstDayDate}</p>
            <FontAwesomeIcon icon={props.firstDayWeatherIcon} className="text-4xl" />
            <div className="flex gap-3">
              <p className="font-Nunito font-light text-md tracking-wide">
                H: {props.firstDayWeatherHighTemp} °
              </p>
              <p className="font-Nunito font-light text-md tracking-wide">
                L: {props.firstDayWeatherLowTemp} °
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap md:mx-5">
            <p className="font-Nunito font-light text-lg">{props.secondDayDate}</p>
            <FontAwesomeIcon icon={props.secondDayWeatherIcon} className="text-4xl" />
            <div className="flex gap-3">
              <p className="font-Nunito font-light text-md tracking-wide">
                H: {props.secondDayWeatherHighTemp} °
              </p>
              <p className="font-Nunito font-light text-md tracking-wide">
                L: {props.secondDayWeatherLowTemp} °
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap md:mx-5">
            <p className="font-Nunito font-light text-lg">
              {props.thirdDayDate}
            </p>
            <FontAwesomeIcon icon={props.thirdDayWeatherIcon} className="text-4xl" />
            <div className="flex gap-3">
              <p className="font-Nunito font-light text-md tracking-wide">
                H: {props.thirdDayWeatherHighTemp} °
              </p>
              <p className="font-Nunito font-light text-md tracking-wide">
                L: {props.thirdDayWeatherLowTemp} °
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap md:mx-5">
            <p className="font-Nunito font-light text-lg">
              {props.fourthDayDate}
            </p>
            <FontAwesomeIcon icon={props.fourthDayWeatherIcon} className="text-4xl" />
            <div className="flex gap-3">
              <p className="font-Nunito font-light text-md tracking-wide">
                H: {props.fourthDayWeatherHighTemp} °
              </p>
              <p className="font-Nunito font-light text-md tracking-wide">
                L: {props.fourthDayWeatherLowTemp} °
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap md:mx-5">
            <p className="font-Nunito font-light text-lg">
              {props.fifthDayDate}
            </p>
            <FontAwesomeIcon icon={props.fifthDayWeatherIcon} className="text-4xl" />
            <div className="flex gap-3">
              <p className="font-Nunito font-light text-md tracking-wide">
                H: {props.fifthDayWeatherHighTemp} °
              </p>
              <p className="font-Nunito font-light text-md tracking-wide">
                L: {props.fifthDayWeatherLowTemp} °
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastFiveComponent;
