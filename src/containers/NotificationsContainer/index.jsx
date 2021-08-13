/**
 * Container component for notifications list with filter
 */
import React, { Component } from "react";

import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import Sticky from "../../components/Sticky";
import {
  getNotifications,
  getCommunityNotifications,
  setNotificationsFilterBy,
  markAllNotificationsRead,
  toggleNotificationRead,
  viewOlderNotifications,
  toggleBundledNotificationRead,
  hideOlderNotifications,
  toggleNotificationSeen,
} from "../../actions/notifications";
import NotificationsSection from "../../components/Notifications/NotificationsSection";
import NotificationsSectionTitle from "../../components/Notifications/NotificationsSectionTitle";
import SideFilter from "../../components/SideFilter";
import NotificationsEmpty from "../../components/Notifications/NotificationsEmpty";
import spinnerWhileLoading from "../../components/LoadingSpinner";
import {
  getNotificationsFilters,
  getCommunityNotificationsFilters,
  splitNotificationsBySources,
  splitCommunityNotificationsBySources,
  filterReadNotifications,
  limitQuantityInSources,
  preRenderNotifications,
  preRenderCommunityNotifications,
} from "../../utils/notifications";
import { NOTIFICATIONS_NEW_PER_SOURCE } from "../../constants/notifications";
import "./styles.scss";

