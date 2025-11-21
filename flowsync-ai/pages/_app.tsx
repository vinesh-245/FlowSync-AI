import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FlowSync AI - AI-Powered Productivity Assistant</title>
        <meta name="description" content="FlowSync AI is an intelligent productivity assistant that automates workflows, optimizes time management, and enhances remote work efficiency using artificial intelligence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI, productivity, remote work, automation, time management, workflow, task management, artificial intelligence" />
        <meta name="author" content="Vinesh Thota" />
        <meta property="og:title" content="FlowSync AI - AI-Powered Productivity Assistant" />
        <meta property="og:description" content="Boost your productivity with AI-powered workflow automation and intelligent time management tools." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FlowSync AI - AI-Powered Productivity Assistant" />
        <meta name="twitter:description" content="Boost your productivity with AI-powered workflow automation and intelligent time management tools." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}