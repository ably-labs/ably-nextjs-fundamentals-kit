import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react'

import Layout from '../components/layout'
import Logger, { LogEntry } from '../components/logger'

import * as Ably from 'ably/promises'
import { assertConfiguration, configureAbly } from '@ably-labs/react-hooks'

import styles from '../styles/Home.module.css'
import authStyles from '../styles/Authentication.module.css'

export default function Authentication() {

  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const [connectionState, setConnectionState] = useState('unknown')

  useEffect(() => {
    const handleConnectionStateChange = (stateChange: Ably.Types.ConnectionStateChange) => {
      setLogs(prev => [...prev, new LogEntry(`Connection state change: ${stateChange.previous} -> ${stateChange.current}`)])

      setConnectionState(stateChange.current)
    }

    const ably: Ably.Types.RealtimePromise = configureAbly({ authUrl: '/api/authentication/token-auth' })
    ably.connection.on(handleConnectionStateChange)

    return () => {
      ably.connection.off()
    }
  }, []) // Only run the client

  const connectionToggle: MouseEventHandler =  (_event: MouseEvent<HTMLButtonElement>) => {
    const ably = assertConfiguration()

    if(connectionState === 'connected') {
      ably.connection.close()
    }
    else if(connectionState === 'closed') {
      ably.connection.connect()
    }
  }

  return (
      <Layout
        pageTitle="Ably Token Authentication with Next.js"
        metaDescription="Ably Token Authentication with Next.js"
      >
        <p className={styles.description}>
          Authenticate and establish a persistent bi-direction connection to the Ably platform.
        </p>

        <section className={authStyles[`connection-${connectionState}`]}>
          <h3>Connection status: <span className={authStyles.label}>{connectionState}</span></h3>
          
          <div className={authStyles['connection-action']}>
            <button onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
          </div>

          <Logger logEntries={logs} />
        </section>
      </Layout>
  )
}
