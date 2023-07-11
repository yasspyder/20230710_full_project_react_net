import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

function Topbar() {
  return (
    <div className="container-fluid d-lg-block">
      <div className="d-flex justify-content-between py-4 px-3 align-items-center">
        <div className="">
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center overflow-hidden"
            style={{ height: "100px" }}
          >
            <img className="main-logo" src="/img/BrisklyLogo.svg" alt="" />
            <div className="px-1 d-flex flex-column justify-content-center">
              <h1 className="m-0">
                <span className="text-primary">B</span>RISKLY
              </h1>
              <h1 className="m-0">
                <span className="text-primary">L</span>EARN
              </h1>
            </div>
          </Link>
        </div>
        <div className="col-lg-3 text-right">
          <form method="get" action="#" className="w-100 d-flex">
            <button className="myButton">
              <i className="fa fa-2x fa-search mr-3"></i>
            </button>
            <div className="input-group">
              <div>
                <input
                  type="text"
                  className="form-control border-primary"
                  style={{ padding: 5, paddingLeft: 15 }}
                  placeholder="Поиск по тестам"
                  id="s"
                  name="s"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-lg-flex d-none">
          <UserInfo />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
