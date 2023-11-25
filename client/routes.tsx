import { RootRoute, Route, Router } from "@tanstack/react-router"
import { z } from "zod"
import { DashboardLayout } from "./components/DashboardLayout"
import { DashboardPage } from "./components/DashboardPage"
import { PostIdPage } from "./components/PostIdPage"
import { PostsLayout } from "./components/PostsLayout"
import { RootLayout } from "./components/RootLayout"
import { RootPage } from "./components/RootPage"
import { Spinner } from "./components/spinner"

const rootRoute = new RootRoute({
    component: RootLayout,
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: RootPage,
})

const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: DashboardLayout,
})

const dashboardIndexRoute = new Route({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: DashboardPage,
})

const postsRoute = new Route({
    getParentRoute: () => dashboardRoute,
    path: 'posts',
    component: PostsLayout,

})

const postsIndexRoute = new Route({
    getParentRoute: () => postsRoute,
    path: '/',
    component: () => {
        return (
            <>
                <div className="p-2">Select a post to view.</div>
            </>
        )
    },
})

export const postRoute = new Route({
    getParentRoute: () => postsRoute,
    path: '$postId',
    parseParams: (params) => ({
        postId: z.number().int().parse(Number(params.postId)),
    }),
    stringifyParams: ({ postId }) => ({ postId: `${postId}` }),
    validateSearch: z.object({
        showNotes: z.boolean().optional().catch(false),
        notes: z.string().optional(),
    }),
    // TODO: review this options
    load: ({ search }) => { search },
    // load: async ({ params: { postId } }) => { return postId },
    component: (params) => <PostIdPage postId={params.useParams().postId} />,
})
const routeTree = rootRoute.addChildren([
    indexRoute,
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        postsRoute.addChildren([postsIndexRoute, postRoute]),
    ]),
])

export const router = new Router({
    routeTree,
    defaultPendingComponent: () => (
        <div className={`p-2 text-2xl`}>
            <Spinner />
        </div>
    ),
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}