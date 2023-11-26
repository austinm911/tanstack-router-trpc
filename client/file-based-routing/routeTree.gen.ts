import { route as rootRoute } from "./routes/__root"
import { route as LayoutRoute } from "./routes/_layout"

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_layout": {
      parentRoute: typeof rootRoute
    }
  }
}

Object.assign(LayoutRoute.options, {
  id: "/layout",
  getParentRoute: () => rootRoute,
})

export const routeTree = rootRoute.addChildren([LayoutRoute])
