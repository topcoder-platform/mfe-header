/**
 * Helper methods to filter and preprocess notifications
 */
import _ from "lodash";
import {
  NOTIFICATION_RULES,
  IGNORED_NOTIFICATION_TYPES,
  EVENT_TYPE,
} from "../constants/notifications";
import Handlebars from "handlebars";

/**
 * Handlebars helper to display limited quantity of item and text +N more
 *
 * Example:
 *   ```
 *   {{#showMore __history__ 3}}<strong>{{userHandle}}</strong>{{/showMore}}
 *   ```
 *   Gets 3 items from `__history__` array and render them comma-separated.
 *   If there are more than 3 items, adds '+N more'. Output can be:
 *   ```
 *   <strong>userHandle1</strong>, <strong>userHandle1</strong>, <strong>userHandle3</strong> +7 more
 *   ```
 *
 * @param {Array}  items   list of items
 * @param {Number} max     max items to display
 * @param {Object} options handlebars options
 */
const handlebarsShowMoreHelper = (items, max, options) => {
  const renderedItems = items.map(options.fn);
  const uniqRenderedItems = _.uniq(renderedItems);
  const maxRenderedItems = uniqRenderedItems.slice(0, max);
  const restItemsCount = uniqRenderedItems.length - maxRenderedItems.length;

  let out = maxRenderedItems.join(", ");

  if (restItemsCount > 0) {
    out += ` +${restItemsCount} more`;
  }

  return out;
};

/**
 * Handlebars helper which displays fallback value if the value is not provided (falsy)
 *
 * Example:
 *  ```
 *  {{fallback userFullName userHandle}}
 *  ```
 *  Will output `userHandle` if `userFullName` is not provided
 *
 * @param {String} value         value
 * @param {String} fallbackValue fallback value
 */
const handlebarsFallbackHelper = (value, fallbackValue) => {
  const out = value || fallbackValue;

  return new Handlebars.SafeString(out);
};

/**
 * Handlebars helper which displays single or plural noun
 *
 * Example:
 *  ```
 *  {{pluralize count resource resources}}
 *  ```
 *  Will output `resource` if `count` equals 0 or 1; otherwise `resources`
 *
 * @param {Number} count          quantity
 * @param {String} single         noun
 * @param {String} plural         nouns
 */
const handlebarsPluralizeHelper = (number, single, plural) => {
  return Math.abs(number) > 1 ? plural : single;
};

// register handlebars helpers
Handlebars.registerHelper("showMore", handlebarsShowMoreHelper);
Handlebars.registerHelper("fallback", handlebarsFallbackHelper);
Handlebars.registerHelper("pluralize", handlebarsPluralizeHelper);

export const renderGoTo = (goTo, contents) => {
  let goToHandlebars = "";

  if (_.isArray(goTo)) {
    const goToRule = _.find(goTo, (goToRuleTemp) =>
      goToRuleTemp.condition(contents)
    );

    if (goToRule) {
      goToHandlebars = goToRule.goTo;
    } else {
      console.error("Cannot find goTo rule.", goTo, contents);
    }
  } else {
    goToHandlebars = goTo;
  }

  return Handlebars.compile(goToHandlebars)(contents);
};

/**
 * Filter notifications by criteria
 *
 * @param {Array}  notifications notifications list
 * @param {Object} criteria      criteria to filter notifications
 *
 * @returns {Array} notifiations which meet the criteria
 */
export const filterNotificationsByCriteria = (notifications, criteria) => {
  return notifications.filter((notification) =>
    isNotificationMeetCriteria(notification, criteria)
  );
};

export const isSubEqual = (object, criteria) => {
  let isEqual = true;

  _.forOwn(criteria, (value, key) => {
    if (_.isObject(value)) {
      isEqual = isSubEqual(object[key], value);
    } else {
      isEqual = !!object && value === object[key];
    }

    return isEqual;
  });

  return isEqual;
};

export const isNotificationMeetCriteria = (notification, criteria) => {
  if (_.isArray(criteria)) {
    return _.some(criteria, isSubEqual.bind(null, notification));
  }

  return isSubEqual(notification, criteria);
};

/**
 * Get notification filters by sources
 *
 * @param  {Array} sources       list of sources
 *
 * @return {Array}               list of filters by sources
 */
