import { get } from "./defaults";
const flaskBaseUrl = "http://127.0.0.1:8080";

export const getBubbleStatistics = async () => {
  return get(flaskBaseUrl + "/get-bubble-chart-values");
};
