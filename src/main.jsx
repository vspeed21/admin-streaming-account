import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import SavePassword from './pages/SavePassword';
import Confirm from './pages/Confirm';

import AdminAccount from './pages/AdminAccounts';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';


import { AuthProvider } from './context/AuthProvider';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/confirm/:token',
        element: <Confirm/>
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword/>
      },
      {
        path: '/save-password/:token',
        element: <SavePassword/>
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminAccount/>
      },
      {
        path: '/admin/profile',
        element: <Profile/>
      },
      {
        path: '/admin/change-password',
        element: <ChangePassword/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)
