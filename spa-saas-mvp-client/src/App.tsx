import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import Footer from './app/PageComponents/Footer';
import Header from './app/PageComponents/Header';
import SideMenu from './app/UIComponents/SideMenu';
import * as T from "./utilities/types";

type ContextType = { isAuthenticated: boolean, userRole: T.userRole };

export default function App() {

  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<T.userRole>('client');

  const handleLoginCheck = async () => {
    const res = await fetch('/api/users');
    const result  = await res.json();
    setIsAuthenticated(res.status === 200);
    setUserRole(result.role);
  }

  useEffect( () => {
    handleLoginCheck();
  }, [pathname])

  return (
    <>
      {!isAuthenticated && 
        <div className="flex flex-col w-full h-full justify-between items-center">
          <Header 
            isAuthenticated={isAuthenticated} 
            userRole={userRole}
          />
          <div className='bg-backgrounds w-full h-full flex justify-center items-center'>
            <Outlet context={ {isAuthenticated, userRole} }/>
          </div>
          <Footer />
        </div>
      }
      {isAuthenticated &&
        <div className='flex h-full w-full'>
          <SideMenu userRole={userRole} />
          <Outlet context={ {isAuthenticated, userRole} }/>
        </div>
      }
    </>
  );
}

// [TODO] maybe worth it to move this to customHooks.ts
export function useContext() {
  return useOutletContext<ContextType>();
}
