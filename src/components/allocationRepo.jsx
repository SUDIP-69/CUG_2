import { useState } from "react";
import { db } from "../api/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./allocationRepo.css";
import { Outlet } from "react-router-dom";

const AllocationReport = () => {
  const [allocationNo, setallocationNo] = useState("");
  const [cugDetails, setCugDetails] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCugDetails([]);

    try {
      const cugCollection = collection(db, "cug");
      const q = query(cugCollection, where("allocation", "==", allocationNo));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const details = querySnapshot.docs.map((doc) => doc.data());
        setCugDetails(details);
      } else {
        setError("No CUG found with the provided number.");
      }
    } catch (err) {
      console.error("Error fetching documents: ", err);
      setError("Error fetching CUG details. Please try again.");
    }
  };

  return (
    <>
      <main className="allotmentHistory">
        <h1>CUG Allotment History</h1>
        <form className="searchCUG" onSubmit={handleSearch}>
          <div className="col-4 searchCont">
            <label htmlFor="searchallocationNo" className="form-label">
             Allocation No.
            </label>
            <input
              type="search"
              className="form-control"
              name="searchallocationNo"
              id="searchallocationNo"
              value={allocationNo}
              onChange={(e) => setallocationNo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Search
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {cugDetails.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>EMP NO.</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Division</th>
                <th>Department</th>
                <th>Bill Unit</th>
                <th>Allocation</th>
                <th>Employee Status</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {cugDetails.map((details, index) => (
                <tr key={index} className={details.status === "Active" ? "active" : ""}>
                  <td>{details.employeeNo}</td>
                  <td>{details.employeeName}</td>
                  <td>{details.designation}</td>
                  <td>{details.division}</td>
                  <td>{details.department}</td>
                  <td>{details.billUnit}</td>
                  <td>{details.allocation}</td>
                  <td>{details.status}</td>
                  <td>{details.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default AllocationReport;
