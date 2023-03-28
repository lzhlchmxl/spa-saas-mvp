import * as T from "../../utilities/types";
import { NavLink } from "react-router-dom";

function Header(
  {
    isAuthenticated,
    userRole,
  }
  :
  {
    isAuthenticated: boolean,
    userRole: T.userRole,
  }
) {

  return (
    <div className={`h-[80px] flex w-full capitalize text-headerFooterText font-semibold border-b-[1px] border-b-borders`}>
      <div className='flex w-full justify-center bg-backgrounds h-full'>
        <div className={`flex justify-between items-center w-contentWidth max-w-maxContentWidth`}> 
          <NavLink to={'/'} >SPA MVP.</NavLink>
          {isAuthenticated && <p>Logged in as {userRole}</p>}
          {isAuthenticated && <NavLink to={'/logout'} className='hover:underline' >logout</NavLink>}
          {
            !isAuthenticated &&
            <div className='flex'>
              <NavLink to={'/'} className='hover:underline' >home</NavLink>
              <NavLink to={'/login'} className='ml-5 hover:underline'>login</NavLink>
              <NavLink to={'/register'} className='ml-5 hover:underline'>register</NavLink>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header;