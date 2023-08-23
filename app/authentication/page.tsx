'use client'

import { MouseEventHandler, MouseEvent, useState, useEffect } from 'react'

import * as Ably from 'ably/promises'
import Logger, { LogEntry } from '../../components/logger'
import NavBar from '../../components/navbar'
import { AblyProvider, useAbly, useConnectionStateListener } from '@ably-labs/react-hooks'

export default function Authentication() {
  return (
    <div className="container mx-auto">
      <header>
        <NavBar />
      </header>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <p className="mb-8 text-sm font-normal text-gray-500 text-center">
          Authenticate and establish a persistent bi-direction connection to the Ably platform.
          </p>
          <AblyProvider options={{ authUrl:'/api/authentication/token-auth' }}>
              <ConnectionStatus />
          </AblyProvider>
        </div>
      </section>
    </div>    
  )
}

const ConnectionStatus = () => {
  
  const ably = useAbly();
  
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const [connectionState, setConnectionState] = useState('unknown')


  useConnectionStateListener((stateChange) => {
    setConnectionState(stateChange.current)
    setLogs(prev => [...prev, new LogEntry(`Connection state change: ${stateChange.previous} -> ${stateChange.current}`)])
  })
  
  const connectionToggle: MouseEventHandler =  (_event: MouseEvent<HTMLButtonElement>) => {
    if(connectionState === 'connected') {
      ably.connection.close()
    }
    else if(connectionState === 'closed') {
      ably.connection.connect()
    }
  }

  return (
    <>
      <section className="mb-8 text-sm font-normal text-gray-500 text-center">
        <h3>Connection status: <span className="">{connectionState}</span></h3>
        
        <div>
          <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
        </div>

        <Logger logEntries={logs} />
      </section>
    </>
  )
}