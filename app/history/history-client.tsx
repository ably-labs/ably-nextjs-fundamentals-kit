'use client'

import * as Ably from 'ably';

import { AblyProvider, useChannel } from "ably/react"
import { useState, useEffect } from 'react'
import Logger, { LogEntry } from '../../components/logger';
import SampleHeader from '../../components/SampleHeader';

export default function Presence() {

  const client = new Ably.Realtime.Promise ({ authUrl:'/token', authMethod: 'POST' });

  return (
     <AblyProvider client={ client }>
      <div className="flex flex-col justify-start items-start gap-4">
        <SampleHeader sampleName="History" sampleIcon="History.svg" sampleDocsLink="https://ably.com/docs/storage-history/history?lang=javascript" />
        <div className="font-next-book text-base w-[480px] text-slate-800 text-opacity-100 leading-6 font-light">
          Retrieve a history of messages that have been published to a channel.
          Messages are only stored for 2 minutes by default. In order for them
          to be stored for longer you should enable the&nbsp;
          <span className="text-sm font-jetbrains-mono font-medium">
            &nbsp;&nbsp;
          </span>
          <span className="text-xs font-jetbrains-mono font-medium">
            Persist all messages
          </span>
          &nbsp;&nbsp;
          <span className="text-sky-600 text-opacity-100">channel rule</span>
          <span className="text-black text-opacity-100">&nbsp;</span>for
          the&nbsp;&nbsp;
          <span className="text-xs font-jetbrains-mono font-medium">
            status-updates
          </span>
          &nbsp;channel in your Ably app &nbsp;
        </div>
      </div>
      <div className="flex flex-row justify-start items-start gap-4 pt-4 pr-4 pb-4 pl-4 rounded-lg border-slate-200 border-t border-b border-l border-r border-solid border w-[480px] h-[72px] bg-white">
        <div className="flex flex-col justify-center items-center h-5">
          <img
            width="20.2px"
            height="17.7px"
            src="/assets/Alert.svg"
            alt="Alert"
          />
        </div>
        <div className="font-next-book text-sm w-[408px] text-gray-500 text-opacity-100 leading-5 font-light">
          <span className="font-medium">Important:&nbsp;</span>You need to
          publish at least 1 message from the&nbsp;
          <a href="/pub-sub"><span className="text-sky-600 text-opacity-100">
            Pub/Sub Channels example
          </span></a>
          &nbsp;to see history log.
        </div>
      </div>
      <HistoryMessages />
   
  
    </AblyProvider>   
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
    <>
    <div className="flex flex-col justify-start items-start gap-4 w-[752px]">
    <div className="font-next-book text-sm min-w-[480px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
      <span className="uppercase">history</span>
    </div>
    <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border bg-white min-w-[752px]">
      <div className="font-jetbrains-mono text-sm min-w-[219px] whitespace-nowrap text-slate-500 text-opacity-100 leading-normal font-medium">
      {
             historicalLogs.length > 0?
             <Logger logEntries={historicalLogs} />
             :
             <p>No historical messages found</p>
           }
      </div>
    </div>
  </div>
  <div className="flex flex-col justify-start items-start gap-4 w-[752px]">
    <div className="font-next-book text-sm min-w-[480px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
      <span className="uppercase">realtime</span>
    </div>
    <div className="flex flex-row justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 rounded-lg border-slate-100 border-t border-b border-l border-r border-solid border bg-white min-w-[752px]">
      <div className="font-jetbrains-mono text-sm min-w-[219px] whitespace-nowrap text-slate-500 text-opacity-100 leading-normal font-medium">
           {
           realtimeLogs.length > 0?
           <Logger logEntries={realtimeLogs} />
           :
           <p>No realtime messages received yet</p>
         }

      </div>
    </div>
  </div>
  </>
    // <div className="p-5">
    //   <section>
    //     <h3>History</h3>
    //       {
    //         historicalLogs.length > 0?
    //         <Logger logEntries={historicalLogs} />
    //         :
    //         <p>No historical messages found</p>
    //       }
    //   </section>
    //   <section>
    //     <h3>Realtime</h3>
    //     {
    //       realtimeLogs.length > 0?
    //       <Logger logEntries={realtimeLogs} />
    //       :
    //       <p>No realtime messages received yet</p>
    //     }
    //   </section>
    // </div>
  )
}
