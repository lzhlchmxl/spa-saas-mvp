import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import * as T from "../../utilities/types"
import { NavHashLink } from "react-router-hash-link"

export default function SideMenuNavButton({link, text, icon}: T.MenuData) {

  return (
    <div 
      className='w-full flex hover:bg-lightGray/50 hover:cursor-pointer transition-all
                 rounded-sm'
      key={link}
    >
      <NavHashLink 
        smooth 
        to={link} 
        className="p-iconPadding w-full"
      >
        {icon && <FontAwesomeIcon className='w-iconWidth h-iconHeight pr-iconPadding' icon={icon} />}
        {text}
      </NavHashLink>
    </div>
  )
}