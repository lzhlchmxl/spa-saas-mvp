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
import VendorEditProfilePage from './features/VendorPage/EditProfile';
import AdminPage from './app/PageComponents/AdminPage/AdminPage';
import ServiceCategoriesPage from './app/PageComponents/AdminPage/ServiceCategoriesPage';
import ViewServiceCategoryDetails from './features/AdminPage/ViewServiceCategoryDetails';
import EditServiceCategoryDetails from './features/AdminPage/EditServiceCategoryDetails';
import MySpaPage from './app/PageComponents/VendorPage/MySpaPage';
import EditMySpa from './features/VendorPage/MySpaPage/EditMySpa';
import MyServicesPage from './app/PageComponents/VendorPage/MyServicesPage';
import CreateVendorService from './features/VendorPage/MyServices/CreateVendorService';

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
            <Route index element={<div>Welcome to the Client portal</div>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path='profile/edit' element={<EditProfile />} />
            <Route path="spas" element={<SpasPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          <Route path="vendor" element={<VendorPage />} >
            <Route index element={<div>Welcome to the Vendor portal</div>} />
            <Route path="profile" element={<VendorProfilePage />} />
            <Route path='profile/edit' element={<VendorEditProfilePage />} />
            <Route path="my-spa" element={<MySpaPage />} />
            <Route path="my-spa/edit" element={<EditMySpa />} />
            <Route path="my-services" element={<MyServicesPage />}> 
              <Route index element={<p>Select a service from the list or create a new service</p>} />
              <Route path="view/:serviceCategoryId" element={<ViewServiceCategoryDetails />} />
              <Route path="edit/:serviceCategoryId" element={<EditServiceCategoryDetails />} />
              <Route path="create" element={<CreateVendorService />} />
            </Route>
          </Route>
          <Route path="admin" element={<AdminPage />} >
            <Route index element={<div>Welcome to the Admin portal</div>} />
            <Route path="service-categories" element={<ServiceCategoriesPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
