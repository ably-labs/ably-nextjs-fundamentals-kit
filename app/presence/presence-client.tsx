'use client'

import * as Ably from 'ably';
import names from  'random-names-generator'

import { AblyProvider, useAbly, usePresence } from "@ably-labs/react-hooks"
import { MouseEvent, useState, useEffect, ReactElement, FC, SetStateAction, Dispatch } from 'react'

import Logger, { LogEntry } from '../../components/logger';
import NavBar from '../../components/navbar';

export default function Presence() {
    const [randomName,  setRandomName]  =  useState('');
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)

    useEffect(()  => {
      let name = names.random();
      setRandomName(name)
    }, [])

    return (
      <div className="container mx-auto">
        <header>
          <NavBar />
        </header>
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl">
            <p className="mb-8 text-sm font-normal text-gray-500 text-center">
              Presence with Ably allows you to keep track of devices that are present on a channel. This is great for tracking if a device is online or offline or indicating if a user is in a chat room when using Ably for Chat.  <a href="/presence" target="_blank">Open this page</a> in another tab to see more users enter and leave the presence channel.
            </p>
            <p className="mb-8 text-sm font-normal text-gray-500">Hello {randomName}</p>
            { isUsernameValid === false?
              <section>
                <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={()=>setIsUsernameValid(true)}>Join</button>
              </section>
            :
              <AblyProvider options={{ authUrl:'/api/authentication/token-auth', autoConnect: false }}>
                  <PresenceMessages clientId={randomName} stateChanger={setIsUsernameValid} />
              </AblyProvider>
            }
          </div>
        </section>
      </div>
    )
}

type PresenceMessageProps = {
  clientId: string,
  stateChanger:Dispatch<SetStateAction<boolean>>
}

const PresenceMessages: FC<PresenceMessageProps> = ({ clientId, stateChanger }): ReactElement => {
  
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const client = useAbly();

  useEffect(() =>{
    if (clientId === null) return;
    client.auth.authorize(
      { clientId: clientId },
      { authUrl:'/token', authMethod: 'POST' }
    );
    return () => {
      console.log(`Unmounting Functional Component`)
    }
  }, []);

  //this should only happen once we have a valid user name
  const { presenceData, updateStatus } = usePresence("room", {'status':'available'}, (member) => {
    setLogs(prev => [...prev, new LogEntry(`action: ${member.action} clientId: ${member.clientId}`)])
    return (
        <li className="mb-8 text-sm font-normal text-gray-500" key={member.id}>{member.clientId}</li>
    )
  });

  return (
    <>
      <section>
        <ul>
          {presenceData.map((member) => {
            //setLogs(prev => [...prev, new LogEntry(`action: ${member.action} clientId: ${member.clientId}`)])
            return (<li className="mb-8 text-sm font-normal text-gray-500" key={member.id}>{member.clientId}</li>)
          })}
        </ul>
      </section>
      <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={() => stateChanger(false)}>Leave</button>

      <section>
        <Logger logEntries={logs} />
      </section>
    </>
  )
}
