import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import NavBar from './Navbar';
import BackToTopBtn from './BackToTopBtn';

function Layout() {
  return (
    <>
      <Topbar />
      <NavBar />
      <Outlet />
      <Footer />
      <BackToTopBtn />
    </>
  );
}

export default Layout;
