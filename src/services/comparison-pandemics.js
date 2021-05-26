import { get } from "./defaults";
const flaskBaseUrl = "http://127.0.0.1:8080";

export const getSwineCountries = async () => {
  return get(flaskBaseUrl + `/get-swine-countries`);
};

export const getEbolaCountries = async () => {
  return get(flaskBaseUrl + `/get-ebola-countries`);
};

export const getSARSCountries = async () => {
  return get(flaskBaseUrl + `/get-sars-countries`);
};
export const get100DaysData = async () => {
  return get(flaskBaseUrl + `/get-pandemic-100-days-results`);
};
export const get100DeathsDaysData = async () => {
  return get(flaskBaseUrl + `/get-pandemic-100-days-deaths-results`);
};
