import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { confirmLogin } from "../store/slices/profileSlice";
import Loader from "./Loader";
import getCookie from "../services/getCookie";
import removeCookie from "../services/removeCookie";
import { LINK_APP } from "../config";

function UserInfo() {
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(confirmLogin());
  }, [dispatch]);

  const logout = () => {
    navigate("/");
    fetch(LINK_APP + "api/auth/logout", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("api")}`,
      },
    });
    removeCookie("api");
    window.location.reload();
  };

  return (
    <div className="text-right">
      <div className="d-flex align-items-center" style={{ height: "100%" }}>
        {loading ? (
          <Loader width={30} height={30} />
        ) : (
          <>
            {profile ? (
              <Dropdown>
                <div className="p-3 d-flex justify-content-center align-items-center border border-secondary rounded">
                  <img
                    src={profile.image_url}
                    alt="..."
                    style={{ width: "30px" }}
                  />
                  <h6 className="mb-0 ml-2">{profile.name}</h6>
                  <div className="ml-3 d-flex justify-content-center align-items-center">
                    <span id="points">{profile.points}</span>
                    <i className="fa fa-bolt text-primary ml-1"></i>
                  </div>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    className="ml-2"
                  ></Dropdown.Toggle>
                </div>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      style={{ color: "inherit" }}
                      className="text-decoration-none"
                    >
                      Профиль
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/dictionary"
                      style={{ color: "inherit" }}
                      className="text-decoration-none"
                    >
                      Мой словарь
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                className="btn py-2 px-4 d-block"
                to="/auth/login"
                style={{
                  color: "white",
                  backgroundColor: "#FF6600",
                  borderColor: "#FF6600",
                }}
              >
                {/* <i className="fa fa-user text-white mr-3"></i> */}
                Вход/Регистрация
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
