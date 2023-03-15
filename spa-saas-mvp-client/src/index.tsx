import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './app/PageComponents/HomePage';
import Login from './features/Login';
import ClientPage from './app/PageComponents/ClientPortal/ClientPage';
import Logout from './features/Logout';
import AppointmentsPage from './app/PageComponents/ClientPortal/AppointmentsPage';
import HistoryPage from './app/PageComponents/ClientPortal/HistoryPage';
import ProfilePage from './app/PageComponents/ClientPortal/ProfilePage';
import SPASPage from './app/PageComponents/ClientPortal/SPASPage';
import EditProfile from './features/ClientPortal/EditProfile';
import Register from './features/Register';

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
          {/* <Route path="recipe-list" element={<RecipePage />} >
            <Route index element={<div>Please select a recipe from the list</div>} />
            <Route path=":recipeId" element={<RecipeDetails />} />
            <Route path="create" element={<CreateRecipe />} />
            <Route path="edit/:recipeId" element={<EditRecipe />} />
          </Route>
          <Route path="/history" element={<HistoryPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
