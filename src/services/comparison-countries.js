import { get } from "./defaults";
const baseUrl = "http://127.0.0.1:8080";
export const getCountriesComparisonResults = async (options) => {
  const queryString = new URLSearchParams(options).toString();
  return get(baseUrl + `/get-countries-compared-data?${queryString}`);
};
