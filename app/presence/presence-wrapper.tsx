'use client'

import dynamic from 'next/dynamic'

const PresenceClient = dynamic(
  () => import('./presence-client.tsx'),
  { ssr: false }
)

export default function PresenceWrapper() {
  return <PresenceClient />
}
