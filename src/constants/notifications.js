import config from "../../config";

// Notifications
export const GET_NOTIFICATIONS_PENDING = "GET_NOTIFICATIONS_PENDING";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILURE = "GET_NOTIFICATIONS_FAILURE";
export const GET_COMMUNITY_NOTIFICATIONS_PENDING =
  "GET_COMMUNITY_NOTIFICATIONS_PENDING";
export const GET_COMMUNITY_NOTIFICATIONS_SUCCESS =
  "GET_COMMUNITY_NOTIFICATIONS_SUCCESS";
export const GET_COMMUNITY_NOTIFICATIONS_FAILURE =
  "GET_COMMUNITY_NOTIFICATIONS_FAILURE";
export const SET_NOTIFICATIONS_FILTER_BY = "SET_NOTIFICATIONS_FILTER_BY";
export const MARK_ALL_NOTIFICATIONS_READ = "MARK_ALL_NOTIFICATIONS_READ";
export const TOGGLE_NOTIFICATION_READ = "TOGGLE_NOTIFICATION_READ";
export const TOGGLE_NOTIFICATION_SEEN = "TOGGLE_NOTIFICATION_SEEN";
export const MARK_ALL_NOTIFICATIONS_SEEN = "MARK_ALL_NOTIFICATIONS_SEEN";
export const VIEW_OLDER_NOTIFICATIONS_SUCCESS =
  "VIEW_OLDER_NOTIFICATIONS_SUCCESS";
export const HIDE_OLDER_NOTIFICATIONS_SUCCESS =
  "HIDE_OLDER_NOTIFICATIONS_SUCCESS";
export const NOTIFICATIONS_PENDING = "NOTIFICATIONS_PENDING";
export const MARK_NOTIFICATIONS_READ = "MARK_NOTIFICATIONS_READ";
export const SET_NOTIFICATION_PLATFORM = "SET_NOTIFICATION_PLATFORM";
export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS";

/*
 * Project member role
 */
export const PROJECT_ROLE_COPILOT = "copilot";
export const PROJECT_ROLE_MANAGER = "manager";
export const PROJECT_ROLE_ACCOUNT_MANAGER = "account_manager";
export const PROJECT_ROLE_CUSTOMER = "customer";
export const PROJECT_ROLE_OWNER = "owner";
export const PROJECT_ROLE_MEMBER = "member"; // this is need for notifications
export const PROJECT_ROLE_ACCOUNT_EXECUTIVE = "account_executive";
export const PROJECT_ROLE_PROGRAM_MANAGER = "program_manager";
export const PROJECT_ROLE_SOLUTION_ARCHITECT = "solution_architect";
export const PROJECT_ROLE_PROJECT_MANAGER = "project_manager";

/*
 * User Roles
 */
export const ROLE_TOPCODER_USER = "Topcoder User";
export const ROLE_CONNECT_COPILOT = "Connect Copilot";
export const ROLE_CONNECT_MANAGER = "Connect Manager";
export const ROLE_CONNECT_ACCOUNT_MANAGER = "Connect Account Manager";
export const ROLE_CONNECT_ADMIN = "Connect Admin";
export const ROLE_ADMINISTRATOR = "administrator";
export const ROLE_CONNECT_COPILOT_MANAGER = "Connect Copilot Manager";
export const ROLE_BUSINESS_DEVELOPMENT_REPRESENTATIVE =
  "Business Development Representative";
export const ROLE_PRESALES = "Presales";
export const ROLE_ACCOUNT_EXECUTIVE = "Account Executive";
export const ROLE_PROGRAM_MANAGER = "Program Manager";
export const ROLE_SOLUTION_ARCHITECT = "Solution Architect";
export const ROLE_PROJECT_MANAGER = "Project Manager";

// ToolTip
export const TOOLTIP_DEFAULT_DELAY = 300; // in ms

// Screen breakpoints
export const SCREEN_BREAKPOINT_LG = 1360;
export const SCREEN_BREAKPOINT_RG = 992;
export const SCREEN_BREAKPOINT_MD = 768;
export const SCREEN_BREAKPOINT_SM = 640;
export const SCREEN_BREAKPOINT_XS = 320;

export const REFRESH_NOTIFICATIONS_INTERVAL = 1000 * 60 * 1; // 1 minute interval
export const NOTIFICATIONS_DROPDOWN_PER_SOURCE = 5;
export const NOTIFICATIONS_NEW_PER_SOURCE = 10;

