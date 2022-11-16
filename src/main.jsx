import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import SavePassword from './pages/SavePassword';
import Confirm from './pages/Confirm';
import { AuthProvider } from './context/AuthProvider';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)
