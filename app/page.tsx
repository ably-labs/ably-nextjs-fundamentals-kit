/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React from "react";
import "./global.css";
import Sidebar from "../components/Sidebar";

const Home = () => {

  const pageId = "Start";
  
  return (
    <>
      <Sidebar pageId={pageId} />
      <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-start items-start gap-4 h-[172px]">
            <div className="flex flex-row justify-center items-center gap-6 w-[264px]">
              <img
                width="96px"
                height="96px"
                src="/assets/AblyLogo.svg"
                alt="AblyLogo"
              />
              <div className="flex justify-center items-center h-6">
                <img
                  width="21.5px"
                  height="21.5px"
                  src="/assets/PlusSign.svg"
                  alt="plus"
                />
              </div>
              <img
                width="96px"
                height="96px"
                src="/assets/NextjsLogo.svg"
                alt="Next.js"
              />
            </div>
            <div className="font-manrope text-[18px] max-w-screen-sm text-slate-800 text-opacity-100 leading-6 font-light">
              <span className="text-black text-opacity-100 font-bold">
                At Ably we are big fans of Next.js&nbsp;
              </span>
              / This application demonstrates using some of the Ably fundamentals
              with Next.js. You can build features and use cases upon these
              fundamentals such as notifications, activity streams, chat, realtime
              visualisations and dashboards, and collaborative multiplayer
              experiences.
            </div>
            <div className="flex flex-col justify-start items-start gap-4 h-[488px]">
              <div className="flex flex-row justify-start items-start gap-4">
                <div className="flex flex-col justify-start items-start pt-6 pr-6 pb-6 pl-6 rounded-2xl h-[216px] bg-white">
                  <div className="flex flex-col justify-center items-start gap-4 h-[168px]">
                    <div className="flex flex-row justify-start items-center gap-4 w-80">
                      <div className="flex flex-row justify-center items-center pt-3 pr-3 pb-3 pl-3 border rounded-lg h-14 bg-gradient-to-br from-[rgba(255,255,255,1)] from-29% to-[rgba(248,250,252,1)]">
                        <div className="flex justify-center items-center h-8">
                          <img
                            width="27.7px"
                            height="31.7px"
                            src="/assets/Authentication.svg"
                            alt="Authentication"
                          />
                        </div>
                      </div>
                      <div className="font-manrope text-base min-w-[109px] whitespace-nowrap text-black text-opacity-100 leading-6 font-medium">
                        Authentication
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 h-24">
                      <div className="font-manrope grow text-sm w-80 text-slate-800 text-opacity-100 leading-5 font-light">
                        Token Authentication is the recommended approach for auth
                        with Ably.
                        <br />
                      </div>
                      <div className="flex justify-between items-center gap-1 rounded-md w-24 h-5 overflow-hidden">
                        <a href="/authentication">
                        <div className="font-manrope text-sm min-w-[78px] whitespace-nowrap text-sky-600 text-opacity-100 leading-5 font-medium">
                          Explore now
                        </div>
                        </a>
                        <a href="/authentication">
                        <div className="flex flex-col justify-center items-center w-4 h-4">
                        <img
                            width="10.3px"
                            height="7.2px"
                            src="/assets/ExploreNow.svg"
                            alt="Explore Now"
                          />
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start pt-6 pr-6 pb-6 pl-6 rounded-2xl h-[216px] bg-white">
                  <div className="flex flex-col justify-center items-start gap-4 h-[168px]">
                    <div className="flex flex-row justify-start items-center gap-4 w-80">
                      <div className="flex flex-row justify-center items-center pt-3 pr-3 pb-3 pl-3 border rounded-lg h-14 bg-gradient-to-br from-[rgba(255,255,255,1)] from-29% to-[rgba(248,250,252,1)] to-134%">
                        <div className="flex flex-col justify-center items-center h-8">
                          <img
                            width="30.3px"
                            height="25px"
                            src="./assets/PubSubChannels.svg"
                            alt="Pub/Sub Channels"
                          />
                        </div>
                      </div>
                      <div className="font-manrope text-base min-w-[136px] whitespace-nowrap text-black text-opacity-100 leading-6 font-medium">
                        Pub/Sub Channels
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 h-24">
                      <div className="font-manrope grow text-sm w-80 text-slate-800 text-opacity-100 leading-5 font-light">
                        Pub/Sub (Publish/Subscribe) with Ably lets you publish
                        messages on channels and subscribe to channels to receive
                        messages.
                      </div>
                      <div className="flex justify-between items-center gap-1 rounded-md w-24 h-5 overflow-hidden">
                      <a href="/pub-sub">
                        <div className="font-manrope text-sm min-w-[78px] whitespace-nowrap text-sky-600 text-opacity-100 leading-5 font-medium">
                          Explore now
                        </div>
                        </a>
                        <a href="/pub-sub">                      
                        <div className="flex flex-col justify-center items-center w-4 h-4">
                        <img
                            width="10.3px"
                            height="7.2px"
                            src="/assets/ExploreNow.svg"
                            alt="Explore Now"
                          />
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start gap-4 w-[752px]">
                <div className="flex flex-col justify-start items-start pt-6 pr-6 pb-6 pl-6 rounded-2xl h-64 bg-white">
                  <div className="flex flex-col justify-center items-start gap-4 h-52">
                    <div className="flex flex-row justify-start items-center gap-4 w-80">
                      <div className="flex flex-row justify-center items-center pt-3 pr-3 pb-3 pl-3 border rounded-lg h-14 bg-gradient-to-br from-[rgba(255,255,255,1)] from-29% to-[rgba(248,250,252,1)] to-134%">
                        <div className="flex justify-center items-center w-8 h-8">
                          <img
                            width="23.2px"
                            height="25.7px"
                            src="/assets/Presence.svg"
                            alt="Presence"
                          />
                        </div>
                      </div>
                      <div className="font-manrope text-base min-w-[65px] whitespace-nowrap text-black text-opacity-100 leading-6 font-medium">
                        Presence
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 h-[136px]">
                      <div className="font-manrope grow text-sm w-80 text-slate-800 text-opacity-100 leading-5 font-light">
                        Presence with Ably allows you to keep track of devices that
                        are present on a channel. This is great for tracking if a
                        device is online or offline or indicating if a user is in a
                        chat room when using Ably for Chat.
                      </div>
                      <div className="flex justify-between items-center gap-1 rounded-md w-24 h-5 overflow-hidden">
                      <a href="/presence">
                        <div className="font-manrope text-sm min-w-[78px] whitespace-nowrap text-sky-600 text-opacity-100 leading-5 font-medium">
                          Explore now
                        </div>
                        </a><a href="/presence">
                        <div className="flex flex-col justify-center items-center w-4 h-4">
                          <img
                            width="10.3px"
                            height="7.2px"
                            src="/assets/ExploreNow.svg"
                            alt="Explore Now"
                          />
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start pt-6 pr-6 pb-6 pl-6 rounded-2xl h-64 bg-white">
                  <div className="flex flex-col justify-center items-start gap-4 h-52">
                    <div className="flex flex-row justify-start items-center gap-4 w-80">
                      <div className="flex flex-row justify-center items-center pt-3 pr-3 pb-3 pl-3 border rounded-lg h-14 bg-gradient-to-br from-[rgba(255,255,255,1)] from-29% to-[rgba(248,250,252,1)] to-134%">
                        <div className="flex flex-col justify-center items-center h-8">
                          <img
                            width="30.1px"
                            height="29px"
                            src="/assets/History.svg"
                            alt="History"
                          />
                        </div>
                      </div>
                      <div className="font-manrope text-base min-w-[53px] whitespace-nowrap text-black text-opacity-100 leading-6 font-medium">
                        History
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4 h-[136px]">
                      <div className="font-manrope grow text-sm w-80 text-slate-800 text-opacity-100 leading-5 font-light">
                        Retrieve a history of messages that have been published to a
                        channel.
                      </div>
                      <div className="flex justify-between items-center gap-1 rounded-md w-24 h-5 overflow-hidden">
                      <a href="/history">
                        <div className="font-manrope text-sm min-w-[78px] whitespace-nowrap text-sky-600 text-opacity-100 leading-5 font-medium">
                          Explore now
                        </div>
                        </a><a href="/history">
                        <div className="flex flex-col justify-center items-center w-4 h-4">
                        <img
                            width="10.3px"
                            height="7.2px"
                            src="/assets/ExploreNow.svg"
                            alt="Explore Now"
                          />
                        </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
;

export default Home;
