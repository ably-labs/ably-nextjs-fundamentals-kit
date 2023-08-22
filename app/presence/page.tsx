'use client'

import * as Ably from 'ably';
import { AblyProvider, useAbly, useChannel, usePresence } from "@ably-labs/react-hooks"
import Logger, { LogEntry } from '../../components/logger';
import { MouseEvent, useState, FormEvent, ChangeEvent, useCallback, useEffect } from 'react'
import NavBar from '../../components/navbar';


const presenceActionIcon = new Map<string, string>([
  ['enter', '🟢'],
  ['leave', '🔴']
])

export default function Presence() {
    const options = {
        authUrl:'/api/authentication/token-auth',
        autoConnect: false,
       }
    
    return (
        <AblyProvider options={options}>
            <PresenceMessages />
        </AblyProvider>
    )
}

function PresenceMessages() {
   const [logs, setLogs] = useState<Array<LogEntry>>([])
   const [username, setUsername] = useState<string>('')
   const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
   const [onlineUsers, setOnlineUsers] = useState<string[]>([])

   const client = useAbly();

  useEffect(() =>{
    if (isUsernameValid === false) return;
    client.auth.authorize(
      { clientId: username }, 
      { authUrl:'/api/authentication/token-auth', authMethod: 'POST'}
    );
  });

    //this should only happen once we have a valid user name
  const { presenceData, updateStatus } = usePresence("room", {'status':'available'}, (message) => {
    console.log(message);

    if(message.action === 'enter' || message.action === 'present') {
      setOnlineUsers(prev => {
        if(prev.includes(message.clientId) === false) {
          return [...prev, message.clientId]
        }
        else {
          return prev
        }
      })
    } 
    else {
      setOnlineUsers(prev => prev.filter(username => {
        const keep: boolean = username !== message.clientId
        return keep
      }))
    }

    setLogs(prev => [...prev, new LogEntry(`action: ${message.action} clientId: ${message.clientId}`)])
  });
  

  // const presentClients = presenceData.map((msg, index) => (
  //   <li key={index}>
  //       {msg.clientId}: {JSON.stringify(msg.data)}
  //   </li>
  // ));


//   useEffect(() => {
//     // The first requirement is to have a valid username
//     // to be used as the Ably clientId
//     if(isUsernameValid === false) return

//     // If not already subscribed to a channel, subscribe
//     if(channel === null) {

//       // Note: the 'present' event doesn't always seem to fire
//       // so we use presence.get() later to get the initial list of users
//       // _channel.presence.subscribe(['present', 'enter', 'leave'], handlePresenceMessage)
//       _channel.presence.subscribe(['enter', 'leave'], handlePresenceMessage)

//       const getExistingMembers = async () => {
//         const messages = await _channel.presence.get()
//         messages.forEach(handlePresenceMessage)
//       }
//       getExistingMembers()

//       _channel.presence.enter()
//     }
//   }, [isUsernameValid, ably, channel, username, onlineUsers, handlePresenceMessage])

   // Very basic validation
   const validateUsername = (username: string) => {
     if(username.length < 2) {
       return false
     }
     return true
   }

   const handleUsernameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
     setUsername(e.target.value)
   }

   const handleFormSubmit = (e: FormEvent) => {
     e.preventDefault()

     setIsUsernameValid(validateUsername(username))
   }

   const handleLeaveClick = async (_event: MouseEvent<HTMLButtonElement>) => {
    
//     await channel?.presence.leave()
//     channel?.presence.unsubscribe()
//     channel?.unsubscribe()

//     // Clear the online users state
//     // While subscribed to the channel, enter and leave events will update the state
//     // But once unsubscribed we will not receive events to the state will become stale
//     setOnlineUsers([])
    
//     setChannel(null)
     setIsUsernameValid(false)
   }

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

          { isUsernameValid === false?
          <section>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" id="message" 
                type="text" 
                key="username"
                value={username} 
                placeholder="What is your username?"
                onChange={handleUsernameInputChange}
              />
              <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Join</button>
            </form>
          </section>
          :
          <section>
            <ul>
              {onlineUsers.map((username: string) => {
                return <li key={username}>
                  {presenceActionIcon.get('enter')} {username}
                </li>
              })}
            </ul>
            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={handleLeaveClick}>Leave</button>
          </section>
          }
          <section>
            <Logger logEntries={logs} />
          </section>

        </div>
      </section>
    </div>


  )
}