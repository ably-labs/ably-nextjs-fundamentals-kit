import dynamic from 'next/dynamic';

const PubSubClient = dynamic(() => import('./pubsub-client'), {
  ssr: false,
})

export default PubSubClient;