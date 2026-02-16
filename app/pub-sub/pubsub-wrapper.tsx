'use client'

import dynamic from 'next/dynamic'

const PubSubClient = dynamic(
  () => import('./pubsub-client.tsx'),
  { ssr: false }
)

export default function PubSubWrapper() {
  return <PubSubClient />
}
