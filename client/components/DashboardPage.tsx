import React from 'react'
import { trpc } from '../App'

type Props = {}

export function DashboardPage({ }: Props) {

    const posts = trpc.posts.useQuery().data || []
    console.log("🚀 ~ file: DashboardPage.tsx:9 ~ DashboardPage ~ posts:", posts)


    return (
        <div className="p-2">
            <div className="p-2">
                Welcome to the dashboard! You have{' '}
                <strong>{posts.length} total posts</strong>.
            </div>
        </div>
    )
}