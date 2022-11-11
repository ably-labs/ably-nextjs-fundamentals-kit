import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Authentication() {
  return (
      <Layout
        pageTitle="Ably Token Authentication with Next.js"
        metaDescription="Ably Token Authentication with Next.js"
      >
        <p className={styles.description}>
          Authentication overview
        </p>
      </Layout>
  )
}
