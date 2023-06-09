import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
      <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/pokeball-icon.png" />
        <link href="https://fonts.cdnfonts.com/css/spacetype" rel="stylesheet"></link>
      </Head>
        <Component {...pageProps} />
        <Analytics />
      </>
    )
  }