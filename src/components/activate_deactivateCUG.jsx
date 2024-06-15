import { useState } from "react";
import { db } from "../api/firebaseConfig"; // Ensure you have firebaseConfig.js correctly set up
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./activate_deactivateCUG.css";
import { Outlet } from "react-router-dom";

const AcDeac = () => {
  const [cugNo, setCugNo] = useState("");
  const [cugDetails, setCugDetails] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCugDetails(null);
    
    try {
      const docRef = doc(db, "cug", cugNo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCugDetails(docSnap.data());
      } else {
        setError("No CUG found with the provided number.");
      }
    } catch (err) {
      console.error("Error fetching document: ", err);
      setError("Error fetching CUG details. Please try again.");
    }
  };

  const handleDeactivate = async () => {
    if (!cugDetails) return;

    try {
      const docRef = doc(db, "cug", cugNo);
      await updateDoc(docRef, { status: "Inactive" });
      setCugDetails((prevDetails) => ({
        ...prevDetails,
        status: "Inactive",
      }));
      setError("");
    } catch (err) {
      console.error("Error updating document: ", err);
      setError("Error deactivating CUG. Please try again.");
    }
  };

  return (
    <>
      <main className="acdeac">
        <h1>CUG Details</h1>
        <form className="searchCUG" onSubmit={handleSearch}>
          <div className="col-4 searchCont">
            <label htmlFor="searchCUGno" className="form-label">
              CUG No.
            </label>
            <input
              type="search"
              className="form-control"
              name="searchCUGno"
              id="searchCUGno"
              value={cugNo}
              onChange={(e) => setCugNo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {cugDetails && (
          <>
            <div className="empDetails">
              <h4>EMP NO.: {cugDetails.employeeNo}</h4>
              <h4>Employee Name: {cugDetails.employeeName}</h4>
              <h4>Designation: {cugDetails.designation}</h4>
              <h4>Division: {cugDetails.division}</h4>
              <h4>Department: {cugDetails.department}</h4>
              <h4>Bill Unit: {cugDetails.billUnit}</h4>
              <h4>Allocation: {cugDetails.allocation}</h4>
              <h4>Employee Status: {cugDetails.status}</h4>
              <h4>Plan: {cugDetails.plan}</h4>
            </div>
            <div className="AcDeacbtn">
              <button
                className="btn btn-outline-danger"
                onClick={handleDeactivate}
                disabled={cugDetails.status === "Inactive"}
              >
                Deactivate
              </button>
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default AcDeac;
