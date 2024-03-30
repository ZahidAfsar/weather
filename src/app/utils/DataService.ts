import { IDataWeather, ILocationData, IWeather, IUnitedStatesWeather } from "@/Interface/Interface";


export const getWeatherUnitedStates = async (searchValue: string) => {
    let stateCode = "";
    let limit = 5;
    let countryCode = "US";

    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue},${stateCode},${countryCode}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_WEATHER}`);
    const data: IUnitedStatesWeather[] = await promise.json();
    return data;
}

export const getCurrentWeather = async (userLat: number, userLon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${process.env.NEXT_PUBLIC_WEATHER}&units=imperial`);
    const data: IWeather = await promise.json();
    return data;
};


export const getWeatherReverse = async (userLat: number, userLon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${userLat}&lon=${userLon}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER}`)
    const data: ILocationData = await promise.json();
    return data;
};

export async function getWeatherFiveDays(userLat: number, userLon: number) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&appid=${process.env.NEXT_PUBLIC_WEATHER}&units=imperial`);
    const data: IDataWeather = await promise.json();
    return data;
}
