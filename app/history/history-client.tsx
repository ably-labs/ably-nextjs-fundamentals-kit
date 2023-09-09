'use client'

import * as Ably from 'ably';
import { AblyProvider, useChannel } from 'ably/react'
import Logger, { LogEntry } from '../../components/logger';
import { useEffect, useState } from 'react';
import NavBar from '../../components/navbar';

export default function History() {

  const client = new Ably.Realtime.Promise ({ authUrl: '/token', authMethod: 'POST' });

  return (
    <div className="container mx-auto">
      <header>
        <NavBar />
      </header>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <p className="mb-8 text-sm font-normal text-gray-500 text-center">
          Retrieve a history of messages that have been published to a channel. Publish messages via the <a href="/pub-sub" target="_blank">Pub/Sub example</a> Messages are only stored for 2 minutes by default. In order for them to be stored for longer you should enable the <b>Persist all messages</b> <a href="https://ably.com/docs/general/channel-rules-namespaces?utm_source=github&utm_medium=github-repo&utm_campaign=GLB-2211-ably-nextjs-fundamentals-kit&utm_content=ably-nextjs-fundamentals-kit&src=GLB-2211-ably-nextjs-fundamentals-kit-github-repo" target="_blank" rel="noreferrer">channel rule</a> for the <b>status-updates</b> channel in your Ably app.
          </p>
          <AblyProvider client={ client }>
              <HistoryMessages />
          </AblyProvider>
        </div>
      </section>
    </div>    
  )
}

function HistoryMessages() {

  const [realtimeLogs, setRealtimeLogs] = useState<Array<LogEntry>>([])
  const [historicalLogs, setHistoricalLogs] = useState<Array<LogEntry>>([])

  const { channel } = useChannel("status-updates", (message: Ably.Types.Message) => {
    console.log(message);
    setRealtimeLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
  });

  useEffect(() => {
    const getHistory = async () => {
      let history: Ably.Types.PaginatedResult<Ably.Types.Message> = await channel.history()
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
  }, [])
  
  return (
    <div className="p-5">
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
    </div>
  )
}
