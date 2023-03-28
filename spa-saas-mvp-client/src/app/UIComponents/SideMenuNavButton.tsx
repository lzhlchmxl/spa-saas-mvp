import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import * as T from "../../utilities/types"

export default function SideMenuNavButton({link, text, icon}: T.MenuData) {

  return (
    <div 
      className='w-full flex hover:bg-lightGray/50 hover:cursor-pointer transition-all
                 rounded-sm'
      key={link}
    >
      <NavLink 
        to={link} 
        className="p-iconPadding w-full"
      >
        <FontAwesomeIcon className='w-iconWidth h-iconHeight pr-iconPadding' icon={icon} />
        {text}
      </NavLink>
    </div>
  )
}