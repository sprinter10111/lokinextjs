import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header';

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../../appolo-client'; // Adjust the path accordingly

const client = createApolloClient();

require('dotenv').config()


export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
   <ApolloProvider client={client}>
 <Header/>
  <Component {...pageProps} />
  </ApolloProvider>
  </>
  )
}