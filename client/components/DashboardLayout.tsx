import { Link, Outlet } from '@tanstack/react-router'

type Props = {}

export function DashboardLayout({ }: Props) {
    return (
        <>
            <div className="flex items-center border-b">
                <h2 className="text-xl p-2">Dashboard</h2>
                <Link
                    to="/dashboard/posts/$postId"
                    params={{
                        postId: 3,
                    }}
                    className="py-1 px-2 text-xs bg-blue-500 text-white rounded-full"
                >
                    1 New Invoice
                </Link>
            </div>
            <div className="flex flex-wrap divide-x">
                {(
                    [
                        ['.', 'Summary'],
                        ['/dashboard/posts', 'Posts'],
                    ] as const
                ).map(([to, label]) => {
                    return (
                        <Link
                            key={to}
                            to={to}
                            activeOptions={{ exact: to === '.' }}
                            activeProps={{ className: `font-bold` }}
                            className="p-2"
                        >
                            {label}
                        </Link>
                    )
                })}
            </div>
            <hr />
            <Outlet />
        </>
    )
}