
export default function SocialItem(props : { menuItemIconSource:any, menuItemLink:string, menuItemFillSyles:string }) {
  return (
    <div className={`flex flex-row justify-start items-start gap-6 ${props.menuItemFillSyles}`}>
      <a href={props.menuItemLink} target="_blank">
        <svg className={`${props.menuItemFillSyles}`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {props.menuItemIconSource}
          </svg>
      </a>
    </div>
  )
}
  
  