export const NOTIFICATIONS_LIMIT = 1000;

export const PLATFORM = {
  CONNECT: "connect",
  COMMUNITY: "community",
  TAAS: "taas",
};

// Notifications event types
export const EVENT_TYPE = {
  POST: {
    UPDATED: "connect.notification.project.post.edited",
    CREATED: "connect.notification.project.post.created",
    DELETED: "connect.notification.project.post.deleted",
    MENTION: "connect.notification.project.post.mention",
  },
  MEMBER: {
    JOINED: "connect.notification.project.member.joined",
    LEFT: "connect.notification.project.member.left",
    REMOVED: "connect.notification.project.member.removed",
    MANAGER_JOINED: "connect.notification.project.member.managerJoined",
    COPILOT_JOINED: "connect.notification.project.member.copilotJoined",
    ASSIGNED_AS_OWNER: "connect.notification.project.member.assignedAsOwner",
    INVITE_REQUESTED: "connect.notification.project.member.invite.requested",
    INVITE_APPROVED: "connect.notification.project.member.invite.approved",
    INVITE_REFUSED: "connect.notification.project.member.invite.rejected",
    INVITE_CREATED: "connect.notification.project.member.invite.created",
  },
  PROJECT: {
    ACTIVE: "connect.notification.project.active",
    APPROVED: "connect.notification.project.approved",
    CANCELED: "connect.notification.project.canceled",
    COMPLETED: "connect.notification.project.completed",
    CREATED: "connect.notification.project.created",
    FILE_UPLOADED: "connect.notification.project.fileUploaded",
    LINK_CREATED: "connect.notification.project.linkCreated",
    PAUSED: "connect.notification.project.paused",
    SUBMITTED_FOR_REVIEW: "connect.notification.project.submittedForReview",
    SPECIFICATION_MODIFIED: "connect.notification.project.updated.spec",
  },
  PROJECT_PLAN: {
    READY: "connect.notification.project.plan.ready",
    MODIFIED: "connect.notification.project.plan.updated",
    PROGRESS_UPDATED: "connect.notification.project.updated.progress",
    PHASE_ACTIVATED: "connect.notification.project.phase.transition.active",
    PHASE_COMPLETED: "connect.notification.project.phase.transition.completed",
    PHASE_PAYMENT_UPDATED: "connect.notification.project.phase.update.payment",
    PHASE_PROGRESS_UPDATED:
      "connect.notification.project.phase.update.progress",
    PHASE_SCOPE_UPDATED: "connect.notification.project.phase.update.scope",
    PHASE_PRODUCT_SPEC_UPDATED:
      "connect.notification.project.product.update.spec",
    MILESTONE_ACTIVATED:
      "connect.notification.project.timeline.milestone.transition.active",
    MILESTONE_COMPLETED:
      "connect.notification.project.timeline.milestone.transition.completed",
    WAITING_FOR_CUSTOMER_INPUT:
      "connect.notification.project.timeline.milestone.waiting.customer",
    TIMELINE_ADJUSTED: "connect.notification.project.timeline.adjusted",
  },
  TOPIC: {
    CREATED: "connect.notification.project.topic.created",
    DELETED: "connect.notification.project.topic.deleted",
  },
  CHALLENGE: {
    ACTIVE: "challenge.notification.events",
    AUTOPILOT_ACTIVE: "notifications.autopilot.events",
    COMPLETED: "challenge.notification.completed",
  },
  BROADCAST: "admin.notification.broadcast",
  TAAS: {
    POST_INTERVIEW_ACTION_REQUIRED:
      "taas.notification.post-interview-action-required",
    RESOURCE_BOOKING_EXPIRATION:
      "taas.notification.resource-booking-expiration",
    RESOURCE_BOOKING_PLACED: "taas.notification.resource-booking-placed",
  },
};

export const NOTIFICATION_TYPE = {
  WARNING: "warning",
  NEW_PROJECT: "new-project",
  UPDATES: "updates",
  NEW_POSTS: "new-posts",
  REVIEW_PENDING: "review-pending",
  MEMBER_ADDED: "member-added",
  CHALLENGE: "challenge",
  BROADCAST: "broadcast",
  TAAS: "taas",
};

/*
 * NOTIFICATIONS
 */

