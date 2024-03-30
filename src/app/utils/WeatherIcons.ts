import {
  faCloudShowersHeavy,
  faSun,
  faSnowflake,
  faCloud,
  faCloudRain,
  faBoltLightning,
  faTornado,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

export const WeatherIcon = (weather: string) => {
  switch (weather) {
    case "Clear":
      return faSun;
    case "Clouds":
      return faCloud;
    case "Thunderstorm":
      return faBoltLightning;
    case "Drizzle":
      return faCloudRain;
    case "Rain":
      return faCloudShowersHeavy;
    case "Tornado":
      return faTornado;
    case "Snow":
      return faSnowflake;
    default:
      return faSmog;
  }
}
