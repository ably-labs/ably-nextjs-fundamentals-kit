import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Layout.module.css'

type LayoutProps = {
  children: React.ReactNode,
  title: string,
  description: string,
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        Powered by{' '}
        <span className={styles.logo}>
          <a
            href="https://ably.com/?utm_source=github&utm_medium=github-repo&utm_campaign=GLB-2211-ably-nextjs-template&utm_content=ably-nextjs-template&src=GLB-2211-ably-nextjs-template-github-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="https://static.ably.dev/logo-h-mono-black.svg?ably-nextjs-template" alt="Ably Logo"  width={102} height={18} />
          </a>
        </span>
        &amp;
        <span className={styles.logo}>
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
