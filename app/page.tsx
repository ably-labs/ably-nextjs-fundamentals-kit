import Image from 'next/image'
import NavBar from '../components/navbar'

export default function Home() {

  return (
    <div className="sm:container mx-auto">
      <header>
        <NavBar />
      </header>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center">
          <div className="flex justify-center">
            <div>
              <Image className="m-6" src="/ably-motif-col-rgb.svg" height="158" width="158"alt="Ably logo" />
            </div>
            <div>
              <img className="m-6" src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128" width="128" alt="Next.js logo" />
            </div>
          </div>     
          
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-gray-900">Ably ♥s Next.js</h1>
          <p className="mb-8 text-lg font-normal text-gray-500">At Ably we are big fans of Next.js. This application demonstrates using some of the Ably fundamentals with Next.js. You can build features and use cases upon these fundamentals such as notifications, activity streams, chat, realtime visualisations and dashboards, and collaborative multiplayer experiences.</p>

          <div className="grid grid-cols-4">

            <div className="justify-center">
              <a className="items-center text-base font-medium text-center text-gray-900" href="./authentication">
                <h2>Token Authentication</h2>            
              </a>
              <p className="mb-8 text-sm font-normal text-gray-500">Token Authentication is the recommeded approach for auth with Ably.</p>
            </div>
            
            <div className="justify-center">
              <a className="items-center text-base font-medium text-center text-gray-900" href="./pub-sub">
                <h2>Pub/Sub</h2>
              </a>
              <p className="mb-8 text-sm font-normal text-gray-500">Pub/Sub (Publish/Subscribe) with Ably lets you publish messages on channels and subscribe to channels to receive messages.</p>
            </div>

            <div className="justify-center">
              <a className="items-center text-base font-medium text-center text-gray-900" href="./presence">
                <h2>Presence</h2>
              </a>
              <p className="mb-8 text-sm font-normal text-gray-500">Presence with Ably allows you to keep track of devices that are present on a channel. This is great for tracking if a device is online or offline or indicating if a user is in a chat room when using Ably for Chat.</p>
            </div>

            <div className="justify-center">
              <a className="items-center text-base font-medium text-center text-gray-900" href="./history">
                <h2>History</h2>
              </a>
              <p className="mb-8 text-sm font-normal text-gray-500">Retrieve a history of messages that have been published to a channel.</p>
            </div>
          </div>          
        </div>
    </section>
      <footer className="footer">
        <p className="mb-8 text-sm font-normal text-white">
        Powered by
        <span className="logo">
          <a
            href="https://ably.com/?utm_source=github&utm_medium=github-repo&utm_campaign=GLB-2211-ably-nextjs-fundamentals-kit&utm_content=ably-nextjs-fundamentals-kit&src=GLB-2211-ably-nextjs-fundamentals-kit-github-repo"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="https://static.ably.dev/logo-h-mono-white.svg?ably-nextjs-fundamentals-kit" alt="Ably Logo" width={102} height={18} />
          </a>
        </span>
        &amp;
        <span className="logo">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=ably-nextjs-fundamentals-kit&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={16} />
          </a>
        </span>
        </p>
      </footer>
    </div>
  )
}
