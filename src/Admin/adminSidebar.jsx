import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../components/Sidebar.css";
import { MdLogout } from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="dashboard">
        <h2> Admin Page </h2>

        <ul>
          <li>
            <NavLink to="/admin/createDealer">Create Dealer</NavLink>{" "}
          </li>
          <li>
            <NavLink to="/admin/addcug">Add New CUG</NavLink>
          </li>
          <li>
            <NavLink to="/admin/cugdetails">CUG Details</NavLink>
          </li>
          <li>
            <NavLink to="/admin/allotmentHistory">Allotment History</NavLink>
          </li>
          <li>
            <NavLink to="/admin/allocationReport">
              Allocation-Wise Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/cugStatusReport">CUG Status Report</NavLink>
          </li>
          <li>
            <NavLink to="/admin/activate_Deactivate_report">
              Activate Deactivate Report
            </NavLink>
          </li>
        </ul>
        <div></div>
        <button className="logoutbtn" onClick={() => navigate("/login")}>
          Logout <MdLogout />
        </button>
      </nav>
      <Outlet />
    </>
  );
};
export default AdminSidebar;
