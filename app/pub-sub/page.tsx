/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import "../global.css";
import dynamic from 'next/dynamic';
import Sidebar from "../../components/Sidebar.tsx";

const PubSubClient = dynamic(() => import('./pubsub-client.tsx'), {
  ssr: false,
})

const PubSub = () => {

  const pageId="PubSubChannels"

  return (
    <div className="flex flex-row justify-start items-start gap-6 pt-12 pr-12 pb-12 pl-12 w-[1280px] h-[960px] bg-white">
      <div className="flex flex-row justify-start items-start gap-4 w-[1184px]">
        <Sidebar pageId={pageId} />
        <div className="flex flex-col justify-start items-start gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border w-[848px] h-[864px] bg-slate-50">
          <PubSubClient />
        </div>
      </div>
    </div>
  )
}

export default PubSub;
