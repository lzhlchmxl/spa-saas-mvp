import * as T from '../../utilities/types';
import { adminPageSideMenuData, clientPageSideMenuData, vendorPageSideMenuData } from '../../utilities/data';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SideMenuNavButton from './SideMenuNavButton';

export default function SideMenu({userRole} : {userRole: T.userRole}) {

  const getMenuDataSet = (): T.MenuData[] => {

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

  // [TODO] hard code; support nested menu for more than two layers
  const menuHTML = getMenuDataSet().map( menuData  => {
    const text = menuData.text;
    const children = menuData.children;
    const childrenMenuHTML = 
    <div className='ml-[26px]'>
      {children?.map( (childMenuData, index) => {
        return (
          <SideMenuNavButton key={index} link={childMenuData.link} text={childMenuData.text} icon={childMenuData.icon} />

        )
      })}
    </div>

 

    return (
      <div className='flex flex-col'>
        <SideMenuNavButton key={text} link={menuData.link} text={text} icon={menuData.icon} />
        {
          children && childrenMenuHTML
        }
      </div>
    )
  })

  return (
    <div
      className='bg-backgrounds text-textsIcons h-full flex flex-col w-64 
                justify-between items-center'
    >
      <div className='flex flex-col w-[calc(100%-20px)]'>
        <div className='mx-[10px] my-[20px]'>
          <h1 className='font-semibold text-lg'>Dashboard</h1>
          <p className='pt-1 text-sm text-highlight'>Logged in as a {userRole}</p>
        </div>
        <div className='flex flex-col w-full self-center '>
          {menuHTML}
        </div>
      </div>
      <div className='flex flex-col w-[calc(100%-20px)] self-center mb-3'>
        <SideMenuNavButton link='/logout' text='Log out' icon={faArrowRightFromBracket} />
      </div>
    </div>
  )
}