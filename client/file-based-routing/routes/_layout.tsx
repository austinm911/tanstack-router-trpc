import { Link, Outlet, FileRoute } from '@tanstack/react-router'

export const route = new FileRoute('/_layout').createRoute({
    component: () => {
        return (
            <div>
                <div>I'm a layout</div>
                <div>
                    <Outlet />
                </div>
            </div>
        )
    },
})
