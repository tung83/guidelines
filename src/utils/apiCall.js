import axios from "axios";
import store from "store";
import { message } from "antd";
import { API_URL } from "utils/constants";

const http = axios.create({
  baseURL: API_URL,
  Accept: "application/json",
  "Content-Type": "application/json",
  timeout: 20000,
});
const handleNetworkError = (err) => {
  message.error(`Error sending request: ${err}`);
  return {
    success: false,
  };
};

const handleResponse = (response) => {
  // Parse the axios response
  const success = response.status >= 200 && response.status < 300;
  const data = response.data;
  let message = response.statusText;
  return {
    success,
    data,
    message,
  };
};

export const callApi = async (action) => {
  try {
    const response = await action;
    return handleResponse(response);
  } catch (err) {
    return handleNetworkError(err);
  } finally {
  }
};

export const get = async (url, config) => {
  return callApi(http.get(url, config));
};

export const put = async (url, payload, config) => {
  var result = await callApi(http.put(url, payload, config));
  return result;
};

export const post = async (url, payload, config) => {
  var result = await callApi(http.post(url, payload, config));
  return result;
};

export const del = async (url, payload) => {
  var result = await callApi(http.delete(url, payload));
  return result;
};
