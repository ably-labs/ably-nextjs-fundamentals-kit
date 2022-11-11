import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react'
import Layout from '../components/layout'
import * as Ably from 'ably/promises'
import { assertConfiguration, configureAbly } from '@ably-labs/react-hooks';

import styles from '../styles/Home.module.css'
import authStyles from '../styles/Authentication.module.css'

type ConnectionLog = {
  stateChange: Ably.Types.ConnectionStateChange,
  timestamp: Date,
}

export default function Authentication() {

  const [logs, setLogs] = useState<Array<ConnectionLog>>([])
  const [connectionState, setConnectionState] = useState('unknown')

  useEffect(() => {
    const handleConnectionStateChange = (stateChange: Ably.Types.ConnectionStateChange) => {
      const logsCopy = [...logs]
      logsCopy.push({stateChange: stateChange, timestamp: new Date()})
      setLogs(logsCopy)

      setConnectionState(stateChange.current)
    }

    const ably = configureAbly({ authUrl: '/api/authentication/token-auth' })
    ably.connection.on(handleConnectionStateChange)

    return () => {ably.connection.off()}
  })

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

        <section>
          <h3>Connection status: <span className={authStyles[`connection-${connectionState}`]}>{connectionState}</span></h3>
          
          <div className={authStyles['connection-action']}>
            <button onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
          </div>

          <ul>
            {
              // Show the newest log entry at the top
              logs.sort((a: ConnectionLog, b: ConnectionLog) => {
                  return b.timestamp.getTime() - a.timestamp.getTime()
                }).map(logEntry => {
                return (
                  <li key={logEntry.timestamp.toISOString()}>
                    {logEntry.timestamp.toISOString()}: Connection state change: {logEntry.stateChange.previous} &#8594; {logEntry.stateChange.current}
                  </li>
                )}
              )
            }
          </ul>
        </section>
      </Layout>
  )
}
