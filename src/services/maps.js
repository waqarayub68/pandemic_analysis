import axios from "axios";

const baseUrl = "https://code.highcharts.com/mapdata/";
/* Helper Function
 * To get the countries of a specific region
 * */
export const getWorld = async () => {
  return await axios.get(baseUrl + "custom/world.geo.json");
};
