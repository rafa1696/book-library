import { NavigationRoutes } from "../enums/NavigationRoutes.enum";

export const locationCheck = () => {
  // console.log("locationCheck", location.pathname);
  if (location.pathname.split("/").includes(NavigationRoutes.Home)) {
    return 0;
  }
  if (location.pathname.includes(NavigationRoutes.MyBooks)) {
    return 1;
  }
  return -1;
};