export const GOTO = {
  PROJECT_DASHBOARD: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}`,
  PROJECT_SPECIFICATION: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/scope`,
  PROJECT_PLAN: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/plan`,
  TOPIC: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/messages/{{topicId}}`,
  POST: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/messages/{{topicId}}#comment-{{postId}}`,
  PHASE_POST: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/plan#phase-{{phaseId}}-posts-{{postId}}`,
  FILE_LIST: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/specification#appDefinition-files`,
  PHASE: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}/plan#phase-{{phaseId}}`,
  TOPCODER_TEAM: `${config.URL.CONNECT_DOMAIN}/projects/{{projectId}}#manageTopcoderTeam`,
  CHALLENGE: `${config.URL.COMMUNITY_DOMAIN}/challenges/{{id}}`,
  TAAS_CANDIDATES_INTERVIEWS: `${config.URL.TAAS_APP}/{{projectId}}/positions/{{jobId}}/candidates/interviews`,
  TAAS_PROJECT: `${config.URL.TAAS_APP}/{{projectId}}`,
};

// each notification can be displayed differently depend on WHO see them
// that's why each notification can have several rules to display which describe user roles
// NOTE for each version of notification have to repeat ALL rules, even if some rules are not changed
export const NOTIFICATIONS = [
  // Outside project
  {
    eventType: EVENT_TYPE.PROJECT.CREATED,
    type: NOTIFICATION_TYPE.NEW_PROJECT,
    rules: [
      {
        text: "Your Project was created successfully",
        projectRoles: [PROJECT_ROLE_OWNER],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "New project is created",
        topcoderRoles: [
          ROLE_CONNECT_ACCOUNT_MANAGER,
          ROLE_BUSINESS_DEVELOPMENT_REPRESENTATIVE,
          ROLE_PRESALES,
          ROLE_ACCOUNT_EXECUTIVE,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.ACTIVE,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Your project is now active",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "A project has been set to active",
        topcoderRoles: [
          ROLE_CONNECT_COPILOT,
          ROLE_CONNECT_MANAGER,
          ROLE_PROGRAM_MANAGER,
          ROLE_SOLUTION_ARCHITECT,
          ROLE_PROJECT_MANAGER,
          ROLE_ADMINISTRATOR,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.SUBMITTED_FOR_REVIEW,
    type: NOTIFICATION_TYPE.REVIEW_PENDING,
    rules: [
      {
        text: "Your project is now in review",
        projectRoles: [PROJECT_ROLE_OWNER],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Project is available for review",
        topcoderRoles: [
          ROLE_CONNECT_MANAGER,
          ROLE_PROGRAM_MANAGER,
          ROLE_SOLUTION_ARCHITECT,
          ROLE_PROJECT_MANAGER,
          ROLE_CONNECT_ACCOUNT_MANAGER,
          ROLE_BUSINESS_DEVELOPMENT_REPRESENTATIVE,
          ROLE_PRESALES,
          ROLE_ACCOUNT_EXECUTIVE,
          ROLE_ADMINISTRATOR,
        ],
        goTo: GOTO.PROJECT_SPECIFICATION,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.APPROVED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Your project was approved, work will soon start",
        projectRoles: [PROJECT_ROLE_OWNER],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Project is available for pickup",
        topcoderRoles: [ROLE_CONNECT_COPILOT, ROLE_ADMINISTRATOR],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Project was approved",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.PAUSED,
    type: NOTIFICATION_TYPE.REVIEW_PENDING,
    rules: [
      {
        text: "Your project was paused",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "A project was paused",
        topcoderRoles: [ROLE_ADMINISTRATOR],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.COMPLETED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Your project completed successfully!",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "A project was completed",
        topcoderRoles: [ROLE_ADMINISTRATOR],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.CANCELED,
    type: NOTIFICATION_TYPE.WARNING,
    rules: [
      {
        text: "Your project was canceled. If you think that was a mistake...",
        projectRoles: [PROJECT_ROLE_OWNER],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  // User management
  {
    eventType: EVENT_TYPE.MEMBER.JOINED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "A new team member joined your project",
        shouldBundle: true,
        bundledText: "{{bundledCount}} new team members joined your project",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.LEFT,
    type: NOTIFICATION_TYPE.WARNING,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> left a project",
        shouldBundle: true,
        bundledText: "{{bundledCount}} team members left your project",
        projectRoles: [
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.MEMBER.LEFT,
    type: NOTIFICATION_TYPE.WARNING,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> left a project",
        shouldBundle: true,
        bundledText: "{{bundledCount}} team members left your project",
        projectRoles: [
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.REMOVED,
    type: NOTIFICATION_TYPE.WARNING,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> was removed from project",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} team members were removed from your project",
        projectRoles: [
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "You were removed from a project",
        toUserHandle: true,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.MEMBER.REMOVED,
    type: NOTIFICATION_TYPE.WARNING,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> was removed from project",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} team members were removed from your project",
        projectRoles: [
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "You were removed from a project",
        toUserHandle: true,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.ASSIGNED_AS_OWNER,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "You are now the owner of project",
        toUserHandle: true,
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Project owner was changed to <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.MEMBER.ASSIGNED_AS_OWNER,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "You are now the owner of project",
        toUserHandle: true,
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Project owner was changed to <strong>{{userFullName}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.INVITE_REQUESTED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "You are requested to add <strong>{{userFullName}}</strong> as a copilot",
        topcoderRoles: [ROLE_CONNECT_COPILOT_MANAGER],
        goTo: GOTO.TOPCODER_TEAM,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.INVITE_APPROVED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "You are added as a copilot",
        toUserHandle: true,
        goTo: GOTO.PROJECT_DASHBOARD,
      },
      {
        text: "Your request to invite the copilot was approved",
        originator: true,
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.INVITE_REFUSED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "Your request to invite the copilot was refused",
        originator: true,
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.COPILOT_JOINED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "A  copilot joined your project team",
        shouldBundle: true,
        bundledText: "{{bundledCount}} copilots joined your project team",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.MEMBER.MANAGER_JOINED,
    type: NOTIFICATION_TYPE.MEMBER_ADDED,
    rules: [
      {
        text: "A manager joined your project team",
        shouldBundle: true,
        bundledText: "{{bundledCount}} managers joined your project team",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.TOPIC.CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> created a new post ",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.TOPIC,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.TOPIC.CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> created a new post ",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.TOPIC,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.POST.CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> responded to your post",
        shouldBundle: true,
        bundledText:
          "{{#showMore __history__ 3}}<strong>{{userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts to your topic",
        toTopicStarter: true,
        goTo: [
          { goTo: GOTO.POST, condition: (contents) => !contents.phaseId },
          {
            goTo: GOTO.PHASE_POST,
            condition: (contents) => !!contents.phaseId,
          },
        ],
      },
      {
        text: "<strong>{{userHandle}}</strong> responded to a post",
        shouldBundle: true,
        bundledText:
          "{{#showMore __history__ 3}}<strong>{{userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: [
          { goTo: GOTO.POST, condition: (contents) => !contents.phaseId },
          {
            goTo: GOTO.PHASE_POST,
            condition: (contents) => !!contents.phaseId,
          },
        ],
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.POST.CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> responded to your post",
        shouldBundle: true,
        bundledText:
          "{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts to your topic",
        toTopicStarter: true,
        goTo: [
          { goTo: GOTO.POST, condition: (contents) => !contents.phaseId },
          {
            goTo: GOTO.PHASE_POST,
            condition: (contents) => !!contents.phaseId,
          },
        ],
      },
      {
        text: "<strong>{{userFullName}}</strong> responded to a post",
        shouldBundle: true,
        bundledText:
          "{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} created {{bundledCount}} new posts",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: [
          { goTo: GOTO.POST, condition: (contents) => !contents.phaseId },
          {
            goTo: GOTO.PHASE_POST,
            condition: (contents) => !!contents.phaseId,
          },
        ],
      },
    ],
  },

  {
    version: 2,
    eventType: EVENT_TYPE.POST.UPDATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> edited post",
        shouldBundle: true,
        bundledText:
          "{{#showMore __history__ 3}}<strong>{{fallback userFullName userHandle}}</strong>{{/showMore}} edited {{bundledCount}} posts",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        toTopicStarter: true,
        goTo: GOTO.POST,
      },
    ],
  },

  {
    version: 2,
    eventType: EVENT_TYPE.POST.MENTION,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> mentioned you in a post",
        toUserHandle: true,
        goTo: [
          { goTo: GOTO.POST, condition: (contents) => !contents.phaseId },
          {
            goTo: GOTO.PHASE_POST,
            condition: (contents) => !!contents.phaseId,
          },
        ],
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.LINK_CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> added a link to your project",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.PROJECT.LINK_CREATED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> added a link to your project",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_DASHBOARD,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.FILE_UPLOADED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> added a new file",
        shouldBundle: true,
        bundledText: "{{bundledCount}} new files were added",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.FILE_LIST,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.PROJECT.FILE_UPLOADED,
    type: NOTIFICATION_TYPE.NEW_POSTS,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> added a new file",
        shouldBundle: true,
        bundledText: "{{bundledCount}} new files were added",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.FILE_LIST,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT.SPECIFICATION_MODIFIED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> updated the project specification",
        shouldBundle: true,
        bundledText:
          "Project specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_SPECIFICATION,
      },
    ],
  },
  {
    version: 2,
    eventType: EVENT_TYPE.PROJECT.SPECIFICATION_MODIFIED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "<strong>{{userFullName}}</strong> updated the project specification",
        shouldBundle: true,
        bundledText:
          "Project specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_OWNER,
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
          PROJECT_ROLE_MEMBER,
        ],
        goTo: GOTO.PROJECT_SPECIFICATION,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.READY,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Project plan is ready",
        shouldBundle: true,
        bundledText:
          "Project plan is ready for your project. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PROJECT_PLAN,
      },
      {
        text: "Project plan is ready for <strong>{{projectName}}</strong>",
        shouldBundle: true,
        bundledText:
          "Project plan is ready. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_PLAN,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.MODIFIED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Project plan is modified",
        shouldBundle: true,
        bundledText:
          "Project plan is modified {{bundledCount}} times for your project. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PROJECT_PLAN,
      },
      {
        text: "Project plan is modified for <strong>{{projectName}}</strong>",
        shouldBundle: true,
        bundledText:
          "Project plan is modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_PLAN,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.PHASE_ACTIVATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is activated",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} phases are activated. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is activated",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} phases are activated. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.PHASE_COMPLETED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is completed",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} phases are completed. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is completed",
        shouldBundle: true,
        bundledText:
          "{{bundledCount}} phases are completed. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.PHASE_PAYMENT_UPDATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Payments for <strong>{{updatedPhase.name}}</strong> updated",
        shouldBundle: true,
        bundledText:
          "Payments updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "Payments for <strong>{{updatedPhase.name}}</strong> updated",
        shouldBundle: true,
        bundledText:
          "Payments updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.PHASE_PROGRESS_UPDATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is progressed",
        shouldBundle: true,
        bundledText:
          "Progress updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "Phase <strong>{{updatedPhase.name}}</strong> is progressed",
        shouldBundle: true,
        bundledText:
          "Progress updated for {{bundledCount}} phases. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    // using product spec modified event instead of phase scope modified
    eventType: EVENT_TYPE.PROJECT_PLAN.PHASE_PRODUCT_SPEC_UPDATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> updated the phase specification",
        shouldBundle: true,
        bundledText:
          "Phase specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "<strong>{{userHandle}}</strong> updated the phase specification",
        shouldBundle: true,
        bundledText:
          "Phase specification has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.PROGRESS_UPDATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> updated the project progress",
        shouldBundle: true,
        bundledText:
          "Project progress has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PROJECT_PLAN,
      },
      {
        text: "<strong>{{userHandle}}</strong> updated the project progress",
        shouldBundle: true,
        bundledText:
          "Project progress has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PROJECT_PLAN,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.TIMELINE_ADJUSTED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "<strong>{{userHandle}}</strong> updated the phase timeline",
        shouldBundle: true,
        bundledText:
          "Phase timeline has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "<strong>{{userHandle}}</strong> updated the phase timeline",
        shouldBundle: true,
        bundledText:
          "Phase timeline has been modified {{bundledCount}} times. Last modified by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.MILESTONE_ACTIVATED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Milestone is activated in the phase",
        shouldBundle: true,
        bundledText:
          "Milestones activated {{bundledCount}} times. Last activated by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "<strong>{{userHandle}}</strong> activated a milestone in the phase",
        shouldBundle: true,
        bundledText:
          "Milestones activated {{bundledCount}} times. Last activated by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.MILESTONE_COMPLETED,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "Milestone is completed in the phase",
        shouldBundle: true,
        bundledText:
          "Milestones completed {{bundledCount}} times. Last completed by: <strong>{{userHandle}}</strong>",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "<strong>{{userHandle}}</strong> completed a milestone in the phase",
        shouldBundle: true,
        bundledText:
          "Milestones completed {{bundledCount}} times. Last completed by: <strong>{{userHandle}}</strong>",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.PROJECT_PLAN.WAITING_FOR_CUSTOMER_INPUT,
    type: NOTIFICATION_TYPE.UPDATES,
    rules: [
      {
        text: "We are waiting for your input in the project {{projectName}}",
        projectRoles: [PROJECT_ROLE_OWNER, PROJECT_ROLE_MEMBER],
        goTo: GOTO.PHASE,
      },
      {
        text: "Waiting for customer on a milestone in the project {{projectName}}",
        projectRoles: [
          PROJECT_ROLE_COPILOT,
          PROJECT_ROLE_MANAGER,
          PROJECT_ROLE_PROGRAM_MANAGER,
          PROJECT_ROLE_SOLUTION_ARCHITECT,
          PROJECT_ROLE_PROJECT_MANAGER,
        ],
        goTo: GOTO.PHASE,
      },
    ],
  },

  /// Community notification rules

  {
    eventType: EVENT_TYPE.CHALLENGE.ACTIVE,
    type: NOTIFICATION_TYPE.CHALLENGE,
    rules: [
      {
        shouldBundle: false,
        goTo: GOTO.CHALLENGE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.CHALLENGE.AUTOPILOT_ACTIVE,
    type: NOTIFICATION_TYPE.CHALLENGE,
    rules: [
      {
        shouldBundle: false,
        goTo: GOTO.CHALLENGE,
      },
    ],
  },

  {
    eventType: EVENT_TYPE.CHALLENGE.COMPLETED,
    type: NOTIFICATION_TYPE.CHALLENGE,
    rules: [
      {
        shouldBundle: false,
        goTo: GOTO.CHALLENGE,
      },
    ],
  },

  /// TaaS notification rules

  {
    version: 1,
    eventType: EVENT_TYPE.TAAS.POST_INTERVIEW_ACTION_REQUIRED,
    type: NOTIFICATION_TYPE.TAAS,
    rules: [
      {
        text: "Candidate action required for <strong>{{userHandle}}</strong> in job <strong>{{jobTitle}}</strong> of the team <strong>{{teamName}}</strong>",
        shouldBundle: false,
        goTo: GOTO.TAAS_CANDIDATES_INTERVIEWS,
      },
    ],
  },

  {
    version: 1,
    eventType: EVENT_TYPE.TAAS.RESOURCE_BOOKING_EXPIRATION,
    type: NOTIFICATION_TYPE.TAAS,
    rules: [
      {
        textIsPlural: true,
        text: "{{numOfExpiringResourceBookings}} resource bookings are expiring in the team <strong>{{teamName}}</strong>",
        shouldBundle: false,
        goTo: GOTO.TAAS_PROJECT,
      },
      {
        textIsPlural: false,
        text: "{{numOfExpiringResourceBookings}} resource booking is expiring in the team <strong>{{teamName}}</strong>",
        shouldBundle: false,
        goTo: GOTO.TAAS_PROJECT,
      },
    ],
  },

  {
    version: 1,
    eventType: EVENT_TYPE.TAAS.RESOURCE_BOOKING_PLACED,
    type: NOTIFICATION_TYPE.TAAS,
    rules: [
      {
        text: "Resource <strong>{{userHandle}}</strong> is placed for the job <strong>{{jobTitle}}</strong> of the team <strong>{{teamName}}</strong>",
        shouldBundle: false,
        goTo: GOTO.TAAS_PROJECT,
      },
    ],
  },
];

// list of ignored notifications
export const IGNORED_NOTIFICATION_TYPES = [
  EVENT_TYPE.POST.DELETED,
  EVENT_TYPE.MEMBER.INVITE_CREATED,
  EVENT_TYPE.TOPIC.DELETED,
];

// create a flat list of all possible notifications (expand notification rules)
export const NOTIFICATION_RULES = (() => {
  const notificationRules = [];

  NOTIFICATIONS.forEach((notification) => {
    notification.rules.forEach((notificationRule) => {
      notificationRules.push({ ...notification, ...notificationRule });
    });
  });

  return notificationRules;
})();
