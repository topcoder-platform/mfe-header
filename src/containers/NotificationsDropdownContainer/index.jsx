/**
 * Container component for NotificationsDropdown component
 *
 * Connects to the state and prepare data for dummy component
 */
import React from "react";
import { Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import _ from "lodash";
import { TransitionGroup, Transition } from "react-transition-group";
import {
  getNotifications,
  getCommunityNotifications,
  getTaaSNotifications,
  toggleNotificationSeen,
  markAllNotificationsRead,
  markAllNotificationsSeen,
  toggleNotificationRead,
  toggleBundledNotificationRead,
  viewOlderNotifications,
  hideOlderNotifications,
  resetNotifications,
} from "../../actions/notifications";
import {
  splitNotificationsBySources,
  splitCommunityNotificationsBySources,
  filterReadNotifications,
  filterSeenNotifications,
  limitQuantityInSources,
  preRenderNotifications,
  preRenderCommunityNotifications,
} from "../../utils/notifications";
import NotificationsSection from "../../components/Notifications/NotificationsSection";
import NotificationsEmpty from "../../components/Notifications/NotificationsEmpty";
import NotificationsDropdownHeader from "../../components/Notifications/NotificationsDropdownHeader";
import NotificationsDropdown from "../../components/Notifications/NotificationsDropdown";
import NotificationsMobilePage from "../../components/Notifications/NotificationsMobilePage";
import NotificationsReadAll from "../../components/Notifications/NotificationsReadAll";
import ScrollLock from "react-scroll-lock-component";
import MediaQuery from "react-responsive";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  NOTIFICATIONS_DROPDOWN_PER_SOURCE,
  NOTIFICATIONS_NEW_PER_SOURCE,
  REFRESH_NOTIFICATIONS_INTERVAL,
  SCREEN_BREAKPOINT_MD,
  PLATFORM,
} from "../../constants/notifications";
import "./styles.scss";

