/**
 * Notifications related reducers
 */
import {
  GET_NOTIFICATIONS_PENDING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_COMMUNITY_NOTIFICATIONS_PENDING,
  GET_COMMUNITY_NOTIFICATIONS_SUCCESS,
  GET_COMMUNITY_NOTIFICATIONS_FAILURE,
  TOGGLE_NOTIFICATION_SEEN,
  SET_NOTIFICATIONS_FILTER_BY,
  MARK_ALL_NOTIFICATIONS_READ,
  MARK_ALL_NOTIFICATIONS_SEEN,
  TOGGLE_NOTIFICATION_READ,
  VIEW_OLDER_NOTIFICATIONS_SUCCESS,
  HIDE_OLDER_NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_PENDING,
  MARK_NOTIFICATIONS_READ,
  SET_NOTIFICATION_PLATFORM,
  PLATFORM,
  RESET_NOTIFICATIONS,
} from "../constants/notifications";
import _ from "lodash";
import { getActiveAndBroadcastNotifications } from "../utils/notifications";

const initialState = {
  isLoading: false,
  isCommunityLoading: false,
  initialized: false,
  communityInitialized: false,
  filterBy: "",
  sources: [{ id: "global", title: "Global" }],
  communitySources: [{ id: "broadcast", title: "Broadcast Message" }],
  notifications: [],
  communityNotifications: [],
  // ids of sources that will also show old notifications
  oldSourceIds: [],
  pending: false,
  readers: {},
  platform: PLATFORM.COMMUNITY,
};

// get sources from notifications
const getSources = (notifications) => {
  const sources = [
    ...initialState.sources,
    ..._.uniqBy(
      notifications.map((notification) => ({
        id: notification.sourceId,
        title: notification.sourceName,
      })),
      "id"
    ),
  ];
  return sources;
};

const getCommunitySources = (notifications) => {
  notifications = getActiveAndBroadcastNotifications(notifications);
  notifications = notifications.filter(
    (notification) => notification.sourceId !== "broadcast"
  );

  const challengeTitles = _.uniq(
    notifications.map((noti) => noti.sourceName).filter((x) => x)
  );
  const sources = challengeTitles
    .map((title) => ({ title, id: title }))
    .concat(initialState.communitySources);

  return sources;
};

// check if no unread notifications available in the filtered section
const isNotificationSectionCleared = (notifications, filterBy) => {
  if (
    filterBy &&
    notifications
      .filter((n) => !n.isRead)
      .map((n) => n.sourceId)
      .indexOf(filterBy) >= 0
  ) {
    return false;
  }

  return true;
};

// get notifications and updated filterBy based on the unread notifications in current filter
const getNotificationsAndFilterBy = (notifications, filterBy) => {
  if (isNotificationSectionCleared(notifications, filterBy)) {
    return { notifications, filterBy: "" };
  }

  return { notifications };
};

const getCommunityNotificationsAndFilterBy = (
  communityNotifications,
  filterBy
) => {
  if (isNotificationSectionCleared(communityNotifications, filterBy)) {
    return { communityNotifications, filterBy: "" };
  }

  return { communityNotifications };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_PENDING:
      return { ...state, isLoading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        initialized: true,
        isLoading: false,
        notifications: action.payload,
        sources: getSources(action.payload),
      };
    case GET_NOTIFICATIONS_FAILURE:
      return { ...state, isLoading: false };

    case GET_COMMUNITY_NOTIFICATIONS_PENDING:
      return { ...state, isCommunityLoading: true };
    case GET_COMMUNITY_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        communityInitialized: true,
        isCommunityLoading: false,
        communityNotifications: action.payload,
        communitySources: getCommunitySources(action.payload),
      };
    case GET_COMMUNITY_NOTIFICATIONS_FAILURE:
      return { ...state, isCommunityLoading: false };

    case TOGGLE_NOTIFICATION_SEEN: {
      const ids = action.payload.split("-");
      const newState = {
        ...state,
        pending: false,
        notifications: state.notifications.map((n) =>
          ids.indexOf(n.id) >= 0 ? { ...n, seen: true } : n
        ),
        communityNotifications: state.communityNotifications.map((n) =>
          ids.indexOf(n.id) >= 0 ? { ...n, seen: true } : n
        ),
      };
      return newState;
    }

    case SET_NOTIFICATIONS_FILTER_BY:
      return { ...state, filterBy: action.payload };

    case NOTIFICATIONS_PENDING:
      return { ...state, pending: true };

    case MARK_ALL_NOTIFICATIONS_READ: {
      const newState = {
        ...state,
        pending: false,
        ...getNotificationsAndFilterBy(
          state.notifications.map((n) =>
            !action.payload || n.sourceId === action.payload
              ? { ...n, isRead: action.isRead }
              : n
          ),
          state.filterBy
        ),
        ...getCommunityNotificationsAndFilterBy(
          state.communityNotifications.map((n) =>
            !action.payload || n.sourceId === action.payload
              ? { ...n, isRead: action.isRead }
              : n
          ),
          state.filterBy
        ),
      };
      return newState;
    }

    case MARK_ALL_NOTIFICATIONS_SEEN: {
      const newState = {
        ...state,
        pending: false,
        ...getNotificationsAndFilterBy(
          state.notifications.map((n) =>
            !action.payload || n.sourcId === action.payload
              ? { ...n, seen: action.isSeen }
              : n
          ),
          state.filterBy
        ),
        ...getCommunityNotificationsAndFilterBy(
          state.communityNotifications.map((n) =>
            !action.payload || n.sourcId === action.payload
              ? { ...n, seen: action.isSeen }
              : n
          ),
          state.filterBy
        ),
      };
      return newState;
    }

    case TOGGLE_NOTIFICATION_READ: {
      const newState = {
        ...state,
        pending: false,
        ...getNotificationsAndFilterBy(
          state.notifications.map((n) =>
            n.id === action.payload ? { ...n, isRead: action.isRead } : n
          ),
          state.filterBy
        ),
        ...getCommunityNotificationsAndFilterBy(
          state.communityNotifications.map((n) =>
            n.id === action.payload ? { ...n, isRead: action.isRead } : n
          ),
          state.filterBy
        ),
      };

      return newState;
    }

    case MARK_NOTIFICATIONS_READ: {
      const newState = {
        ...state,
        pending: false,
        ...getNotificationsAndFilterBy(
          state.notifications.map((n) =>
            _.includes(action.payload, n.id)
              ? { ...n, isRead: action.isRead }
              : n
          ),
          state.filterBy
        ),
        ...getCommunityNotificationsAndFilterBy(
          state.notifications.map((n) =>
            _.includes(action.payload, n.id)
              ? { ...n, isRead: action.isRead }
              : n
          ),
          state.filterBy
        ),
      };

      return newState;
    }

    case VIEW_OLDER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        oldSourceIds: [...state.oldSourceIds, action.payload],
      };

    case HIDE_OLDER_NOTIFICATIONS_SUCCESS:
      return { ...state, oldSourceIds: [] };

    case SET_NOTIFICATION_PLATFORM:
      return { ...state, platform: action.payload };

    case RESET_NOTIFICATIONS:
      return {
        ...state,
        filterBy: "",
        notifications: [],
        communityNotifications: [],
        sources: [],
        communitySources: [],
      };

    default:
      return state;
  }
};
