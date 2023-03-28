import * as T from '../../utilities/types';
import { adminPageSideMenuData, clientPageSideMenuData, vendorPageSideMenuData } from '../../utilities/data';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SideMenuNavButton from './SideMenuNavButton';

export default function SideMenu({userRole} : {userRole: T.userRole}) {

  const getMenuDataSet = () => {

    switch (userRole) {
      case 'client':
        return clientPageSideMenuData;
      case 'vendor':
        return vendorPageSideMenuData;
      case 'admin':
        return adminPageSideMenuData;
      default:
        throw new Error('Unknown pathname');
    }
  }

  const menuHTML = getMenuDataSet().map( ({link, text, icon}) => {
    return (
      <SideMenuNavButton link={link} text={text} icon={icon} />
    )
  })

  return (
    <div
      className='bg-backgrounds text-textsIcons h-full flex flex-col w-64 
                justify-between items-start'
    >
      <div className='m-[20px] flex flex-col'>
        <h1 className='font-semibold text-lg'>Dashboard</h1>
        <p className='pt-1 text-sm text-highlight'>Logged in as a {userRole}</p>
      </div>
      <div className='flex flex-col w-[calc(100%-20px)] self-center'>
        {menuHTML}
      </div>
      <div className='flex flex-col w-[calc(100%-20px)] self-center mb-3'>
        <SideMenuNavButton link='/logout' text='Log out' icon={faArrowRightFromBracket} />
      </div>
    </div>
  )
}