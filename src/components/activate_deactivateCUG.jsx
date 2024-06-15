import { useState } from "react";
import { db } from "../api/firebaseConfig"; // Ensure you have firebaseConfig.js correctly set up
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import "./activate_deactivateCUG.css";

const AcDeac = () => {
  const [searchCUGno, setSearchCUGno] = useState("");
  const [cugDetails, setCugDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "cug", searchCUGno);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCugDetails(docSnap.data());
        setError("");
      } else {
        setCugDetails(null);
        setError("No CUG found with the entered number.");
      }
    } catch (err) {
      console.error("Error fetching document: ", err);
      setError("Error fetching CUG details. Please try again.");
    }
  };

  const handleDeactivate = async () => {
    if (cugDetails) {
      try {
        const docRef = doc(db, "cug", searchCUGno);
        await updateDoc(docRef, {
          employeeNo: "",
          employeeName: "",
          designation: "",
          division: "",
          department: "",
          status: "",
          billUnit: "",
          allocation: "",
          plan: "",
        });
        setCugDetails((prev) => ({ ...prev, employeeNo: "", employeeName: "", designation: "", division: "", department: "", status: "", billUnit: "", allocation: "", plan: "" }));
        setError("");
      } catch (err) {
        console.error("Error updating document: ", err);
        setError("Error deactivating CUG. Please try again.");
      }
    }
  };

  return (
    <>
      <main className="acdeac">
        <h1>CUG Details</h1>
        <form onSubmit={handleSearch} className="searchCUG">
          <div className="col-4 searchCont">
            <label htmlFor="searchCUGno" className="form-label">
              CUG No.
            </label>
            <input
              type="search"
              className="form-control"
              name="searchCUGno"
              id="searchCUGno"
              value={searchCUGno}
              onChange={(e) => setSearchCUGno(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {cugDetails && (
          <div className="empDetails">
            <h4>EMP NO.: <b>{cugDetails.employeeNo}</b></h4>
            <h4>Employee Name: <b>{cugDetails.employeeName}</b></h4>
            <h4>Designation: <b>{cugDetails.designation}</b></h4>
            <h4>Division: <b>{cugDetails.division}</b></h4>
            <h4>Department: <b>{cugDetails.department}</b></h4>
            <h4>Bill Unit: <b>{cugDetails.billUnit}</b></h4>
            <h4>Allocation: <b>{cugDetails.allocation}</b></h4>
            <h4>Employee Status: <b>{cugDetails.status}</b></h4>
            <h4>Plan: <b>{cugDetails.plan}</b></h4>
          </div>
        )}
        <div className="AcDeacbtn">
          {cugDetails && (
            <button className="btn btn-outline-danger" onClick={handleDeactivate}>
              Deactivate
            </button>
          )}
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default AcDeac;
