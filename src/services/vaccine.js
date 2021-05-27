// import axios from "axios";
import { get } from "./defaults";
const baseUrl = "http://127.0.0.1:8080";
export const getVaccineCountries = async () => {
  return get(baseUrl + "/get-vaccination-countries");
};

export const getVaccineCountryData = async (options) => {
  const queryString = new URLSearchParams(options).toString();
  return get(baseUrl + `/get-vacc-time-chart-values?${queryString}`);
};

export const getVaccineCountryValues = async () => {
  return get(baseUrl + `/get-vacc-country-values`);
};
