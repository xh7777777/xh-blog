'use client'
import React from 'react'
import Main from './Main'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export default function Page() {
  const [queryClient] = React.useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>
        <Main />
    </QueryClientProvider>
}
