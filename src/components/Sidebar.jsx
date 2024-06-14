import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import "./Sidebar.css";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="dashboard">
        <h2> Dealer Page </h2>

        <ul>
          <li>
            <NavLink to="/dealer/addcug">Add New CUG</NavLink>
          </li>
          <li>
            <NavLink to="/dealer/activateDeactivate">
              Activate / Deactivate CUG
            </NavLink>
          </li>
          <li>
            <NavLink to="/dealer/allocationReport">
              Allocation Wise Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/dealer/planReport">Plan-Wise Billing Report</NavLink>
          </li>
        </ul>
        <button className="logoutbtn" onClick={() => navigate("/login")}>
          Logout <MdLogout />
        </button>
      </nav>
      <Outlet />
    </>
  );
};
export default Sidebar;
