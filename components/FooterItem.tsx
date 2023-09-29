export default function FooterItem(props : { menuItemText:string, menuItemLink:string }) {
  return (
    <div className="flex justify-center items-center rounded-md w-[272px] h-8">
      <a href={props.menuItemLink} target="_blank">
        <div className="font-manrope text-sm min-w-[256px] whitespace-nowrap text-black text-opacity-100 leading-4 font-light">
          {props.menuItemText}
        </div>
      </a>
    </div>
  )
}