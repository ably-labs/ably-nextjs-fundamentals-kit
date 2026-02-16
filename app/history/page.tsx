/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */

import React from "react";
import "../global.css";
import Sidebar from "../../components/Sidebar.tsx";
import HistoryWrapper from './history-wrapper.tsx';

const History = () => {

  const pageId = "History"

  return (
      <>
        <Sidebar pageId={pageId} />
        <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
          <HistoryWrapper />
        </div>
      </>
  )
}

export default History;
