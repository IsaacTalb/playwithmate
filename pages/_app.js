import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../src/components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PlayWithMate — Games for friends & couples</title>
        <meta name="description" content="PlayWithMate: quick party games, icebreakers, trivia, and more for friends, couples, and family." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5a4" />
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}