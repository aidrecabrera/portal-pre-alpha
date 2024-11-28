import { routeTree } from "@/routeTree.gen";

export function getAllRoutes() {
  const routes: string[] = [];

  function traverseRouteTree(route: any, path: string) {
    if (route.path) {
      const fullPath = path + route.path;
      routes.push(fullPath);
    }

    if (route.children) {
      Object.values(route.children).forEach((childRoute: any) => {
        traverseRouteTree(childRoute, path + (route.path || ""));
      });
    }
  }

  traverseRouteTree(routeTree, "");

  return routes;
}
