import { useState, useEffect } from 'react'

import * as Ably from 'ably/promises'
import { configureAbly } from '@ably-labs/react-hooks'

import Layout from '../components/layout'
import Logger, { LogEntry } from '../components/logger'

import styles from '../styles/Home.module.css'

type Message = {
  timestamp: number,
  data: {
    text: string,
  }
}

export default function History() {

  const [realtimeLogs, setRealtimeLogs] = useState<Array<LogEntry>>([])
  const [historicalLogs, setHistoricalLogs] = useState<Array<LogEntry>>([])

  useEffect(() => {
    const ably: Ably.Types.RealtimePromise = configureAbly({ authUrl: '/api/authentication/token-auth' })

    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      console.log(stateChange)
    })

    const channel = ably.channels.get('status-updates')
    channel.subscribe((message: Ably.Types.Message) => {
      setRealtimeLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
    })

    const getHistory = async () => {
      let history: Ably.Types.PaginatedResult<Message> = await channel.history()
      do {
        history.items.forEach(message => {
          setHistoricalLogs(prev => [
            ...prev,
            new LogEntry(`"${message.data.text}" sent at ${new Date(message.timestamp).toISOString()}`)
          ])
        })
        history = await history.next()
      }
      while(history)
    }
    getHistory()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return (
      <Layout
        pageTitle="Ably History with Next.js"
        metaDescription="Ably History with Next.js"
      >
        <p className={styles.description}>
          Retrieve a history of messages that have been published to a channel.
        </p>
        <p className={styles.info}>
          Publish messages via the <a href="/pub-sub" target="_blank">Pub/Sub example</a>
        </p>
        <p className={styles.info}>
          Messages are only stored for 2 minutes by default. In order for them to be stored for longer you should enable the <b>Persist all messages</b> <a href="https://ably.com/docs/general/channel-rules-namespaces?utm_source=github&utm_medium=github-repo&utm_campaign=GLB-2211-ably-nextjs-fundamentals-kit&utm_content=ably-nextjs-fundamentals-kit&src=GLB-2211-ably-nextjs-fundamentals-kit-github-repo" target="_blank" rel="noreferrer">channel rule</a> for the <b>status-updates</b> channel in your Ably app.
        </p>
        <section>
          <h3>History</h3>
          {
            historicalLogs.length > 0?
            <Logger logEntries={historicalLogs} />
            :
            <p>No historical messages found</p>
          }
        </section>

        <section>
          <h3>Realtime</h3>
          {
            realtimeLogs.length > 0?
            <Logger logEntries={realtimeLogs} />
            :
            <p>No realtime messages received yet</p>
          }
        </section>
      </Layout>
  )
}
