import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import  AuthContextProvider  from '@/context/authContext'
import { QueryClient, QueryClientProvider,  } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </QueryClientProvider>
    </AuthContextProvider>
  ) 
}