const NotificationsDropdownContainerView = (props) => {
  const {
    initialized,
    communityInitialized,
    isLoading,
    isCommunityLoading,
    sources,
    communitySources,
    notifications,
    communityNotifications,
    markAllNotificationsRead,
    toggleNotificationRead,
    toggleNotificationSeen,
    pending,
    toggleBundledNotificationRead,
    oldSourceIds,
    viewOlderNotifications,
    isDropdownMobileOpen,
    isDropdownWebOpen,
    toggleNotificationsDropdownMobile,
    toggleNotificationsDropdownWeb,
    markAllNotificationsSeen,
    platform,
  } = props;
  if (
    (!initialized && isLoading) ||
    (!communityInitialized && isCommunityLoading)
  ) {
    return (
      <NotificationsDropdown hasUnread={false}>
        <LoadingIndicator />
      </NotificationsDropdown>
    );
  }
  const getPathname = (link) => link.split(/[?#]/)[0].replace(/\/?$/, "");

  // mark notifications with url match current page's url as seen
  if (!pending) {
    const seenNotificationIds = notifications
      .filter(
        ({ isRead, seen, goto = "" }) =>
          !isRead &&
          !seen &&
          getPathname(goto) === getPathname(window.location.pathname)
      )
      .map(({ id }) => id)
      .join("-");
    seenNotificationIds.length &&
      setTimeout(() => toggleNotificationSeen(seenNotificationIds), 0);
  }

  const notReadNotifications = filterReadNotifications(notifications);
  const allNotificationsBySources = splitNotificationsBySources(
    sources,
    notReadNotifications
  );

  const notReadCommunityNotifications = filterReadNotifications(
    communityNotifications
  );
  const allCommunityNotificationsBySources =
    splitCommunityNotificationsBySources(
      communitySources,
      notReadCommunityNotifications
    );

  const hasUnread =
    notReadNotifications.length > 0 || notReadCommunityNotifications.length > 0;
  // we have to give Dropdown component some time
  // before removing notification item node from the list
  // otherwise dropdown thinks we clicked outside and closes dropdown
  const toggleNotificationReadWithDelay = (notificationId) => {
    if (!pending) {
      const notification =
        _.find(notReadNotifications, { id: notificationId }) ||
        _.find(notReadCommunityNotifications, { id: notificationId });
      setTimeout(() => {
        // if it's bundled notification, then toggle all notifications inside the bundle
        if (notification.bundledIds) {
          toggleBundledNotificationRead(
            notificationId,
            notification.bundledIds
          );
        } else {
          toggleNotificationRead(notificationId);
        }
      }, 0);
    }
  };

  let notificationsEmpty = (
    <NotificationsEmpty>
      <p className="notifications-empty-note">
        Maybe you need to check your{" "}
        <Link to="/settings/notifications" className="tc-link">
          notification settings
        </Link>{" "}
        to get up to date with the latest activity from your projects?
      </p>
      <div className="notification-settings">
        <Link to="/settings/notifications" className="tc-btn tc-btn-default">
          Notification Settings
        </Link>
      </div>
    </NotificationsEmpty>
  );
  if (
    (!isLoading && !initialized && platform == PLATFORM.CONNECT) ||
    (!isLoading && !initialized && platform == PLATFORM.TAAS) ||
    (!isCommunityLoading && !communityInitialized && platform == PLATFORM.COMMUNITY)
  ) {
    notificationsEmpty = (
      <NotificationsEmpty message="Fail to load notifications">
        <p className="notifications-empty-note">
          Maybe the notification server is not working or your device is
          offline.
        </p>
      </NotificationsEmpty>
    );
  }

  const markNotificationsSeen = (isOpen) => {
    if (isOpen) {
      markAllNotificationsSeen(null, [
        ...notifications,
        ...communityNotifications,
      ]);
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
    <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
      {(matches) => {
        if (matches) {
          const notificationsBySources = limitQuantityInSources(
            allNotificationsBySources,
            NOTIFICATIONS_DROPDOWN_PER_SOURCE,
            oldSourceIds
          );
          const hiddenByLimitCount =
            _.sumBy(notificationsBySources, "total") -
            _.sumBy(notificationsBySources, "notifications.length");
          const globalSource =
            notificationsBySources.length > 0 &&
            notificationsBySources[0].id === "global"
              ? notificationsBySources[0]
              : null;
          const projectSources =
            notificationsBySources.length > 1 && globalSource
              ? notificationsBySources.slice(1)
              : notificationsBySources;

          const communityNotificationsBySources =
            allCommunityNotificationsBySources;
          const broadcastSource = communityNotificationsBySources.find(
            (source) => source.id === "broadcast"
          );
          const challengeSources = communityNotificationsBySources.filter(
            (source) => source.id !== "broadcast"
          );

          return (
            <NotificationsDropdown
              hasUnread={hasUnread}
              onToggle={(isOpen) => {
                toggleNotificationsDropdownWeb(isOpen);
                markNotificationsSeen(isOpen);
              }}
            >
              {isDropdownWebOpen && (
                <div>
                  <NotificationsDropdownHeader
                    onMarkAllClick={() =>
                      !pending && markAllNotificationsRead()
                    }
                    hasUnread={hasUnread}
                  />
                  {!hasUnread ? (
                    <div className="notifications-dropdown-body">
                      {notificationsEmpty}
                    </div>
                  ) : (
                    [
                      <ScrollLock key="body">
                        <div className="notifications-dropdown-body">
                          <Transition
                            in={
                              globalSource && globalSource.notifications.length
                            }
                            timeout={500}
                            unmountOnExit
                          >
                            {(state) => (
                              <NotificationsSection
                                {...globalSource}
                                transitionState={state}
                                isGlobal
                                isSimple
                                onReadToggleClick={
                                  toggleNotificationReadWithDelay
                                }
                                onLinkClick={(notificationId) => {
                                  toggleNotificationsDropdownWeb();
                                  markNotificationSeen(notificationId);
                                }}
                              />
                            )}
                          </Transition>
                          <TransitionGroup>
                            {projectSources
                              .filter(
                                (source) => source.notifications.length > 0
                              )
                              .map((source) => (
                                <Transition
                                  timeout={500}
                                  key={source.id}
                                  unmountOnExit
                                >
                                  {(state) => (
                                    <NotificationsSection
                                      {...source}
                                      transitionState={state}
                                      key={source.id}
                                      isSimple
                                      onReadToggleClick={
                                        toggleNotificationReadWithDelay
                                      }
                                      onLinkClick={(notificationId) => {
                                        toggleNotificationsDropdownWeb();
                                        markNotificationSeen(notificationId);
                                      }}
                                    />
                                  )}
                                </Transition>
                              ))}
                          </TransitionGroup>
                          <TransitionGroup>
                            {challengeSources
                              .filter(
                                (source) => source.notifications.length > 0
                              )
                              .map((source) => (
                                <Transition
                                  timeout={500}
                                  key={source.id}
                                  unmountOnExit
                                >
                                  {(state) => (
                                    <NotificationsSection
                                      {...source}
                                      transitionState={state}
                                      key={source.id}
                                      isSimple
                                      onReadToggleClick={
                                        toggleNotificationReadWithDelay
                                      }
                                      onLinkClick={(notificationId) => {
                                        toggleNotificationsDropdownWeb();
                                        markNotificationSeen(notificationId);
                                      }}
                                    />
                                  )}
                                </Transition>
                              ))}
                          </TransitionGroup>
                          <Transition
                            in={
                              broadcastSource &&
                              broadcastSource.notifications.length
                            }
                            timeout={500}
                            unmountOnExit
                          >
                            {(state) => (
                              <NotificationsSection
                                {...broadcastSource}
                                transitionState={state}
                                isSimple
                                onReadToggleClick={
                                  toggleNotificationReadWithDelay
                                }
                                onLinkClick={(notificationId) => {
                                  toggleNotificationsDropdownWeb();
                                  markNotificationSeen(notificationId);
                                }}
                              />
                            )}
                          </Transition>
                        </div>
                      </ScrollLock>,
                      <NotificationsReadAll
                        key="footer"
                        onClick={() => {
                          toggleNotificationsDropdownWeb();
                          navigate("/notifications");
                        }}
                      >
                        {hiddenByLimitCount > 0
                          ? `View ${hiddenByLimitCount} older notification${
                              hiddenByLimitCount > 1 ? "s" : ""
                            }`
                          : "View all notifications"}
                      </NotificationsReadAll>,
                    ]
                  )}
                </div>
              )}
            </NotificationsDropdown>
          );
        } else {
          const notificationsBySources = limitQuantityInSources(
            allNotificationsBySources,
            NOTIFICATIONS_NEW_PER_SOURCE,
            oldSourceIds
          );
          const globalSource =
            notificationsBySources.length > 0 &&
            notificationsBySources[0].id === "global"
              ? notificationsBySources[0]
              : null;
          const projectSources =
            notificationsBySources.length > 1 && globalSource
              ? notificationsBySources.slice(1)
              : notificationsBySources;

          const communityNotificationsBySources =
            allCommunityNotificationsBySources;
          const broadcastSource = communityNotificationsBySources.find(
            (source) => source.id === "broadcast"
          );
          const challengeSources = communityNotificationsBySources.filter(
            (source) => source.id !== "broadcast"
          );

          return (
            <NotificationsMobilePage
              hasUnread={hasUnread}
              onToggle={() => {
                toggleNotificationsDropdownMobile();
              }}
              isOpen={isDropdownMobileOpen}
            >
              {!hasUnread ? (
                notificationsEmpty
              ) : (
                <div>
                  <Transition
                    in={globalSource && globalSource.notifications.length}
                    timeout={500}
                    unmountOnExit
                  >
                    {(state) => (
                      <NotificationsSection
                        {...globalSource}
                        transitionState={state}
                        isGlobal
                        isSimple
                        onReadToggleClick={toggleNotificationReadWithDelay}
                        onViewOlderClick={() =>
                          viewOlderNotifications(globalSource.id)
                        }
                        onLinkClick={(notificationId) => {
                          toggleNotificationsDropdownMobile();
                          markNotificationSeen(notificationId);
                        }}
                      />
                    )}
                  </Transition>
                  <TransitionGroup>
                    {projectSources
                      .filter((source) => source.notifications.length)
                      .map((source) => (
                        <Transition timeout={500} key={source.id} unmountOnExit>
                          {(state) => (
                            <NotificationsSection
                              {...source}
                              transitionState={state}
                              key={source.id}
                              isSimple
                              onReadToggleClick={
                                toggleNotificationReadWithDelay
                              }
                              onViewOlderClick={() =>
                                viewOlderNotifications(source.id)
                              }
                              onLinkClick={(notificationId) => {
                                toggleNotificationsDropdownMobile();
                                markNotificationSeen(notificationId);
                              }}
                            />
                          )}
                        </Transition>
                      ))}
                  </TransitionGroup>
                  <TransitionGroup>
                    {challengeSources
                      .filter((source) => source.notifications.length > 0)
                      .map((source) => (
                        <Transition timeout={500} key={source.id} unmountOnExit>
                          {(state) => (
                            <NotificationsSection
                              {...source}
                              transitionState={state}
                              key={source.id}
                              isSimple
                              onReadToggleClick={
                                toggleNotificationReadWithDelay
                              }
                              onViewOlderClick={() =>
                                viewOlderNotifications(source.id)
                              }
                              onLinkClick={(notificationId) => {
                                toggleNotificationsDropdownWeb();
                                markNotificationSeen(notificationId);
                              }}
                            />
                          )}
                        </Transition>
                      ))}
                  </TransitionGroup>
                  <Transition
                    in={broadcastSource && broadcastSource.notifications.length}
                    timeout={500}
                    unmountOnExit
                  >
                    {(state) => (
                      <NotificationsSection
                        {...broadcastSource}
                        transitionState={state}
                        isSimple
                        onReadToggleClick={toggleNotificationReadWithDelay}
                        onLinkClick={(notificationId) => {
                          toggleNotificationsDropdownWeb();
                          markNotificationSeen(notificationId);
                        }}
                      />
                    )}
                  </Transition>
                </div>
              )}
            </NotificationsMobilePage>
          );
        }
      }}
    </MediaQuery>
  );
};

class NotificationsDropdownContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownWebOpen: false,
      isDropdownMobileOpen: false,
      notificationsVisited: false,
    };

    this.onToggleNotificationsDropdownWeb =
      this.onToggleNotificationsDropdownWeb.bind(this);
    this.onToggleNotificationsDropdownMobile =
      this.onToggleNotificationsDropdownMobile.bind(this);
  }

  componentDidMount() {
    const { initialized, communityInitialized } = this.props;

    if (!(initialized || communityInitialized)) {
      this.getPlatformNotifications();
    }

    this.autoRefreshNotifications = setInterval(() => {
      this.getPlatformNotifications();
    }, REFRESH_NOTIFICATIONS_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.autoRefreshNotifications);
    // hide notifications dropdown for mobile, when this component is unmounted
    this.onToggleNotificationsDropdownMobile(false);
    this.onToggleNotificationsDropdownWeb(false);
    this.props.hideOlderNotifications();
  }

  componentWillReceiveProps(nextProps) {
    const {
      platform: oldPlatform,
      resetNotifications,
    } = this.props;
    const { platform } = nextProps;

    if (platform !== oldPlatform) {
      resetNotifications();
      this.getPlatformNotifications(platform);
    }
  }

  getPlatformNotifications(p) {
    const {
      getNotifications,
      getCommunityNotifications,
      getTaaSNotifications,
      platform,
    } = this.props;

    p = p || platform;

    if (p === PLATFORM.CONNECT) {
      getNotifications();
    } else if (p === PLATFORM.TAAS) {
      getTaaSNotifications();
    } else {
      getCommunityNotifications();
    }
  }

  onToggleNotificationsDropdownWeb(isOpen) {
    this.setState({
      isDropdownWebOpen: !_.isUndefined(isOpen)
        ? isOpen
        : !this.state.isDropdownWebOpen,
    });
  }

  onToggleNotificationsDropdownMobile(isOpen) {
    this.setState({
      isDropdownMobileOpen: !_.isUndefined(isOpen)
        ? isOpen
        : !this.state.isDropdownMobileOpen,
    });
  }

  render() {
    const { notifications, communityNotifications, ...restProps } = this.props;
    const preRenderedNotifications = preRenderNotifications(notifications);
    const preRenderedCommunityNotifications = preRenderCommunityNotifications(
      communityNotifications
    );
    return (
      <NotificationsDropdownContainerView
        {...restProps}
        notifications={preRenderedNotifications}
        communityNotifications={preRenderedCommunityNotifications}
        toggleNotificationsDropdownWeb={this.onToggleNotificationsDropdownWeb}
        toggleNotificationsDropdownMobile={
          this.onToggleNotificationsDropdownMobile
        }
        isDropdownMobileOpen={this.state.isDropdownMobileOpen}
        isDropdownWebOpen={this.state.isDropdownWebOpen}
      />
    );
  }
}

const mapStateToProps = ({ notifications }) => notifications;

const mapDispatchToProps = {
  getNotifications,
  getCommunityNotifications,
  getTaaSNotifications,
  toggleNotificationSeen,
  markAllNotificationsRead,
  markAllNotificationsSeen,
  toggleNotificationRead,
  toggleBundledNotificationRead,
  viewOlderNotifications,
  hideOlderNotifications,
  resetNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDropdownContainer);