export const getNotificationsFilters = (sources) => {
  const globalNotificationsSection = _.find(sources, { id: "global" });
  const filterSections = [[{ title: "All Notifications", value: "" }]];
  if (globalNotificationsSection && globalNotificationsSection.total) {
    filterSections.push([
      {
        title: "Global",
        value: "global",
        quantity: globalNotificationsSection.total,
      },
    ]);
  }
  const filtersBySource = [];
  const sortedSources = [...sources].sort(compareSourcesByLastNotificationDate);

  sortedSources.forEach((source) => {
    if (source.id !== "global" && source.total !== 0) {
      filtersBySource.push({
        title: source.title,
        value: source.id,
        quantity: source.total,
      });
    }
  });

  if (filtersBySource.length > 0) {
    filterSections.push(filtersBySource);
  }

  return filterSections;
};

/**
 * Compare two sources by the first's (latest) notification date
 * If source doesn't have notifications, such source is "less" than another
 *
 * @param {Object} s1 source object
 * @param {Object} s2 source object
 */
const compareSourcesByLastNotificationDate = (s1, s2) => {
  const date1 =
    s1.notifications && s1.notifications.length
      ? new Date(s1.notifications[0].date).getTime()
      : 0;
  const date2 =
    s2.notifications && s2.notifications.length
      ? new Date(s2.notifications[0].date).getTime()
      : 0;

  return date2 - date1;
};

/**
 * Split notifications by sources
 *
 * @param  {Array}  sources       list of sources
 * @param  {Array}  notifications list of notifications
 *
 * @return {Array}                list of sources with related notifications
 */
export const splitNotificationsBySources = (sources, notifications) => {
  const notificationsBySources = sources.map((source) => {
    const sourceNotifications = _.filter(notifications, {
      sourceId: source.id,
    });

    return {
      ...source,
      notifications: sourceNotifications,
      total: sourceNotifications.length,
    };
  });

  // source that has the most recent notification should be on top
  notificationsBySources.sort(compareSourcesByLastNotificationDate);

  return notificationsBySources;
};

/**
 * Filter notifications by posts
 *
 * So only notifications related to provided posts will stay
 *
 * @param  {Array} notifications list of notifications
 * @param  {Array} posts         list of posts
 *
 * @return {Array}               list of filtered notifications
 */
export const filterNotificationsByPosts = (notifications, posts) => {
  const postIds = _.map(posts, "id");

  return notifications.filter((notification) =>
    _.includes(postIds, _.get(notification, "contents.postId"))
  );
};

/**
 * Filter notifications to only not read yet
 *
 * @param  {Array}  notifications list of notifications
 *
 * @return {Array}                list of filtered notifications
 */
export const filterReadNotifications = (notifications) =>
  _.filter(notifications, { isRead: false });

/**
 *
 * @param {Array} notifications list of notifications
 *
 * @return {Array} list of filtered notifications
 */
export const filterSeenNotifications = (notifications) =>
  _.filter(notifications, { seen: false });

/**
 * Limits notifications quantity per source
 *
 * @param  {Array}  notificationsBySources list of sources with notifications
 * @param  {Number} maxPerSource           maximum number of notifications to include per source
 * @param  {Array}  skipSourceIds          list of ids of sources that will have all notifications
 *
 * @return {Array}                         list of sources with related notifications
 */
export const limitQuantityInSources = (
  notificationsBySources,
  maxPerSource,
  skipSourceIds
) =>
  notificationsBySources.map((source) => {
    // clone sources to avoid updating existent objects
    const limitedSource = { ...source };

    if (!_.includes(skipSourceIds, limitedSource.id)) {
      limitedSource.notifications = limitedSource.notifications.slice(
        0,
        maxPerSource
      );
    }

    return limitedSource;
  });

/**
 * Get a rule for notification
 *
 * @param  {Object} notification notification
 *
 * @return {Object}              notification rule
 */
