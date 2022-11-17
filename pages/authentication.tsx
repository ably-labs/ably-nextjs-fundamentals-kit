import * as Ably from 'ably/promises';
import { assertConfiguration, configureAbly } from '@ably-labs/react-hooks';

import Layout from '../components/layout'
import Logger, { LogEntry } from '../components/logger'
import styles from '../styles/Home.module.css'
import authStyles from '../styles/Authentication.module.css'

import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react'

export default function Authentication() {

  const ably = assertConfiguration();
  const [logs, setLogs] = useState<Array<LogEntry>>([]);
  const [connectionState, setConnectionState] = useState('unknown');

  useEffect(() => {
    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      setLogs(prev => [...prev, new LogEntry(`Connection state change: ${stateChange.previous} -> ${stateChange.current}`)])
      setConnectionState(stateChange.current);
    });

    return () => {
      ably.connection.off();
    }
  }, [ably.connection]) // Only run the client

  const connectionToggle: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if (connectionState === 'connected') {
      ably.connection.close();
    }
    else if (connectionState === 'closed') {
      ably.connection.connect();
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
          <button onClick={connectionToggle}>{connectionState === 'connected' ? 'Disconnect' : 'Connect'}</button>
        </div>

        <Logger logEntries={logs} />
      </section>
    </Layout>
  )
}
