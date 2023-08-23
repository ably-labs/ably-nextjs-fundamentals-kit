'use client'

import * as Ably from 'ably';
import { AblyProvider, useChannel } from "@ably-labs/react-hooks"
import { MouseEventHandler, MouseEvent, useState } from 'react'

import Logger, { LogEntry } from '../../components/logger';
import NavBar from '../../components/navbar';

export default function PubSub() {

    return (
      <div className="container mx-auto">
      <header>
        <NavBar />
      </header>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <p className="mb-8 text-sm font-normal text-gray-500 text-center">
            Publish messages on channels and subscribe to channels to receive messages. Click the <b>Publish from the client</b> to publish a message on a channel from the web browser client. Click the <b>Public from the server</b> to publish a message from a serverless function.
          </p>
          <AblyProvider options={{ authUrl:'/api/authentication/token-auth' }}>
              <PubSubMessages />
          </AblyProvider> 
        </div>
        </section>
      </div>  
    )
}

function PubSubMessages() {

    const [logs, setLogs] = useState<Array<LogEntry>>([])
    const { channel } = useChannel("status-updates", (message: Ably.Types.Message) => {
        setLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
    });
    const [messageText, setMessageText] = useState<string>('A message')

    const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        if(channel === null) return
        channel.publish('update-from-client', {text: `${messageText} @ ${new Date().toISOString()}`})
   }

    const publicFromServerHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        fetch('/api/pub-sub/publish', {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json',
            },
            'body': JSON.stringify({text: `${messageText} @ ${new Date().toISOString()}`})
        })
    }

    return (
      <>
        <div className="flex flex-row">
          <span className="block mb-2 text-sm font-medium text-gray-900">Message text:</span>
          <input className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" id="message" type="text" placeholder="message to publish" value={messageText}  onChange={e => setMessageText(e.target.value)} />              
          <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={publicFromClientHandler}>Publish from client</button>
          <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={publicFromServerHandler}>Publish from server</button>
        </div>

        <div className="p-5">
            <h3 className="block mb-2 text-sm font-medium text-gray-900">Message Log</h3>
            <Logger logEntries={logs} />
        </div>
      </>       
    )
}
