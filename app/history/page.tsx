import dynamic from 'next/dynamic';

const HistoryClient = dynamic(() => import('./history-client'), {
  ssr: false,
})

export default HistoryClient;