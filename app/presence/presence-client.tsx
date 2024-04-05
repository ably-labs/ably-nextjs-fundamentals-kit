'use client'

import * as Ably from 'ably';
import names from  'random-names-generator'

import { AblyProvider, ChannelProvider, useAbly, usePresence, usePresenceListener } from "ably/react"
import { useState, ReactElement, FC } from 'react'
import Logger, { LogEntry } from '../../components/logger';
import SampleHeader from '../../components/SampleHeader';

export default function Presence() {

  const [randomName]  =  useState(names.random());
  const [isOnline, setIsOnline] = useState(false)

  const client = new Ably.Realtime ({ authUrl:'/token', authMethod: 'POST', clientId: randomName });

  function toggleState(val: boolean) {
    setIsOnline(val)
  }

  return (
     <AblyProvider client={ client }>
      <ChannelProvider channelName="room">
        <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-start items-start gap-10">
          <SampleHeader sampleName="Presence" sampleIcon="Presence.svg" sampleDocsLink="https://ably.com/docs/getting-started/react#usePresence" />
          <div className="font-manrope text-base max-w-screen-sm text-slate-800 text-opacity-100 leading-6 font-light">
              Presence with Ably allows you to keep track of devices that are
              present on a channel. This is great for tracking if a device is
              online or offline or indicating if a user is in a chat room when
              using Ably for Chat.&nbsp;
              <a href="" target="_blank"><span className="text-sky-600 text-opacity-100">
                Open this page in another tab
              </span></a>
              &nbsp;to see more users enter and leave the presence channel.
            </div>
            { isOnline ? (
              <PresenceMessages toggle={toggleState} />
            ) : (
              <div className="flex justify-center items-center rounded-md w-[120px] h-10 bg-black">
                <div className="font-manrope text-base min-w-[80px] whitespace-nowrap text-white text-opacity-100 text-center leading-4 font-medium">
                  <button onClick={() => setIsOnline(true)}>Join</button>
                </div>
              </div>
            ) }
          </div>
        </div>
      </ChannelProvider>
    </AblyProvider>   
  )
}

const PresenceMessages: FC<any> = ({toggle}): ReactElement => {
  
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const client = useAbly();

  const { updateStatus } = usePresence("room", {'status':'available'}, );
  const { presenceData } = usePresenceListener("room", (member) => {
    setLogs(prev => [...prev, new LogEntry(`action: ${member.action} clientId: ${member.clientId}`)])
  });

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-[752px]">
        <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border bg-white min-w-[752px]">
          <div className="font-jetbrains-mono text-sm min-w-[227px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium">
            <ul>
            {presenceData.map((member) => {
              return (<li className="font-jetbrains-mono text-sm min-w-[133px] whitespace-nowrap text-rose-400 text-opacity-100 leading-normal font-medium" key={member.id}>{member.clientId}</li>)
            })}
          </ul>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-md w-[120px] h-10 bg-black">
          <div className="font-manrope text-base min-w-[80px] whitespace-nowrap text-white text-opacity-100 text-center leading-4 font-medium">
            <button onClick={() => toggle(false)}>Leave</button>
          </div>
        </div>
      </div>
      <Logger logEntries={logs} displayHeader={true} />
    </>
  )
}
