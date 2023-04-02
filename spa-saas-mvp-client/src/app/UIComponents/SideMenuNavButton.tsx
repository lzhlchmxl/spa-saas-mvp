import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as T from "../../utilities/types"
import { HashLink } from "react-router-hash-link"

export default function SideMenuNavButton({link, text, icon}: T.MenuData) {

  return (
    <div 
      className='w-full flex hover:bg-lightGray/50 hover:cursor-pointer transition-all
                 rounded-sm'
      key={link}
    >
      <HashLink 
        smooth 
        to={link} 
        className="p-iconPadding w-full"
      >
        {icon && <FontAwesomeIcon className='w-iconWidth h-iconHeight pr-iconPadding' icon={icon} />}
        {text}
      </HashLink>
    </div>
  )
}