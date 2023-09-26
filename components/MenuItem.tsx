interface MenuItemProps { 
  menuItemText:string,
  menuItemActive:boolean,
  menuItemLink:string
}
  
export default function MenuItem(props:MenuItemProps) {
  return (
    <div className={`flex justify-center items-center rounded-md w-[272px] h-10 ${
        props.menuItemActive ? "bg-white" : ""
      }`}
    >
      <a href={props.menuItemLink}>
      <div
        className={`font-manrope min-w-[256px] whitespace-nowrap text-opacity-100 leading-4 font-medium ${
          props.menuItemActive ? "text-sm" : "text-base"
        } ${props.menuItemActive ? "text-sky-600": "text-black" } ${props.menuItemActive ? "uppercase" : ""} ${
          props.menuItemActive ? "tracking-widest" : ""
        }`}
      >
        {props.menuItemText}
      </div>
      </a>
    </div>
  )
}