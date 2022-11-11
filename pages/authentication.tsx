import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import authStyles from '../styles/Authentication.module.css'
import * as Ably from 'ably/promises'
import { assertConfiguration, configureAbly } from '@ably-labs/react-hooks';

type ConnectionLog = {
  stateChange: Ably.Types.ConnectionStateChange,
  timestamp: Date,
}

export default function Authentication() {

  const [logs, setLogs] = useState<Array<ConnectionLog>>([])
  const [connectionState, setConnectionState] = useState('unknown')

  useEffect( () => {
    const handleConnectionStateChange = (stateChange: Ably.Types.ConnectionStateChange) => {
      console.log("useEffect:", stateChange)
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
    console.log('connectionToggle', connectionState)
    const ably = assertConfiguration()
    if(connectionState === 'connected') {
      ably.connection.close()
    }
    else if(connectionState === 'closed') {
      ably.connection.connect()
    }
  }

  console.log('inline', logs)

  return (
      <Layout
        pageTitle="Ably Token Authentication with Next.js"
        metaDescription="Ably Token Authentication with Next.js"
      >
        <p className={styles.description}>
          Authentication overview
        </p>

        <h3>Connection details</h3>
        <b>Connection status:</b> <span className={authStyles[`connection-${connectionState}`]}>{connectionState}</span>
        <button onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
        <ul>
          {
            logs.sort((a: ConnectionLog, b: ConnectionLog) => { return b.timestamp.getTime() - a.timestamp.getTime() }).map(logEntry => {
              return <li key={logEntry.timestamp.toISOString()}>{logEntry.timestamp.toISOString()}: Connection state change: {logEntry.stateChange.previous} &#8594; {logEntry.stateChange.current}</li>
            })
          }
        </ul>
      </Layout>
  )
}
