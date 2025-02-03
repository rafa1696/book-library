import { NavigationRoutes } from "../enums/NavigationRoutes.enum";

/**
 * Checar a localização atual da aplicação
 * @returns 0 para Home, 1 para MyBooks e -1 para qualquer outra rota
 */
export const locationCheck = () => {
  const splitLocation = location.hash
    ? location.hash.split("#")[1]
    : location.pathname;

  if (splitLocation === NavigationRoutes.Home || splitLocation === "/") {
    return 0;
  }
  if (splitLocation.includes(NavigationRoutes.MyBooks)) {
    return 1;
  }
  return -1;
};