const NotificationsContainerView = (props) => {
  if (!props.initialized && !props.communityInitialized) {
    return null;
  }
  const {
    sources,
    communitySources,
    notifications,
    communityNotifications,
    filterBy,
    setNotificationsFilterBy,
    markAllNotificationsRead,
    toggleNotificationRead,
    viewOlderNotifications,
    oldSourceIds,
    pending,
    toggleBundledNotificationRead,
  } = props;

  const notReadNotifications = filterReadNotifications(notifications);
  const allNotificationsBySources = splitNotificationsBySources(
    sources,
    notReadNotifications
  );
  const notificationsBySources = limitQuantityInSources(
    allNotificationsBySources,
    NOTIFICATIONS_NEW_PER_SOURCE,
    oldSourceIds
  );

  const notReadCommunityNotifications = filterReadNotifications(
    communityNotifications
  );
  const allCommunityNotificationsBySources =
    splitCommunityNotificationsBySources(
      communitySources,
      notReadCommunityNotifications
    );
  const communityNotificationsBySources = allCommunityNotificationsBySources;

  let globalSource =
    notificationsBySources.length > 0 &&
    notificationsBySources[0].id === "global"
      ? notificationsBySources[0]
      : null;
  let projectSources = globalSource
    ? notificationsBySources.slice(1)
    : notificationsBySources;
  if (filterBy) {
    if (filterBy === "global") {
      projectSources = [];
    } else {
      globalSource = null;
      projectSources = _.filter(projectSources, { id: filterBy });
    }
  }

  let broadcastSource = communityNotificationsBySources.find(
    (source) => source.id === "broadcast"
  );
  let challengeSources = communityNotificationsBySources.filter(
    (source) => source.id !== "broadcast"
  );
  if (filterBy) {
    if (filterBy === "broadcast") {
      challengeSources = [];
    } else {
      broadcastSource = null;
      challengeSources = _.filter(challengeSources, { id: filterBy });
    }
  }

  const toggleNotificationOrBundleRead = (notificationId) => {
    if (!pending) {
      const notification =
        _.find(notReadNotifications, { id: notificationId }) ||
        _.find(notReadCommunityNotifications, { id: notificationId });
      // if it's bundled notification, then toggle all notifications inside the bundle
      if (notification.bundledIds) {
        toggleBundledNotificationRead(notificationId, notification.bundledIds);
      } else {
        toggleNotificationRead(notificationId);
      }
    }
  };

  // this function checks that notification is not seen yet,
  // before marking it as seen
  const markNotificationSeen = (notificationId) => {
    const notification =
      _.find(notifications, { id: notificationId }) ||
      _.find(communityNotifications, { id: notificationId });

    if (notification && !notification.seen) {
      toggleNotificationSeen(notificationId);
    }
  };

  return (
    <div className="container no-padding">
      <div className="content-wrapper">
        <div className="content-wrapper-inner">
          <div className="notifications-container">
            <div className="content">
              {globalSource && globalSource.total > 0 && (
                <NotificationsSection
                  {...globalSource}
                  isGlobal
                  onMarkAllClick={() =>
                    !pending &&
                    markAllNotificationsRead("global", notifications)
                  }
                  onReadToggleClick={toggleNotificationOrBundleRead}
                  onViewOlderClick={() =>
                    viewOlderNotifications(globalSource.id)
                  }
                  onLinkClick={(notificationId) => {
                    markNotificationSeen(notificationId);
                  }}
                />
              )}

              {projectSources.length > 0 && (
                <NotificationsSectionTitle title="Project" isGlobal />
              )}
              {projectSources
                .filter((source) => source.total > 0)
                .map((source) => (
                  <NotificationsSection
                    key={source.id}
                    {...source}
                    onMarkAllClick={() =>
                      !pending &&
                      markAllNotificationsRead(source.id, notifications)
                    }
                    onReadToggleClick={toggleNotificationOrBundleRead}
                    onViewOlderClick={() => viewOlderNotifications(source.id)}
                    onLinkClick={(notificationId) => {
                      markNotificationSeen(notificationId);
                    }}
                  />
                ))}

              {challengeSources.length > 0 && (
                <NotificationsSectionTitle title="Challenges" isGlobal />
              )}
              {challengeSources
                .filter((source) => source.total > 0)
                .map((source) => (
                  <NotificationsSection
                    key={source.title}
                    {...source}
                    onMarkAllClick={() =>
                      !pending &&
                      markAllNotificationsRead(
                        source.id,
                        communityNotifications
                      )
                    }
                    onReadToggleClick={toggleNotificationOrBundleRead}
                    onViewOlderClick={() => viewOlderNotifications(source.id)}
                    onLinkClick={(notificationId) => {
                      markNotificationSeen(notificationId);
                    }}
                  />
                ))}

              {broadcastSource && broadcastSource.total > 0 && (
                <NotificationsSectionTitle title="Broadcast" isGlobal />
              )}
              {broadcastSource && broadcastSource.total > 0 && (
                <NotificationsSection
                  {...broadcastSource}
                  onMarkAllClick={() =>
                    !pending &&
                    markAllNotificationsRead("broadcast", notifications)
                  }
                  onReadToggleClick={toggleNotificationOrBundleRead}
                  onViewOlderClick={() =>
                    viewOlderNotifications(broadcastSource.id)
                  }
                  onLinkClick={(notificationId) => {
                    markNotificationSeen(notificationId);
                  }}
                />
              )}

              {globalSource ||
              projectSources.length > 0 ||
              challengeSources.length ||
              broadcastSource ? (
                <div className="end-of-list">End of list</div>
              ) : (
                <NotificationsEmpty>
                  <p className="notifications-empty-note">
                    Maybe you need to check your{" "}
                    <Link to="/settings/notifications" className="tc-link">
                      notification settings
                    </Link>{" "}
                    to get up to date with the latest activity from your
                    projects?
                  </p>
                </NotificationsEmpty>
              )}
            </div>
            <aside className="filters">
              <Sticky top={90} bottomBoundary="#overlay-main">
                <SideFilter
                  filterSections={[
                    ...getNotificationsFilters(allNotificationsBySources),
                    ...getCommunityNotificationsFilters(
                      allCommunityNotificationsBySources
                    ),
                  ]}
                  selectedFilter={filterBy}
                  onFilterItemClick={setNotificationsFilterBy}
                />
              </Sticky>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = "Notifications - TopCoder";
  }

  componentWillUnmount() {
    this.props.hideOlderNotifications();
  }

  render() {
    const { notifications, communityNotifications, ...restProps } = this.props;
    const preRenderedNotifications = preRenderNotifications(notifications);
    const preRenderedCommunityNotifications = preRenderCommunityNotifications(
      communityNotifications
    );

    return (
      <NotificationsContainerView
        {...{
          ...restProps,
          notifications: preRenderedNotifications,
          communityNotifications: preRenderedCommunityNotifications,
        }}
      />
    );
  }
}

const enhance = spinnerWhileLoading(
  (props) => !(props.isLoading || props.isCommunityLoading)
);
const NotificationsContainerWithLoader = enhance(NotificationsContainer);

NotificationsContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  notifications: PropTypes.array,
  sources: PropTypes.array,
  filterBy: PropTypes.string,
  oldSourceIds: PropTypes.array,
  pending: PropTypes.bool,
  isCommunityLoading: PropTypes.bool.isRequired,
  communityInitialized: PropTypes.bool.isRequired,
  communityNotifications: PropTypes.array,
};

const mapStateToProps = ({ notifications, auth }) => {
  return Object.assign({}, notifications, { user: auth.profile });
};

const mapDispatchToProps = {
  getNotifications,
  getCommunityNotifications,
  setNotificationsFilterBy,
  markAllNotificationsRead,
  toggleNotificationRead,
  viewOlderNotifications,
  hideOlderNotifications,
  toggleBundledNotificationRead,
  toggleNotificationSeen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainerWithLoader);
