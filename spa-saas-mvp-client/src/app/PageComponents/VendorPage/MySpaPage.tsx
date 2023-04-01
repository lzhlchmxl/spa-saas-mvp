import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteMySpaInfo, deleteSpaServiceById, getMySpa } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import IconButton from "../../UIComponents/IconButton";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";

export default function MySpaPage() {

  const navigate = useNavigate();
  const mySpaAsync = useAsync(() => getMySpa(), []);

  if ( mySpaAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( mySpaAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const mySpa = mySpaAsync.value;

  const handleEditMySpaInfo = () => {
    navigate('/vendor/my-spa/edit')
  }

  const handleDeleteMySpaInfo = async () => {
    if(window.confirm("Deleting spa informtaion. Confirm?")) {
      const statusCode = await deleteMySpaInfo();   
      if (statusCode === 200) {
        window.location.href = '/vendor/my-spa'
      } else {
        return <ErrorIndicator />
      }
    }
  }

  const handleViewEmployeeDetails = (employeeId: string) => {
    navigate(`/vendor/my-spa/employees/${employeeId}`)
  }

  const handleEditEmployeeDetails = (employeeId: string) => {
    navigate(`/vendor/my-spa/employees/${employeeId}`)
  }

  const handleDeleteEmployee = (employeeId: string) => {
    navigate(`/vendor/my-spa/employees/${employeeId}`)
  }

  const handleViewSpaServiceDetails = (serviceId: string) => {
    navigate(`/vendor/my-spa/services/${serviceId}`)
  }

  const handleEditSpaServiceDetails = (serviceId: string) => {
    navigate(`/vendor/my-spa/services/${serviceId}/edit`)
  }

  const handleDeleteSpaService = async (serviceId: string) => {
    if(window.confirm("Deleting spa service. Confirm?")) {
      const statusCode = await deleteSpaServiceById(serviceId);   
      if (statusCode === 200) {
        window.location.href = '/vendor/my-spa'
      } else {
        return <ErrorIndicator />
      }
    }
  }

  const handleCreateSpaResource = () => {
    navigate(`/vendor/my-spa/resources/create`)
  }

  const handleViewSpaResourceDetails = (resourceId: string) => {
    navigate(`/vendor/my-spa/resources/${resourceId}`)
  }
  
  const handleEditSpaResourceDetails = (resourceId: string) => {
    navigate(`/vendor/my-spa/resources/${resourceId}/edit`)
  }

  const handleDeleteSpaResource = async (resourceId: string) => {
    // if(window.confirm("Deleting spa service. Confirm?")) {
    //   const statusCode = await deleteSpaResourceById(resourceId);   
    //   if (statusCode === 200) {
    //     window.location.href = '/vendor/my-spa'
    //   } else {
    //     return <ErrorIndicator />
    //   }
    // }
  }

  const handleCreateSpaService = () => {
    navigate(`/vendor/my-spa/services/create`)
  }

  const spaEmployeesHTML = mySpa.employees.map( (employee, index) => {
    return (
      <div 
        key={employee._id} 
        className="group capitalize flex h-[50px] hover:bg-textsIcons/5 items-center rounded-sm hover:cursor-pointer mb-1"
        onClick={() => handleViewEmployeeDetails(employee._id)}
      >
        <p className="w-1/12 pl-[15px]">{index + 1}</p>
        <div className="w-1/2 flex">
          <p className="mr-1">{employee.firstName}</p>
          {employee.lastName}
        </div>
        <p className="w-1/6">{employee.status}</p>
        <p className="w-1/6">{employee.permission}</p>
        <div className="hidden group-hover:flex w-1/12">
          <div className="flex w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faPenToSquare} actionCallback={() => handleEditEmployeeDetails(employee._id)} />
          </div>
          <div className="flex ml-3 w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faTrashCan} actionCallback={ () => handleDeleteEmployee(employee._id)} />
          </div>
        </div>
      </div>  
    )
  })

  const spaServicesHTML = mySpa.services.map( (service, index) => {
    return (
      <div 
        key={service._id} 
        className="group capitalize flex h-[50px] hover:bg-textsIcons/5 items-center rounded-sm hover:cursor-pointer mb-1"
        onClick={() => handleViewSpaServiceDetails(service._id)}
      >
        <p className="w-1/12 pl-[15px]">{index + 1}</p>
        <div className="w-1/2 flex">
          {service.name}
        </div>
        <p className="w-1/6">{service.cost}</p>
        <p className="w-1/6">{service.durationInSeconds}</p>
        <div className="hidden group-hover:flex w-1/12">
          <div className="flex w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faPenToSquare} actionCallback={() => handleEditSpaServiceDetails(service._id)} />
          </div>
          <div className="flex ml-3 w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faTrashCan} actionCallback={ () => handleDeleteSpaService(service._id)} />
          </div>
        </div>
      </div>  
    )
  });

  const spaResourcesHTML = mySpa.resources.map( (resource, index) => {
    return (
      <div 
        key={resource._id} 
        className="group capitalize flex h-[50px] hover:bg-textsIcons/5 items-center rounded-sm hover:cursor-pointer mb-1"
        onClick={() => handleViewSpaResourceDetails(resource._id)}
      >
        <p className="w-1/12 pl-[15px]">{index + 1}</p>
        <div className="w-1/2 flex">
          {resource.name}
        </div>
        <p className="w-1/6">{resource.type}</p>
        <p className="w-1/6 ">{resource.availableCount}</p>
        <div className="hidden group-hover:flex w-1/12">
          <div className="flex w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faPenToSquare} actionCallback={() => handleEditSpaResourceDetails(resource._id)} />
          </div>
          <div className="flex ml-3 w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faTrashCan} actionCallback={ () => handleDeleteSpaResource(resource._id)} />
          </div>
        </div>
      </div>  
    )
  });

  const outletShown = window.location.pathname !== "/vendor/my-spa"

  return (
    <div className="flex h-full w-full justify-around">
      <div className={`${outletShown ? "w-[55%]" : "w-full" } flex h-full justify-center overflow-y-auto scrollbar-thin
       scrollbar-thumb-textsIcons/50 scrollbar-track-darkGray scrollbar-thumb-rounded`}>
        <div className="flex flex-col w-contentWidth max-w-maxContentWidth h-full items-center
        text-textsIcons">
          <div 
            className="mt-contentPageTopMargin flex justify-between items-center w-full"
          >
            <FontAwesomeIcon onClick={() => {navigate(-1)}} className="hover:cursor-pointer" icon={faChevronLeft} />
          </div>
          <div className="my-5 flex flex-col w-full">
            <h1 className="text-3xl font-semibold">My Spa Management</h1>
            <p className="mt-3 text-textsIcons/50">Manage your spa's serivces, employees and resources all in one place</p>
          </div>
          {/* Spa Information */}
          <div className="relative my-5 flex flex-col w-full rounded-md border-[1px] border-textsIcons/30 p-5">
            <div className="flex absolute top-5 right-5">
              <IconButton icon={faPenToSquare} actionCallback={handleEditMySpaInfo} />
              <div className="ml-5">
                <IconButton icon={faTrashCan} actionCallback={handleDeleteMySpaInfo} />
              </div>
            </div>
            <h1 className="text-2xl font-semibold capitalize">spa information</h1>
            <p className="mt-3 text-lg">Name: {mySpa.name}</p>
            <p className="mt-3 text-lg">Description: {mySpa.description}</p>
          </div>
          {/* Employees */}
          <div className="my-5 flex flex-col w-full rounded-md border-[1px] border-textsIcons/30 p-5">
            <h1 className="text-2xl font-semibold capitalize">employees</h1>
            <div className="flex flex-col mt-3">
              <div className="flex mb-1">
                <p className="w-1/12">Index</p>
                <p className="w-1/2">Employee</p>
                <p className="w-1/6">Status</p>
                <p className="w-1/6">Permission</p>
                <p className="w-1/12"></p>
              </div>
              {spaEmployeesHTML}
            </div>
          </div>
          {/* Services */}
          <div className="relative my-5 flex flex-col w-full rounded-md border-[1px] border-textsIcons/30 p-5">
            <div 
              className="flex absolute top-5 right-5 hover:cursor-pointer hover:bg-textsIcons/5 py-1 px-2 rounded-sm"
              onClick={handleCreateSpaService}        
            >
              <div className="pr-1">
                <IconButton icon={faPlus} actionCallback={handleCreateSpaService} />
              </div>
              Add Service
            </div>
            <h1 className="text-2xl font-semibold capitalize">services</h1>
            <div className="flex flex-col mt-3">
              <div className="flex mb-1">
                <p className="w-1/12">Index</p>
                <p className="w-1/2">Name</p>
                <p className="w-1/6">Cost</p>
                <p className="w-1/6">Duration</p>
                <p className="w-1/12"></p>
              </div>
              {spaServicesHTML}
            </div>
          </div>
          {/* Resources */}
          <div className="relative my-5 flex flex-col w-full rounded-md border-[1px] border-textsIcons/30 p-5">
            <div 
              className="flex absolute top-5 right-5 hover:cursor-pointer hover:bg-textsIcons/5 py-1 px-2 rounded-sm"
              onClick={handleCreateSpaResource}        
            >
              <div className="pr-1">
                <IconButton icon={faPlus} actionCallback={handleCreateSpaResource} />
              </div>
              Add Resource
            </div>
            <h1 className="text-2xl font-semibold capitalize">resources</h1>
            <div className="flex flex-col mt-3">
              <div className="flex mb-1">
                <p className="w-1/12">Index</p>
                <p className="w-1/2">Name</p>
                <p className="w-1/6">Type</p>
                <p className="w-1/6"># Avilable</p>
                <p className="w-1/12"></p>
              </div>
              {spaResourcesHTML}
            </div>
          </div>
          <div className="h-10 w-1">&nbsp;</div>
        </div>
      </div>
      <div className={`w-[45%] ${outletShown ? "flex" : "hidden"} justify-center`}>
        <Outlet />
      </div>
    </div>
  )

}