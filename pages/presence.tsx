import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Presence() {
  return (
      <Layout
        pageTitle="Ably Presence with Next.js"
        metaDescription="Ably Presence with Next.js"
      >
        <p className={styles.description}>
          Presence overview
        </p>
      </Layout>
  )
}