const getNotificationRule = (notification) => {
  const notificationRule = _.find(NOTIFICATION_RULES, (_notificationRule) => {
    let match = _notificationRule.eventType === notification.eventType;

    if (notification.version) {
      match = match && _notificationRule.version === notification.version;
    }

    if (notification.contents.toTopicStarter) {
      match = match && _notificationRule.toTopicStarter;
    }

    if (notification.contents.toUserHandle) {
      match = match && _notificationRule.toUserHandle;
    }

    if (notification.contents.originator) {
      match = match && _notificationRule.originator;
    }

    if (notification.contents.projectRole) {
      match =
        match &&
        _notificationRule.projectRoles &&
        _.includes(
          _notificationRule.projectRoles,
          notification.contents.projectRole
        );
    }

    if (notification.contents.topcoderRole) {
      match =
        match &&
        _notificationRule.topcoderRoles &&
        _.includes(
          _notificationRule.topcoderRoles,
          notification.contents.topcoderRole
        );
    }

    return match;
  });

  return notificationRule;
};

/**
 * Compare notification rules ignoring version
 *
 * @param {Object} rule1 notification rule 1
 * @param {Object} rule2 notification rule 2
 *
 * @returns {Boolean} true if rules are equal
 */
const isNotificationRuleEqual = (rule1, rule2) => {
  /**
   * Properties which distinguish one rule from another
   *
   * @type {Array<String>}
   */
  const ESSENTIAL_RULE_PROPERTIES = [
    "eventType",
    "toTopicStarter",
    "toUserHandle",
    "projectRole",
    "topcoderRole",
    "originator",
  ];
  const essentialRule1 = _.pick(rule1, ESSENTIAL_RULE_PROPERTIES);
  const essentialRule2 = _.pick(rule2, ESSENTIAL_RULE_PROPERTIES);

  return _.isEqual(essentialRule1, essentialRule2);
};

/**
 * Bundle same type notifications for the same project
 *
 * @param {Array<{notification, notificationRule}>} notificationsWithRules list of notification with rules
 *
 * @returns {Array<{notification, notificationRule}>} bundled notifications with rules
 */
const bundleNotifications = (notificationsWithRules) => {
  /**
   * List of `contents` properties for which we want to keep the whole history
   *
   * @type {Array<String>}
   */
  const PROPERTIES_KEEP_IN_HISTORY = ["userHandle", "userFullName"];
  const bundledNotificationsWithRules = [];

  // starting from the latest notifications
  // find older notifications with the same notification rule and the same project
  _.reverse(notificationsWithRules).forEach((notificationWithRule) => {
    // if notifications doesn't have to be bundled, add it to notifications list as it is
    if (!notificationWithRule.notificationRule.shouldBundle) {
      bundledNotificationsWithRules.push(notificationWithRule);
      return;
    }

    // try to find existent notification in the list to which we can bundle current one
    const existentNotificationWithRule = _.find(
      bundledNotificationsWithRules,
      (bundledNotificationWithRule) =>
        // same source id means same project
        bundledNotificationWithRule.notification.sourceId ===
          notificationWithRule.notification.sourceId &&
        // same notification rule means same type
        isNotificationRuleEqual(
          bundledNotificationWithRule.notificationRule,
          notificationWithRule.notificationRule
        )
    );

    // if already have notification of the same type, update it instead of adding new notification to the list
    if (existentNotificationWithRule) {
      // if haven't bundled any notifications yet, then init properties which only bundled notifications has
      if (!existentNotificationWithRule.notification.bundledIds) {
        existentNotificationWithRule.notification.bundledIds = [
          existentNotificationWithRule.notification.id,
        ];
        existentNotificationWithRule.notification.contents.bundledCount = 1;
        existentNotificationWithRule.notification.contents.__history__ = [
          _.pick(
            existentNotificationWithRule.notification.contents,
            PROPERTIES_KEEP_IN_HISTORY
          ),
        ];
      }

      // at this point bundled notification is initialized,
      // so we just update values of bundled notifications
      existentNotificationWithRule.notification.bundledIds.push(
        notificationWithRule.notification.id
      );
      existentNotificationWithRule.notification.contents.bundledCount += 1;
      existentNotificationWithRule.notification.contents.__history__.push(
        _.pick(
          notificationWithRule.notification.contents,
          PROPERTIES_KEEP_IN_HISTORY
        )
      );
      if (
        notificationWithRule.notification.date >
        existentNotificationWithRule.notification.date
      ) {
        _.merge(
          existentNotificationWithRule.notification,
          notificationWithRule.notification
        );
      }
    } else {
      bundledNotificationsWithRules.push(notificationWithRule);
    }
  });

  return bundledNotificationsWithRules;
};

