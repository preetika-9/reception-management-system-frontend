import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";
import { cachedRoute } from "boot/cacheRoute";
import { LocalStorage } from "quasar";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: "Bearer " + LocalStorage.getItem("access_token"),
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const checkIndex = cachedRoute.findIndex((elem) => elem.url === config.url);
  if (checkIndex > -1) {
    var data = LocalStorage.getItem(cachedRoute[checkIndex].name);
    if (data) {
      var parseData = data;
      var now = new Date();
      var expiry = new Date(parseData.expiry);
      if (expiry > now) {
        config.adapter = function (config) {
          return new Promise((resolve, reject) => {
            const res = {
              data: parseData.data,
              status: 200,
              statusText: "OK",
              headers: {},
              config: config,
              request: {},
            };
            return resolve(res);
          });
        };
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    const checkIndex = cachedRoute.findIndex(
      (elem) => elem.url === response.config.url
    );
    if (checkIndex > -1) {
      var date = new Date();
      var expiry = date.setHours(
        date.getHours() + cachedRoute[checkIndex].duration ?? 0
      );
      LocalStorage.set(cachedRoute[checkIndex].name, {
        name: cachedRoute[checkIndex].name,
        expiry,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("intercept", error.response.data.error);
      Notify.create({
        message: error?.response?.data?.error,
        color: "negative",
        position: "top-right",
      });
      LocalStorage.remove("access_token");
      window.location.href = "/login";
    } else if (error.response.status === 422) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    } else if (error.response.status === 401) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
      LocalStorage.remove("access_token");
    } else if (error.response.status === 400) {
      console.log("error 400");
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    } else if (error.response.status === 500) {
      Notify.create({
        message: error?.response?.data?.message,
        color: "negative",
        position: "top-right",
      });
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axios };

