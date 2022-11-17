import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { assertConfiguration, configureAbly } from '@ably-labs/react-hooks';

if (typeof window !== "undefined") { // Browser only
  configureAbly({ authUrl: '/api/authentication/createTokenRequest' });
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
