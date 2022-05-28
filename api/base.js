import axios from "axios";

// axios.defaults.baseURL = "http://3.135.45.57:5000";
// axios.defaults.baseURL = "https://aqivah-scraper-api-server.herokuapp.com/";
axios.defaults.baseURL = "https://aqivah-scraper.herokuapp.com//";

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url,
      method,
      headers: { "Content-Type": "application/json" },
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    })
      .then((response) => resolve(response))
      .catch((e) => {
        reject(e);
      });
  });

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
