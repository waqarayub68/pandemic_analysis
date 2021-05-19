import { get } from "./defaults";
const flaskBaseUrl = "http://127.0.0.1:8080";

export const getCombineGraphData = async (options) => {
  const queryString = new URLSearchParams(options).toString();
  return get(flaskBaseUrl + `/get-combineGraph-values?${queryString}`);
};
