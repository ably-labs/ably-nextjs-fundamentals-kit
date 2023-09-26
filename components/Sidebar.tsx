import FooterItem from "./FooterItem";
import MenuItem from "./MenuItem";
import SocialItem from "./SocialItem";

export default function Sidebar(props: { pageId: string; }) {

  const menuItems = [
    {
      menuItemId: "Start",
      menuItemText: "Start",
      menuItemActive: false,
      menuItemLink: '/'
    },
    {
      menuItemId: "Authentication",
      menuItemText: "Authentication",
      menuItemActive: false,
      menuItemLink: '/authentication'
    },
    {
      menuItemId: "PubSubChannels",
      menuItemText: "Pub/Sub Channels",
      menuItemActive: false,
      menuItemLink: '/pub-sub'
    },
    {
      menuItemId: "Presence",
      menuItemText: "Presence",
      menuItemActive: false,
      menuItemLink: '/presence'
    },
    {
      menuItemId: "History",
      menuItemText: "History",
      menuItemActive: false,
      menuItemLink: '/history'
    }
  ]
  
  const footerItems = [
    { 
      menuItemText: "View our Docs",
      menuItemLink: 'https://ably.com/docs/'
    },
    { 
      menuItemText: "Explore Pub/Sub Channels",
      menuItemLink: 'https://ably.com/channels' 
    },
    { 
      menuItemText: "ably.com",
      menuItemLink: 'https://ably.com/' 
    },
  ];

  const socialItems = [
    { 
      menuItemText: "X (Twitter)",
      menuItemLink: 'https://twitter.com/ablyrealtime/',
      menuItemIcon: 'XTwitterLogo.svg'
    },
    { 
      menuItemText: "Github",
      menuItemLink: 'https://github.com/ably/',
      menuItemIcon: 'GithubLogo.svg'
    },
    { 
      menuItemText: "LinkedIn",
      menuItemLink: 'https://linkedin.com/company/ably-realtime/',
      menuItemIcon: 'LinkedInLogo.svg'
    },
    { 
      menuItemText: "Discord",
      menuItemLink: 'http://go.ably.com/discord',
      menuItemIcon: 'DiscordLogo.svg'
    },

  ];

  return(
    <div className="flex flex-col justify-between items-start gap-6 pt-6 pr-6 pb-6 pl-6 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border w-80 h-[864px] bg-slate-50">
      <div className="flex flex-col justify-start items-start gap-6 h-[296px]">
          <img
          width="102px"
          height="32px"
          src="/assets/AblyLogoWithText.svg"
          alt="AblyLogoWithText"
          />
          <div className="flex flex-col justify-start items-start h-60">
          {menuItems.map(
              ({
                menuItemId,
                menuItemText,
                menuItemLink
              }) => (
              <MenuItem
                  key={menuItemId}
                  menuItemText={menuItemText}
                  menuItemActive={(menuItemId==props.pageId) ? true : false}
                  menuItemLink={menuItemLink}
              />
              )
          )}
          </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-6 h-48">
          <img
          width="272px"
          height="1px"
          src="/assets/HorizontalRule.svg"
          alt="Svg Asset 17"
          />
          <div className="flex flex-col justify-start items-start h-24">
          {footerItems.map(({ menuItemText, menuItemLink }) => (
              <FooterItem key={menuItemText} menuItemText={menuItemText} menuItemLink={menuItemLink} />
          ))}
          </div>
          <img
          width="272px"
          height="1px"
          src="/assets/HorizontalRule.svg"
          alt="Svg Asset 16"
          />
          <div className="flex flex-row justify-start items-start gap-6 w-[168px]">
{/* 
          <div className="flex flex-row justify-start items-start gap-6 w-[72px]">
              <div className="flex flex-col justify-center items-center h-6">
              <img
                  width="24px"
                  height="19.9px"
                  src="/assets/XTwitterLogo.svg"
                  alt="X (Twitter)"
              />
              </div>
              <img
              width="24px"
              height="24px"
              src="/assets/LinkedInLogo.svg"
              alt="LinkedIn"
              />
          </div>
          <div className="flex flex-row justify-start items-start gap-6 w-[72px]">
              <img
              width="24px"
              height="23.5px"
              src="/assets/GithubLogo.svg"
              alt="Github"
              />
              <div className="flex flex-col justify-center items-center h-6">
              <img
                  width="24px"
                  height="18.6px"
                  src="./assets/DiscordLogo.svg"
                  alt="Discord"
              />
              </div>
          </div> */}

          {socialItems.map(
              ({
                menuItemText,
                menuItemIcon,
                menuItemLink
              }) => (
              <SocialItem
                  key={menuItemText}
                  menuItemText={menuItemText}
                  menuItemIcon={menuItemIcon}
                  menuItemLink={menuItemLink}
              />
              )
          )}

          </div>
      </div>
    </div>
  )
}