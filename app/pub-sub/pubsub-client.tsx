'use client'

import * as Ably from 'ably';
import { AblyProvider, useChannel } from "ably/react"
import { MouseEventHandler, MouseEvent, useState } from 'react'
import Logger, { LogEntry } from '../../components/logger';
import SampleHeader from '../../components/SampleHeader';

export default function PubSubClient() {

  const client = new Ably.Realtime.Promise ({ authUrl: '/token', authMethod: 'POST' });

  return (
    <AblyProvider client={ client }>
      <div className="flex flex-col justify-start items-start gap-4 h-[172px]">
        <SampleHeader sampleName="Pub/Sub Channels" sampleIcon="PubSubChannels.svg" sampleDocsLink="https://ably.com/docs/getting-started/react#useChannel" />
        <div className="font-next-book text-base w-[480px] text-slate-800 text-opacity-100 leading-6 font-light">
          Publish messages on channels and subscribe to channels to receive messages. Click&nbsp;<span className="font-medium">Publish from Client</span>&nbsp;to publish a message on a channel from the web browser client. Click&nbsp;<span className="font-medium">Publish from Server</span>&nbsp;to publish a message from a serverless function.
        </div>
      </div>
      <PubSubMessages />
    </AblyProvider>
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
    fetch('/publish', {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json',
        },
        'body': JSON.stringify({text: `${messageText} @ ${new Date().toISOString()}`})
    })
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 h-[138px]">
        <div className="font-next-book text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">Message text</span>
        </div>
        <div className="flex justify-center items-center rounded-md border-zinc-300 border-t border-b border-l border-r border-solid border w-[752px] h-12 bg-neutral-100">
          <div className="font-next-book text-base min-w-[720px] whitespace-nowrap text-zinc-800 text-opacity-100 leading-6 font-light">
            <input value={messageText}  onChange={e => setMessageText(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-4 w-[368px]">
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-black">
            <div className="font-next-book text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromClientHandler}>Publish from Client</button>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-black">
            <div className="font-next-book text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromServerHandler}>Publish from Server</button>
            </div>
          </div>
        </div>
      </div>
      <Logger logEntries={logs} />
    </>
  )
}