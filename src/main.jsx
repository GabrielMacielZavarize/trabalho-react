import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './routes/Home';
import Services from './routes/Services';
import Users from './routes/Users';
import Login from './routes/Login';
import AppLayout from './App.jsx';
import './index.css';
import './assets/styles/Layout.css';
import './assets/styles/Navbar.css';

const RouterWrapper = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/login',
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: '/',
      element: user ? <AppLayout /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Home /> },
        { path: 'services', element: <Services /> },
        { path: 'users', element: <Users /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterWrapper />
    </AuthProvider>
  </React.StrictMode>
);
