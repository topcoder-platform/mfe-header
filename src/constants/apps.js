/**
 * Config for the All Apps menu.
 */
import config from "../../config";
import appDocumentationIcon from "../assets/images/learn.svg";
import appTaasIcon from "../assets/images/integrations.svg";
import appTaasAdminIcon from "../assets/images/taas-admin.png";
import myteamsIcon from "../assets/images/my-teams.svg";
import myteamsGreenIcon from "../assets/images/my-teams-green.svg";
import createTeamIcon from "../assets/images/create-team.svg";
import createTeamGreenIcon from "../assets/images/create-team-green.svg";
import earnIcon from "../assets/images/earn.svg";

/**
 * Micro-app categories
 */
export const APP_CATEGORIES = [
  {
    category: "Manage",
    apps: [
      {
        title: "TaaS Admin",
        icon: appTaasAdminIcon,
        path: "/taas-admin",
        menu: [],
        roles: ["bookingmanager", "administrator"],
      },
      {
        title: "Documentation",
        icon: appDocumentationIcon,
        path: "/model",
        menu: [],
      },
      {
        title: "Community Admin",
        icon: myteamsIcon,
        path: "/community-admin",
        menu: [],
        roles: ["Community Admin"],
      },
    ],
  },
  {
    category: "Work",
    apps: [
      {
        title: "Self Service",
        icon: earnIcon,
        link: `${config.URL.PLATFORM_UI}/work/dashboard`,
        menu: [],
      },
    ],
  },
  {
    category: "Do",
    apps: [
      {
        title: "Earn",
        icon: earnIcon,
        path: "/earn",
        menu: [],
      },
    ],
  },
  {
    category: "Onboard",
    hidden: true,
    apps: [
      {
        title: "Member Onboarding",
        path: "/onboard",
        isExact: false,
        menu: [],
      },
    ],
  },
];
