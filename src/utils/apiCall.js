import axios from "axios";
import store from "store";
import { message } from "antd";
import { API_URL } from "utils/constants";
import {
  increaseLoading,
  decreaseLoading,
  finishSavingData,
} from "store/app/action";

const http = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  withCredentials: true,
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
    store.dispatch(increaseLoading());
    const response = await action;
    return handleResponse(response);
  } catch (err) {
    return handleNetworkError(err);
  } finally {
    store.dispatch(decreaseLoading());
  }
};

export const get = async (url, config) => {
  return callApi(http.get(url, config));
};

export const put = async (url, payload, config) => {
  var result = await callApi(http.put(url, payload, config));
  store.dispatch(finishSavingData());
  return result;
};

export const post = async (url, payload, config) => {
  var result = await callApi(http.post(url, payload, config));
  store.dispatch(finishSavingData(result.data));
  return result;
};

export const del = async (url, payload) => {
  var result = await callApi(http.delete(url, payload));
  store.dispatch(finishSavingData());
  return result;
};
