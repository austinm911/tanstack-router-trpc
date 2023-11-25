import { Link, MatchRoute, Outlet } from '@tanstack/react-router'
import { postRoute } from '../routes'
import { Spinner } from './spinner'
import { trpc } from '../App'

type Props = {}

export function PostsLayout({ }: Props) {
    const posts = trpc.posts.useQuery().data

    return (
        <div className="flex-1 flex">
            <div className="divide-y w-48">
                {posts?.map((post) => {
                    return (
                        <div key={post.id}>
                            <Link
                                to={postRoute.fullPath}
                                params={{
                                    postId: post.id,
                                }}
                                preload="intent"
                                className="block py-2 px-3 text-blue-700"
                                activeProps={{ className: `font-bold` }}
                            >
                                <pre className="text-sm">
                                    #{post.id} - {post.title.slice(0, 10)}{' '}
                                    <MatchRoute
                                        to={postRoute.fullPath}
                                        params={{
                                            postId: post.id,
                                        }}
                                        pending
                                    >
                                        <Spinner />
                                    </MatchRoute>
                                </pre>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex-1 border-l border-gray-200">
                <Outlet />
            </div>
        </div>
    )
}