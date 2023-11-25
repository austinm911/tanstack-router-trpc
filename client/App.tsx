import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import type { AppRouter } from '../server/server';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { useState } from 'react';
import { router } from './routes';

// Create a client
export const queryClient = new QueryClient()
export const trpc = createTRPCReact<AppRouter>();

export function App() {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:4000',
                    // You can pass any HTTP headers you wish here
                    // async headers() {
                    //     return {
                    //         authorization: getAuthCookie(),
                    //     };
                    // },
                }),
            ],
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    router={router}
                    defaultPreload="intent"
                // context={{
                //     auth,
                // }}
                />
                {/* Your app here */}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
