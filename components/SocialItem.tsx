export default function SocialItem(props : { menuItemText:string, menuItemIcon:string, menuItemLink:string }) {
  return (
    <div className="flex flex-row justify-start items-start gap-6 w-[72px]">
      <a href={props.menuItemLink} target="_blank">
          <img
          width="24px"
          height="23.5px"
          src={"/assets/" + props.menuItemIcon}
          alt={props.menuItemText}
          />
      </a>
    </div>
  )
}
  
  