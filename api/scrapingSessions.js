import axios from "api/base";
import { returnResponseOrError } from "./helpers";

function list({ scraper }, page = 1) {
  return axios
    .get(`/scraper-sessions?page=${page}`, { scraper })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function get(id) {
  return axios
    .get(`/scraper-sessions/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

export default {
  list,
  get,
};
