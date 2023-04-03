import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './app/PageComponents/HomePage';
import Login from './features/Login';
import ClientPage from './app/PageComponents/ClientPage/ClientPage';
import Logout from './features/Logout';
import AppointmentsPage from './app/PageComponents/ClientPage/AppointmentsPage';
import HistoryPage from './app/PageComponents/ClientPage/HistoryPage';
import ProfilePage from './app/PageComponents/ClientPage/ProfilePage';
import SpasPage from './app/PageComponents/ClientPage/SpasPage';
import EditProfile from './features/ClientPage/EditProfile';
import Register from './features/Register';
import VendorPage from './app/PageComponents/VendorPage/VendorPage';
import VendorProfilePage from './app/PageComponents/VendorPage/ProfilePage';
import VendorEditProfilePage from './features/VendorPage/Profile/EditProfile';
import AdminPage from './app/PageComponents/AdminPage/AdminPage';
import ServiceCategoriesPage from './app/PageComponents/AdminPage/ServiceCategoriesPage';
import MySpaPage from './app/PageComponents/VendorPage/MySpaPage';
import EditMySpaInfo from './features/VendorPage/MySpaPage/EditMySpaInfo';
import CreateVendorService from './features/VendorPage/MySpaPage/SpaServices/CreateVendorService';
import ViewVendorServiceDetails from './features/VendorPage/MySpaPage/SpaServices/ViewVendorServiceDetails';
import EditVendorServiceDetails from './features/VendorPage/MySpaPage/SpaServices/EditVendorServiceDetails';
import ViewSpaDetails from './features/ClientPage/Spas/ViewSpaDetails';
import ViewServiceCategoryDetailsPage from './features/AdminPage/ViewServiceCategoryDetails';
import EditServiceCategoryDetailsPage from './features/AdminPage/EditServiceCategoryDetails';
import CreateServiceCategoryDetailsPage from './features/AdminPage/CreateServiceCategoryDetails';
import ViewSpaEmployeeDetails from './features/VendorPage/MySpaPage/SpaEmployees/ViewSpaEmployeeDetails';
import CreateSpaResource from './features/VendorPage/MySpaPage/SpaResources/CreateSpaResource';
import CreateSpaEmployee from './features/VendorPage/MySpaPage/SpaEmployees/CreateSpaEmployee';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="client" element={<ClientPage />} >
            <Route index path="*" element={<ProfilePage />} />
            <Route path='profile/edit' element={<EditProfile />} />
            <Route path="spas" element={<SpasPage />} />
            <Route path="spas/:vendorSpaId" element={<ViewSpaDetails />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          <Route path="vendor" element={<VendorPage />} >           
            <Route index path="*" element={<VendorProfilePage />} />
            <Route path='profile/edit' element={<VendorEditProfilePage />} />
            <Route path="my-spa" element={<MySpaPage />}> 
              <Route path="edit" element={<EditMySpaInfo />} />
              <Route path='employees/create' element={<CreateSpaEmployee />} />
              <Route path='employees/:employeeId' element={<ViewSpaEmployeeDetails />} />
              <Route path="services/:vendorServiceId" element={<ViewVendorServiceDetails />} />
              <Route path="services/:vendorServiceId/edit" element={<EditVendorServiceDetails />} />
              <Route path="services/create" element={<CreateVendorService />} />    
              {/* <Route path="resources/:spaResourceId" element={<ViewVendorServiceDetails />} /> */}
              {/* <Route path="resources/:spaResourceId/edit" element={<EditVendorServiceDetails />} /> */}
              <Route path="resources/create" element={<CreateSpaResource />} />        
            </Route>
            

            {/* <Route path="my-services" element={<MyServicesPage />}> 
              <Route index path="*" element={<p className='flex w-full justify-center items-center'>Click on a service to view details or create a new service</p>} />
              <Route path=":vendorServiceId" element={<ViewVendorServiceDetails />} />
              <Route path="edit/:vendorServiceId" element={< EditVendorServiceDetails/>} />
              <Route path="create" element={<CreateVendorService />} />
            </Route> */}
          </Route>
          <Route path="admin" element={<AdminPage />} >
            <Route path="service-categories" element={<ServiceCategoriesPage />}>
            <Route index element={<p className='flex w-full justify-center items-center'>Click on a service to view details or create a new service</p>} />
              <Route path=":serviceCategoryId" element={<ViewServiceCategoryDetailsPage />} />
              <Route path="edit/:serviceCategoryId" element={< EditServiceCategoryDetailsPage/>} />
              <Route path="create" element={<CreateServiceCategoryDetailsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