/**
 * Prepare notification contents:
 * - extracts phaseId from tags
 *
 * @param {Object} contents notification contents
 *
 * @returns {Object} notification contents
 */
const prepareNotificationContents = (contents) => {
  const tags = _.get(contents, "tags", []);
  const preparedContents = { ...contents };

  // check if any of the tags has phaseId
  const PHASE_ID_REGEXP = /phase#(\d+)/;
  const phaseIds = tags.map((tag) =>
    _.get(tag.match(PHASE_ID_REGEXP), "1", null)
  );
  const phaseId = _.find(phaseIds, (phaseId) => phaseId !== null);

  if (phaseId) {
    preparedContents.phaseId = phaseId;
  }

  return preparedContents;
};

/**
 * Prepare notifications
 *
 * @param  {Array} rawNotifications notifications list
 *
 * @return {Array} notification list
 */
export const prepareNotifications = (rawNotifications) => {
  const notifications = rawNotifications.map((rawNotification) => ({
    id: `${rawNotification.id}`,
    sourceId: rawNotification.contents.projectId
      ? `${rawNotification.contents.projectId}`
      : "global",
    sourceName: rawNotification.contents.projectId
      ? rawNotification.contents.projectName || "project"
      : "Global",
    eventType: rawNotification.type,
    date: rawNotification.createdAt,
    isRead: rawNotification.read,
    seen: rawNotification.seen,
    contents: prepareNotificationContents(rawNotification.contents),
    version: rawNotification.version,
  }));

  // populate notifications with additional properties
  // - type
  // - goto
  // - rule
  notifications.forEach((notification) => {
    const notificationRule = getNotificationRule(notification);
    const isIgnoredNotification =
      IGNORED_NOTIFICATION_TYPES.indexOf(notification.eventType) > -1;

    // if rule for notification is not found and not in the list of ignored show a warning for now as such notification cannot be displayed
    if (!notificationRule) {
      if (!isIgnoredNotification) {
        console.warn(
          `Cannot find notification rule for eventType '${notification.eventType}' version '${notification.version}'.`
        );
      }
    } else {
      // populate notification data
      notification.type = notificationRule.type;
      if (notificationRule.goTo) {
        notification.goto = renderGoTo(
          notificationRule.goTo,
          notification.contents
        );
      }

      notification.rule = notificationRule;
    }
  });

  return notifications;
};

/**
 * Bundle notifications and renders notifications texts
 *
 * @param {Array} notifications notifications list
 *
 * @returns {Array} notifications list with rendered texts
 */
export const preRenderNotifications = (notifications) => {
  // we will only render notification which has rules
  const notificationsWithRules = _.compact(
    notifications.map((notification) =>
      notification.rule
        ? {
            notification: _.omit(notification, "rule"),
            notificationRule: notification.rule,
          }
        : null
    )
  );

  const bundledNotificationsWithRules = bundleNotifications(
    notificationsWithRules
  );

  // render notifications texts
  bundledNotificationsWithRules.forEach((bundledNotificationWithRule) => {
    const { notification, notificationRule } = bundledNotificationWithRule;
    const textTpl = notification.contents.bundledCount
      ? notificationRule.bundledText || notificationRule.text // if text for bundled notification is not defined, just use regular text
      : notificationRule.text;

    const renderText = Handlebars.compile(textTpl);
    notification.text = renderText(notification.contents);
  });

  const preRenderedNotifications = _.map(
    bundledNotificationsWithRules,
    "notification"
  );
  // sort notifications by date (newer first)
  preRenderedNotifications.sort((n1, n2) => {
    const date1 = new Date(n1.date).getTime();
    const date2 = new Date(n2.date).getTime();

    return date2 - date1;
  });

  return preRenderedNotifications;
};

// --- TaaS --- //

