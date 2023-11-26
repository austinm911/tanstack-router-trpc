import { Link, Navigate, Outlet, RootRoute, Route, Router, useNavigate, useParams } from "@tanstack/react-router"
import { z } from "zod"
import { DashboardLayout } from "./components/DashboardLayout"
import { DashboardPage } from "./components/DashboardPage"
import { PostIdPage } from "./components/PostIdPage"
import { PostsLayout } from "./components/PostsLayout"
import { RootLayout } from "./components/RootLayout"
import { RootPage } from "./components/RootPage"
import { Spinner } from "./components/spinner"
import { routeTree as fileRouteTree } from './file-based-routing/routeTree.gen'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

// Switch between file based and normal routing with Tanstack Router
export const FILE_BASED_ROUTING = false


const rootRoute = new RootRoute({
    component: () => {
        const navigate = useNavigate({ from: '/' })
        // navigate({ to: '/$teamId', replace: true, params: { teamId: 'tem382789sbnd' } })
        const params = useParams({ from: '/$teamId' })
        console.log("🚀 ~ file: routes.tsx:21 ~ params:", params)

        return (

            <div>
                <TanStackRouterDevtools />
                <div className="flex gap-4 bg-neutral-200">NavBar <div>
                </div>
                    <Link to="/" className="">
                        Home
                    </Link>
                    <Link to={'/dashboard'} >
                        Dashboard
                    </Link>
                    <Link to="/$teamId/contacts" params={{ teamId: 'team233as' }}>
                        Contacts
                    </Link>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        )
    },
})

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => {
        const navigate = useNavigate({ from: '/' })
        navigate({ to: '/$teamId/contacts', replace: true, params: { teamId: 'tem382789sbnd' } })

    }
    // component: RootPage,
})

const teamRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '$teamId',
    parseParams: (params) => ({
        teamId: z.string().parse(params.teamId),
    }),
    component: () => {
        const params = useParams({ from: "/$teamId" })
        return (
            <div>
                <div>Team Page -- TeamId:({params.teamId})</div>
                <hr />
                <div>
                    <Outlet />
                </div>
            </div>
        )
    },
})

const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    // component: DashboardLayout,
    component: () => {
        return (
            <div>
                <div>Dashboard</div>
                <div>
                    <Outlet />
                </div>
            </div>
        )
    },
})



const dashboardIndexRoute = new Route({
    getParentRoute: () => dashboardRoute,
    path: '/',
    component: () => {
        return (
            <>
                <div className="p-2">Select a dashboard to view.</div>
            </>
        )
    },
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


export const contactRoute = new Route({
    getParentRoute: () => teamRoute,
    path: 'contacts',
    component: () => {
        const params = useParams({ from: "/$teamId" })
        console.log("🚀 ~ file: routes.tsx:145 ~ params:", params)

        return (
            <>
                <div className="p-2">Contacts Page - Team ID:({params.teamId})</div>
                <hr />
                <Link to={'/$teamId/contacts/info'} params={{ teamId: params.teamId }}>
                    Info
                </Link>
                <Link to={'/$teamId/contacts/address'} params={{ teamId: params.teamId }}>
                    Address
                </Link>
                <hr />
                <Outlet />
            </>
        )
    },
})

export const contactInfoRoute = new Route({
    getParentRoute: () => contactRoute,
    path: 'info',
    component: () => {
        return (
            <>
                <p>First Name: Bob</p>
            </>
        )
    },
})

export const contactAddressRoute = new Route({
    getParentRoute: () => contactRoute,
    path: 'address',
    component: () => {
        return (
            <>
                <p>Address</p>
            </>
        )
    },
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    teamRoute,
    contactRoute.addChildren([contactInfoRoute, contactAddressRoute]),
    dashboardRoute.addChildren([
        dashboardIndexRoute,
        postsRoute.addChildren([postsIndexRoute, postRoute]),
    ]),
])

export const router = new Router({
    routeTree: FILE_BASED_ROUTING ? fileRouteTree : routeTree,
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