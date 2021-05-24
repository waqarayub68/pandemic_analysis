// import axios from "axios";
import { get } from "./defaults";
const baseUrl = "http://127.0.0.1:8080";
export const getSummaryResults = async () => {
  return get(baseUrl + "/get-overall-summary-values");
};
