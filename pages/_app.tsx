import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"container"}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Ably and Next.js template" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={"main"}>
        <Component {...pageProps} />
      </main>
      <footer className={"footer"}>
        Powered by{' '}
        <span className={"logo"}>
          <a
            href="https://ably.com/?utm_source=github&utm_medium=github-repo&utm_campaign=GLB-2211-ably-nextjs-template&utm_content=ably-nextjs-template&src=GLB-2211-ably-nextjs-template-github-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="https://static.ably.dev/logo-h-mono-black.svg?ably-nextjs-template" alt="Ably Logo"  width={102} height={18} />
          </a>
        </span>
        &amp;
        <span className={"logo"}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=ably-nextjs-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={16} />
          </a>
        </span>
      </footer>
    </div>
  )
}
