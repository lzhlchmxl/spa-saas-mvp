import { useNavigate, useOutletContext } from "react-router-dom";
import { IsAuthContextType } from "../../App";
import { getClientDetails } from "../../utilities/api";
import { useAsync, useRequiredParams } from "../../utilities/customHooks";
import ErrorIndicator from "../UIComponents/ErrorIndicator";
import LoadingIndicator from "../UIComponents/LoadingIndicator";

export default function ClientPage() {

  const [ isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    console.log(isAuthenticated)
  }

  // const clientId = useRequiredParams("userId");

  // const clientDetailsAsync = useAsync(() => getClientDetails(clientId), []);

  // if ( clientDetailsAsync.status === "pending" ) {
  //   return <LoadingIndicator />;
  // }

  // if ( clientDetailsAsync.status === "rejected" ) {
  //   return <ErrorIndicator />;
  // }

  // const clientDetails = clientDetailsAsync.value;

  return (
    <h1 className="mt-[100px] self-center font-bold">
      SPA SaaS Client Page
    </h1>
  )
}