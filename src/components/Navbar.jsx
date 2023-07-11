import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserInfo from "./UserInfo";

function NavBar() {
  return (
    <div className="container-fluid shadow-sm bg-white rounded">
      <div className="row border-top">
        <div className="px-3">
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ float: "right" }}
            />
            <Navbar.Collapse id="basic-navbar-nav" className="pt-3 pt-lg-0">
              <div className="d-lg-none">
                <UserInfo />
              </div>
              <Nav className="mr-auto py-3 py-lg-0">
                <NavLink to="/" className="nav-item nav-link">
                  Главная
                </NavLink>
                <NavLink to="/courses" className="nav-item nav-link">
                  Курсы
                </NavLink>
                <NavLink to="/tests" className="nav-item nav-link">
                  Тесты
                </NavLink>
                <NavLink to="/articles" className="nav-item nav-link">
                  Статьи
                </NavLink>
                <NavLink to="/about" className="nav-item nav-link">
                  О нас
                </NavLink>
                <NavLink to="/contacts" className="nav-item nav-link">
                  Контакты
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
