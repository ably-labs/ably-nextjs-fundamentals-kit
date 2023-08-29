import dynamic from 'next/dynamic';

const AuthenticationClient = dynamic(() => import('./authentication-client'), {
  ssr: false,
})

export default AuthenticationClient;