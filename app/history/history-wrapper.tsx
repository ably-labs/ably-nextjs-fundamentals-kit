'use client'

import dynamic from 'next/dynamic'

const HistoryClient = dynamic(
  () => import('./history-client.tsx'),
  { ssr: false }
)

export default function HistoryWrapper() {
  return <HistoryClient />
}
