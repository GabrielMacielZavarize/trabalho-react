import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
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

export default AppLayout;