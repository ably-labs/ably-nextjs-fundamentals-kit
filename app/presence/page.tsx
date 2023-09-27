/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import "../global.css";
import dynamic from 'next/dynamic';
import MenuFooter from "../../components/FooterItem.tsx";
import MenuItem from "../../components/MenuItem.tsx";
import Sidebar from "../../components/Sidebar.tsx";

const PresenceClient = dynamic(() => import('./presence-client.tsx'), {
  ssr: false,
})

const Presence = () => {

  const pageId = "Presence"

  return (
      <>
        <Sidebar pageId={pageId} />
        <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
          <PresenceClient />
        </div>
      </>
  )
}

export default Presence;
