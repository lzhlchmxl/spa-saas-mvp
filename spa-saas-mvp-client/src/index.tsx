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
import SPASPage from './app/PageComponents/ClientPage/SPASPage';
import EditProfile from './features/ClientPage/EditProfile';
import Register from './features/Register';
import VendorPage from './app/PageComponents/VendorPage/VendorPage';
import VendorProfilePage from './app/PageComponents/VendorPage/ProfilePage';
import VendorEditProfilePage from './features/VendorPage/EditProfile';
import AdminPage from './app/PageComponents/AdminPage/AdminPage';
import ServiceCategoriesPage from './app/PageComponents/AdminPage/ServiceCategoriesPage';
import ViewServiceCategoryDetails from './features/AdminPage/ViewServiceCategoryDetails';
import CreateServiceCategoryDetails from './features/AdminPage/CreateServiceCategoryDetails';
import EditServiceCategoryDetails from './features/AdminPage/EditServiceCategoryDetails';

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
            <Route path="spas" element={<SPASPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
          <Route path="vendor" element={<VendorPage />} >
            <Route index element={<div>Welcome to the Vendor portal</div>} />
            <Route path="profile" element={<VendorProfilePage />} />
            <Route path='profile/edit' element={<VendorEditProfilePage />} />
          </Route>
          <Route path="admin" element={<AdminPage />} >
            <Route index element={<div>Welcome to the Admin portal</div>} />
            <Route path="service-categories" element={<ServiceCategoriesPage />} />
            <Route path="service-categories/view/:serviceCategoryId" element={<ViewServiceCategoryDetails />} />
            <Route path="service-categories/edit/:serviceCategoryId" element={<EditServiceCategoryDetails />} />
            <Route path="service-categories/create" element={<CreateServiceCategoryDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
