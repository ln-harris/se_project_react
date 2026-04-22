export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/day-clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/day-cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/day-fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/day-rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/day-snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/day-storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/night-clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/night-cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/night-fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/night-rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/night-snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/night-storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/day-default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/night-default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 33.47176806151393,
  longitude: -112.07963518718614,
};

export const apiKey = "773e187b6dae27c2c74d1474b57dc9e1";
