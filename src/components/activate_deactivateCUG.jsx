import { Outlet } from "react-router-dom";
import "./activate_deactivateCUG.css";
import { IoIosSearch } from "react-icons/io";

const AcDeac = () => {
  return (
    <>
      <main className="acdeac">
        <h1> CUG Details</h1>
        <form action="" className="searchCUG ">
          <div className="col-4 searchCont">
            <label for="searchCUGno" class="form-label">
              CUG No.
            </label>
            <input
              type="search"
              className="form-control"
              name="searchCUGno"
              id="searchCUGno"
            />
          </div>
          <button className="btn btn-danger">Search</button>
        </form>
        <div className="empDetails">
          <h4>EMP NO. :</h4>
          <h4>Employee Name :</h4>
          <h4>Designation :</h4>
          <h4>Division :</h4>
          <h4>Department :</h4>
          <h4>Bill Unit :</h4>
          <h4>Allocation :</h4>
          <h4>Employee Status :</h4>
          <h4>Plan :</h4>
        </div>
        <div className="AcDeacbtn">
          {/* <button className="btn btn-danger">Activate</button> */}
          <button className="btn btn-outline-danger">Deactivate</button>
        </div>
      </main>
      <Outlet />
    </>
  );
};
export default AcDeac;
