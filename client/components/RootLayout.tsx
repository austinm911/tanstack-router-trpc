import React from 'react'
import { Spinner } from './spinner'
import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type Props = {}

export function RootLayout({ }: Props) {
    const isPending = useRouterState({ select: (s) => s.status === 'pending' })
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <div className={`flex items-center border-b gap-2`}>
                    <h1 className={`text-3xl p-2`}>Kitchen Sink</h1>
                    {/* Show a global spinner when the router is transitioning */}
                    <div
                        className={`text-3xl duration-300 delay-0 opacity-0 ${isPending ? ` duration-1000 opacity-40` : ''
                            }`}
                    >
                        <Spinner />
                    </div>
                </div>
                <div className={`flex-1 flex`}>
                    <div className={`divide-y w-56`}>
                        {(
                            [
                                ['/', 'Home'],
                                ['/dashboard', 'Dashboard'],
                            ] as const
                        ).map(([to, label]) => {
                            return (
                                <div key={to}>
                                    <Link
                                        to={to}
                                        activeOptions={
                                            {
                                                // If the route points to the root of it's parent,
                                                // make sure it's only active if it's exact
                                                // exact: to === '.',
                                            }
                                        }

                                        preload="intent"
                                        className={`block py-2 px-3 text-blue-700`}
                                        // Make "active" links bold
                                        activeProps={{ className: `font-bold` }}
                                    >
                                        {label}
                                    </Link>
                                </div>
                            )
                        })}
                        <Link to='/$teamId' params={{ teamId: 'tem382789sbnd' }}>
                            Go to Team
                        </Link>
                    </div>
                    <div className={`flex-1 border-l border-gray-200`}>
                        {/* Render our first route match */}
                        <Outlet />
                    </div>
                </div>
            </div>
            <TanStackRouterDevtools position="bottom-right" />
        </>
    )
}