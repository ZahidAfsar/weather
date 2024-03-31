import { IDataWeather, IWeather } from "@/Interface/Interface";

export const formatDate = (futureDate: Date) => {
    return futureDate.toLocaleDateString('en-US', { weekday: "long", month: "short", day: "numeric" });
}

export const getDates = (currentWeatherData: IWeather) => {
    let todayTime = currentWeatherData.dt;
    let dateTimeToday = new Date(todayTime * 1000);
    let dateTimeFiveDays = [];
    for (let i = 1; i <= 5; i++) {
        dateTimeFiveDays.push(new Date(dateTimeToday.getTime() + (24 * 60 * 60 * 1000 * i)));
    }
    return dateTimeFiveDays;
}

const currentConditionsWeather = (arr: string[]) => {
    let count = 1, maxLimit = 0, element;
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] === arr[i - 1]) {
            count++;
        } else {
            count = 1;
        }
        if (count > maxLimit) {
            maxLimit = count;
            element = arr[i];
        }
    }
    return element || '';
}

export const ForecastWeatherData = (hourlyWeatherData: IDataWeather, dateTimeFiveDays: Date[]) => {
    if (!hourlyWeatherData.list || !Array.isArray(hourlyWeatherData.list)) {
      console.error('Current weather data is not available');
      return [];
  }
      const highTemps: number[][] = [];
      const lowTemps: number[][] = [];
      const weatherIcons: string[][] = [];
      for (let i = 0; i < dateTimeFiveDays.length; i++) {
          highTemps[i] = [];
          lowTemps[i] = [];
          weatherIcons[i] = [];
      }
      for (const date of dateTimeFiveDays) {
          const dateString = date.toLocaleDateString('default');
          for (const weather of hourlyWeatherData.list) {
              const unixFutureTime = new Date(weather.dt * 1000).toLocaleDateString('default');
              if (unixFutureTime === dateString) {
                  const index = dateTimeFiveDays.findIndex(d => d.toLocaleDateString('default') === dateString);
                  if (index !== -1) {
                      pushDataToDay(hourlyWeatherData, index, highTemps[index], lowTemps[index], weatherIcons[index]);
                  }
              }
          }
      }
      const weatherIconDay = weatherIcons.map(array => currentConditionsWeather(array));
      const CurrentDayHighTemp = highTemps.map(array => (Math.round(Math.max(...array))).toString());
      const CurrentDayLowTemp = lowTemps.map(array => (Math.round(Math.min(...array))).toString());
      const allArraysSpread = [...weatherIconDay, ...CurrentDayHighTemp, ...CurrentDayLowTemp];
      return allArraysSpread;
  }

const pushDataToDay = (data: IDataWeather, i: number, highTempArray: number[], lowTempArray: number[], weatherTempsArray: string[]) => {
    highTempArray.push(data.list[i].main.temp_max);
    lowTempArray.push(data.list[i].main.temp_min);
    weatherTempsArray.push(data.list[i].weather[0].main);
}
