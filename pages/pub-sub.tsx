import { MouseEventHandler, MouseEvent, useEffect, useState, useCallback } from 'react'
import Logger, { LogEntry } from '../components/logger'

import * as Ably from 'ably/promises'
import { assertConfiguration, configureAbly, useChannel } from '@ably-labs/react-hooks'

import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function PubSub() {

  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const [channel, setChannel] = useState<Ably.Types.RealtimeChannelPromise | null>(null)

  useEffect(() => {
    const ably: Ably.Types.RealtimePromise = configureAbly({ authUrl: '/api/authentication/token-auth' })

    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      console.log(stateChange)
    })

    const _channel = ably.channels.get('status-updates')
    _channel.subscribe((message: Ably.Types.Message) => {
        setLogs(prev => [...prev, new LogEntry(`Message received: ${message.data.text}`)])
    })
    setChannel(_channel)

    return () => {
      ably.connection.off()
      _channel.unsubscribe()
    }
  }, [])

  const publicFromClientHandler: MouseEventHandler =  (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return

    channel.publish('update-from-client', {text: `Hello from the client @ ${new Date().toISOString()}`})
  }

  return (
      <Layout
        pageTitle="Ably PubSub with Next.js"
        metaDescription="Ably PubSub with Next.js"
      >
        <p className={styles.description}>
          PubSub overview
        </p>

        <section>
          <h3>Publish</h3>
          <button onClick={publicFromClientHandler}>Publish from client</button>
        </section>

        <section>
          <h3>Subscribe</h3>
          <Logger logEntries={logs} />
        </section>
      </Layout>
  )
}
