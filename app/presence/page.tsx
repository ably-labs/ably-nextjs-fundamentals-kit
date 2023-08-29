import dynamic from 'next/dynamic';

const PresenceClient = dynamic(() => import('./presence-client'), {
  ssr: false,
})

export default PresenceClient;