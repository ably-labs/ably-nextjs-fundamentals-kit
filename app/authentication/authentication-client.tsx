
'use client'

import { MouseEventHandler, MouseEvent, useState } from 'react'

import * as Ably from 'ably'
import Logger, { LogEntry } from '../../components/logger'
import SampleHeader from '../../components/SampleHeader'
import { AblyProvider, useAbly, useConnectionStateListener } from 'ably/react'

export default function Authentication() {

  const client = new Ably.Realtime({ authUrl: '/token', authMethod: 'POST' });

  return (
    <AblyProvider client={ client }>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-start items-start gap-10">
          <SampleHeader sampleName="Authentication" sampleIcon="Authentication.svg" sampleDocsLink="https://ably.com/docs/getting-started/react#authenticate" />
          <div className="font-manrope text-base max-w-screen-sm text-slate-800 text-opacity-100 leading-6 font-light" >
            Authenticate and establish a persistant bi-directional connection to the Ably platform.
          </div>
          <ConnectionStatus />
        </div>
      </div>
    </AblyProvider>   
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
      <div className="flex flex-col justify-start items-start gap-4 w-[752px] h-[124px]">
        <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border h-[68px] bg-white min-w-[752px]">
          <div className="font-jetbrains-mono text-sm min-w-[227px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium">
            connection status
            <span className="text-zinc-200 text-opacity-100">&nbsp;</span>
            =&nbsp;
            <span className="text-violet-400 text-opacity-100">
              {connectionState}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-md w-[120px] h-10 bg-black">
          <div className="font-manrope text-base min-w-[80px] whitespace-nowrap text-white text-opacity-100 text-center leading-4 font-medium">
            <button onClick={connectionToggle}>{connectionState === 'connected'? 'Disconnect': 'Connect'}</button>
          </div>
        </div>
      </div>
      <Logger logEntries={logs} displayHeader={true} />
    </>
  )
}