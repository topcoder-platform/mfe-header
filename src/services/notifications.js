import axios from "axios";
import { getToken } from "../utils/getToken";
import { NOTIFICATIONS_LIMIT } from "../constants/notifications";
import { URL } from "../../config";
import {
  prepareNotifications,
  prepareCommunityNotifications,
  prepareTaaSNotifications,
} from "../utils/notifications";

const logger = console;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to pass auth token
axiosInstance.interceptors.request.use((config) => {
  return getToken()
    .then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    })
    .catch((err) => {
      // TODO handle this error somehow
      logger.log(err);
      return config;
    });
});

// the id can be either: null/undefined (mark all); notification id; or '-' separated ids, e.g. '123-456-789'
const markNotificationsRead = (id) => {
  if (id) {
    return axiosInstance.put(`${URL.TC_NOTIFICATION_URL}/${id}/read`);
  } else {
    return axiosInstance.put(`${URL.TC_NOTIFICATION_URL}/read`);
  }
};

// the id can be either: notification id; or '-' separated ids, e.g. '123-456-789'
const markNotificationsSeen = (id) => {
  return axiosInstance.put(`${URL.TC_NOTIFICATION_URL}/${id}/seen`);
};

const getNotifications = () => {
  return axiosInstance
    .get(
      `${URL.TC_NOTIFICATION_URL}/list?read=false&platform=connect&per_page=${NOTIFICATIONS_LIMIT}`
    )
    .then((resp) => prepareNotifications(resp.data.items));
};

const getTaaSNotifications = () => {
  return axiosInstance
    .get(
      `${URL.TC_NOTIFICATION_URL}/list?read=false&platform=taas&per_page=${NOTIFICATIONS_LIMIT}`
    )
    .then((resp) => prepareTaaSNotifications(resp.data.items));
};

const getCommunityNotifications = () => {
  return axiosInstance
    .get(
      `${URL.TC_NOTIFICATION_URL}/list?read=false&platform=community&per_page=${NOTIFICATIONS_LIMIT}`
    )
    .then((resp) => prepareCommunityNotifications(resp.data.items));
};

export default {
  getNotifications,
  getCommunityNotifications,
  markNotificationsRead,
  markNotificationsSeen,
  getTaaSNotifications,
};
