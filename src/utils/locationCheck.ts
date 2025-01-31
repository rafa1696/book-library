import { NavigationRoutes } from "../enums/NavigationRoutes.enum";

/**
 * Checar a localização atual da aplicação
 * @returns 0 para Home, 1 para MyBooks e -1 para qualquer outra rota
 */
export const locationCheck = () => {
  const splitHash = location.hash.split("#")[1];

  if (splitHash === NavigationRoutes.Home) {
    return 0;
  }
  if (splitHash.includes(NavigationRoutes.MyBooks)) {
    return 1;
  }
  return -1;
};
