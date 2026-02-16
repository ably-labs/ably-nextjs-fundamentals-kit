'use client'

import dynamic from 'next/dynamic'

const AuthenticationClient = dynamic(
  () => import('./authentication-client.tsx'),
  { ssr: false }
)

export default function AuthenticationWrapper() {
  return <AuthenticationClient />
}
