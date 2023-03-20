import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {

  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginCheck = async () => {
    const res = await fetch('/api/users');
    setIsAuthenticated(res.status === 200);
  }

  useEffect( () => {
    handleLoginCheck();
  }, [pathname])
  
  return (
    <div className={`h-[80px] top-0 flex w-full justify-center items-center capitalize text-white`}>
      <div className='flex w-full justify-center items-center z-50 bg-black h-full'>
        <div className={`relative flex justify-between items-center w-[80%] ${ pathname === '/' ? '' : 'max-w-[1000px]' } `}> 
          <NavLink to={'/'} >SPA MVP.</NavLink>
          {isAuthenticated &&
            <NavLink to={'/logout'} className='hover:underline' >logout</NavLink>
          }
          {!isAuthenticated &&
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