export const prepareTaaSNotifications = (rawNotifications) => {
  const notifications = rawNotifications.map((rawNotification) => ({
    id: `${rawNotification.id}`,
    sourceId: rawNotification.contents.projectId
      ? `${rawNotification.contents.projectId}`
      : "team",
    sourceName: rawNotification.contents.projectId
      ? rawNotification.contents.teamName || "Team"
      : "Global",
    eventType: rawNotification.type,
    date: rawNotification.createdAt,
    isRead: rawNotification.read,
    seen: rawNotification.seen,
    contents: rawNotification.contents,
    version: rawNotification.version,
  }));

  notifications.forEach((notification) => {
    const notificationRule = getNotificationRule(notification);

    if (notificationRule) {
      notification.type = notificationRule.type;
      if (notificationRule.goTo) {
        notification.goto = renderGoTo(
          notificationRule.goTo,
          notification.contents
        );
      }
      notification.rule = notificationRule;
    } else {
      console.warn(
        `Cannot find notification rule for eventType '${notification.eventType}' version '${notification.version}'.`
      );
    }
  });

  return notifications;
};

// --- Community --- //

const getCommunityNotificationRule = (notification) => {
  const notificationRule = _.find(NOTIFICATION_RULES, (_notificationRule) => {
    return _notificationRule.eventType === notification.eventType;
  });
  return notificationRule;
};

export const prepareCommunityNotifications = (data) => {
  const notifications = _.map(data, (item) => {
    const object = {};
    object.id = item.id;
    object.sourceId =
      item.type === EVENT_TYPE.BROADCAST ? "broadcast" : item.contents.name;
    object.sourceName = item.contents.name || item.contents.title;
    object.eventType = item.type;
    object.isRead = item.read;
    object.seen = item.seen;
    object.contents = {
      text: item.contents.message || item.contents.title,
      id: item.contents.id,
    };
    object.version = item.version;
    object.date = item.createdAt;
    return object;
  });

  notifications.forEach((notification) => {
    const notificationRule = getCommunityNotificationRule(notification);

    if (notificationRule) {
      notification.type = notificationRule.type;
      if (notificationRule.goTo) {
        notification.goto = renderGoTo(
          notificationRule.goTo,
          notification.contents
        );
      }

      notification.rule = notificationRule;
    }
  });

  return notifications;
};

export const getActiveAndBroadcastNotifications = (notifications) => {
  return _.uniq(notifications || []).filter(
    (t) =>
      EVENT_TYPE.CHALLENGE.ACTIVE.includes(t.eventType) ||
      EVENT_TYPE.BROADCAST.includes(t.eventType)
  );
};

export const splitCommunityNotificationsBySources = (
  sources,
  notifications
) => {
  const notificationsBySources = sources.map((source) => {
    const sourceNotifications = _.filter(notifications, {
      sourceName: source.title,
    });

    return {
      ...source,
      notifications: sourceNotifications,
      total: sourceNotifications.length,
    };
  });

  notificationsBySources.sort(compareSourcesByLastNotificationDate);

  return notificationsBySources;
};

export const getCommunityNotificationsFilters = (sources) => {
  const broadcastNotifications = _.find(sources, { id: "broadcast" });
  const filterSections = [];
  const filtersBySource = [];
  const sortedSources = [...sources].sort(compareSourcesByLastNotificationDate);

  sortedSources.forEach((source) => {
    if (source.id !== "broadcast" && source.total !== 0) {
      filtersBySource.push({
        title: source.title,
        value: source.id,
        quantity: source.total,
      });
    }
  });

  if (filtersBySource.length > 0) {
    filterSections.push(filtersBySource);
  }

  if (broadcastNotifications && broadcastNotifications.notifications.length) {
    filterSections.push([
      {
        title: "Broadcast Message",
        value: "broadcast",
        quantity: broadcastNotifications.total,
      },
    ]);
  }

  return filterSections;
};

export const preRenderCommunityNotifications = (notifications) => {
  notifications = getActiveAndBroadcastNotifications(notifications);

  const preRenderedNotifications = notifications;

  preRenderedNotifications.forEach((notification) => {
    notification.text = notification.contents.text;
  });

  preRenderedNotifications.sort((n1, n2) => {
    const date1 = new Date(n1.date).getTime();
    const date2 = new Date(n2.date).getTime();

    return date2 - date1;
  });

  return preRenderedNotifications;
};
