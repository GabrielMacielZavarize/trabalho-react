import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import useAuth from './contexts/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Services from './routes/Services';
import Users from './routes/Users';
import Login from './routes/Login';
import './assets/styles/Layout.css';
import './assets/styles/Navbar.css';

const AppLayout = () => (
  <div className="layout">
    <Navbar />
    <main className="layout-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
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
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'services',
          element: <Services />,
        },
        {
          path: 'users',
          element: <Users />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
