import axios from "axios";
import { get } from "./defaults";
const flaskBaseUrl = "http://127.0.0.1:8080";
const baseUrl = "https://code.highcharts.com/mapdata/";
/* Helper Function
 * To get the countries of a specific region
 * */
export const getWorld = async () => {
  return await axios.get(baseUrl + "custom/world.geo.json");
};

export const getBarStatistics = async () => {
  return get(flaskBaseUrl + "/get-bar-chart-values");
};
