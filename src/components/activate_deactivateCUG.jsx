import { useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import "./activate_deactivateCUG.css";
import { Outlet } from "react-router-dom";

const AcDeac = () => {
  const [cugNo, setCugNo] = useState("");
  const [cugDetails, setCugDetails] = useState(null);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCugDetails(null);
    setDocId(null);

    try {
      const cugCollection = collection(db, "cug");
      const q = query(cugCollection, where("cugNo", "==", cugNo), where("status", "==", "Active"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0]; // Assuming there's only one document per CUG No with Active status
        const docData = latestDoc.data();
        setCugDetails(docData);
        setDocId(latestDoc.id);
      } else {
        setError("No active CUG found with the provided number.");
      }
    } catch (err) {
      console.error("Error fetching document: ", err);
      setError("Error fetching CUG details. Please try again.");
    }
  };

  const handleDeactivate = async () => {
    if (!cugDetails || !docId) return;

    try {
      const docRef = doc(db, "cug", docId); // Use the correct document ID
      const currentTime = new Date().toLocaleString();
      await updateDoc(docRef, {
        status: "Inactive",
        deactivatedAt: currentTime,
      });
      setCugDetails((prevDetails) => ({
        ...prevDetails,
        status: "Inactive",
        deactivatedAt: currentTime,
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
              <h4>Operator: {cugDetails.operator}</h4>
              <h4>Bill Unit: {cugDetails.billUnit}</h4>
              <h4>Allocation: {cugDetails.allocation}</h4>
              <h4>Employee Status: {cugDetails.status}</h4>
              <h4>Plan: {cugDetails.plan}</h4>
              {cugDetails.deactivatedAt && <h4>Deactivated At: {cugDetails.deactivatedAt}</h4>}
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
