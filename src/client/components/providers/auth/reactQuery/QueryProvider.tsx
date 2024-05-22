"use client"
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'

  // Create a client
  const queryClient = new QueryClient()
  
  function QueryProvider({children}: {children: React.ReactNode}) {
    return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
  export default QueryProvider