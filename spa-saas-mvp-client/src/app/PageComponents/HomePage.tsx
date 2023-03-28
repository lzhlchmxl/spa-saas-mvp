import { useContext } from "../../App";
import Button from "../UIComponents/Button";
import landingPageBg from '../../assets/landing-page-bg.webp';

export default function HomePage() {

  const { isAuthenticated, userRole } = useContext();

  return (
    <div className="flex flex-col self-center relative w-full h-[calc(100%-130px)] justify-center items-center">
      <img 
        className="absolute top-0 left-0 z-0 opacity-70 h-full w-full"
        src={landingPageBg}
      />
      <h1 className="z-10 font-bold text-textsIcons">SPA SaaS MVP Landing Page</h1>
      {
        isAuthenticated && 
        <div className="z-10">
          <Button 
            actionType="primary"
            actionText={`Go to ${userRole} dashboard`} 
            actionHandler={() => {window.location.pathname = `/${userRole}`}}        
          />
        </div>
      }    
    </div>
  )
}