interface MenuItemProps { 
  menuItemText:string,
  menuItemActive:boolean,
  menuItemLink:string
}
  
export default function MenuItem(props:MenuItemProps) {
  return (
    <div className={`flex justify-center items-center rounded-md w-[272px] mb-2 h-10 hover:bg-white group ${props.menuItemActive && "bg-slate-200"}`}>
      <a href={props.menuItemLink}>
      <div className={`font-manrope min-w-[256px] whitespace-nowrap text-opacity-100 leading-4 font-bold  group-hover:text-sky-700 text-base text-black ${props.menuItemActive ? "tracking-widest" : ""}`}>
        {props.menuItemText}
      </div>
      </a>
    </div>
  )
}