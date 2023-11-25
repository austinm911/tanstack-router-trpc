import React from 'react'
import { useSearch, useNavigate, Link, useParams } from '@tanstack/react-router'
import { postRoute } from '../routes'
import { trpc } from '../App'

type Props = {
    postId: number
}

export function PostIdPage({ postId }: Props) {
    const post = trpc.post.useQuery(postId).data

    const search = useSearch({ from: postRoute.id })
    const navigate = useNavigate({ from: postRoute.id })
    const params = useParams({ from: postRoute.id })

    console.log("🚀 ~ file: PostIdPage.tsx:14 ~ PostIdPage ~ post:", { post })
    console.log("🚀 ~ file: PostIdPage.tsx:16 ~ PostIdPage ~ search:", { search })
    console.log("🚀 ~ file: PostIdPage.tsx:18 ~ PostIdPage ~ navigate:", { navigate })

    const [notes, setNotes] = React.useState(search.notes ?? ``)

    React.useEffect(() => {
        navigate({
            search: (old) => {
                const newValue = { ...old, notes: notes ? notes : undefined };
                return newValue;
                console.log("notes:", notes);
                console.log("old:", old);
                console.log("newValue:", newValue);
            },
            replace: true,
            params: { ...params },
        })
    }, [notes])

    return (
        <div className="p-2 space-y-2" key={post?.id}>
            <div className="space-y-2">
                <h2 className="text-lg font-bold">
                    <input
                        defaultValue={post?.id}
                        className="w-full p-2 border border-opacity-50 rounded"
                        disabled
                    />
                </h2>
                <div>
                    <textarea
                        defaultValue={post?.title}
                        rows={6}
                        className="w-full p-2 border border-opacity-50 rounded"
                        disabled
                    />
                </div>
            </div>
            <div>
                <Link
                    search={(old) => ({
                        ...old,
                        showNotes: old?.showNotes ? undefined : true,
                    })}
                    className="text-blue-700"
                >
                    {search.showNotes ? 'Close Notes' : 'Show Notes'}{' '}
                </Link>
                {search.showNotes ? (
                    <>
                        <div>
                            <div className="h-2" />
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={5}
                                className="w-full p-2 rounded shadow"
                                placeholder="Write some notes here..."
                            />
                            <div className="text-xs italic">
                                Notes are stored in the URL. Try copying the URL into a new
                                tab!
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )

}