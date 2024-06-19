import { useState, useEffect } from "react";
import { db } from "../api/firebaseConfig";
import { doc, getDoc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import "./Addcug.css";

const Addcug = () => {
  const [cugNo, setCugNo] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  // const [operator, setOperator] = useState("");
  const [designation, setDesignation] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [billUnit, setBillUnit] = useState("");
  const [allocation, setAllocation] = useState("");
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cugAvailable, setCugAvailable] = useState(null);

  useEffect(() => {
    const checkCugAvailability = async () => {
      if (cugNo.length === 10) {
        try {
          const docRef = doc(db, "cug", cugNo);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const existingCug = docSnap.data();
            if (existingCug.status === "Active") {
              setCugAvailable(false);
            } else {
              setCugAvailable(true);
            }
          } else {
            setCugAvailable(true);
          }
        } catch (err) {
          console.error("Error checking CUG availability: ", err);
        }
      } else {
        setCugAvailable(null);
      }
    };

    checkCugAvailability();
  }, [cugNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cugNo.length !== 10 || employeeNo.length !== 11) {
      setError("CUG No. must be 10 digits and Employee No. must be 11 characters.");
      return;
    }

    if (cugAvailable === false) {
      setError("A CUG with this number already exists and is active.");
      return;
    }

    try {
      const now = new Date().toLocaleString();
      const s = "Active";
      const docRef = doc(db, "cug", cugNo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().status === "Inactive") {
        // If the existing CUG is inactive, add a new document with a unique ID
        const newCugRef = collection(db, "cug");
        await addDoc(newCugRef, {
          cugNo: cugNo,
          employeeNo: employeeNo,
          employeeName: employeeName,
          operator: status,
          designation: designation,
          division: division,
          department: department,
          status: s,
          billUnit: billUnit,
          allocation: allocation,
          plan: plan,
          createdAt: now,
        });
      } else {
        // If the CUG does not exist, add it directly with the given CUG number as the document ID
        await setDoc(doc(db, "cug", cugNo), {
          cugNo: cugNo,
          employeeNo: employeeNo,
          employeeName: employeeName,
          operator: status,
          designation: designation,
          division: division,
          department: department,
          status: s,
          billUnit: billUnit,
          allocation: allocation,
          plan: plan,
          createdAt: now,
        });
      }

      setSuccess("CUG added successfully!");
      setCugNo("");
      setEmployeeNo("");
      setEmployeeName("");
      setDesignation("");
      setDivision("");
      setDepartment("");
      setStatus("");
      setBillUnit("");
      setAllocation("");
      setPlan("");
      setError("");
      setCugAvailable(null);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Error adding CUG. Please try again.");
      setSuccess("");
    }
  };

  return (
    <>
      <main className="addcug">
        <h1>Add New CUG</h1>
        <br />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* ----------CUG NO.------------------ */}
          <div className="col-md-4">
            <label htmlFor="inputCUGno" className="form-label">
              CUG No.
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="inputCUGno"
                placeholder="10 digit number"
                value={cugNo}
                onChange={(e) => setCugNo(e.target.value)}
                maxLength="10"
                required
              />
              {cugAvailable === true && (
                <span className="input-group-text text-success">✔</span>
              )}
              {cugAvailable === false && (
                <span className="input-group-text text-danger">✖</span>
              )}
            </div>
          </div>
          {/* ----------Employee No.--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputempNo" className="form-label">
              Employee No.
            </label>
            <input
              type="text"
              className="form-control"
              id="inputempNo"
              placeholder="11 alpha-numeric character"
              value={employeeNo}
              onChange={(e) => setEmployeeNo(e.target.value)}
              maxLength="11"
              pattern="[a-zA-Z0-9]{11}"
              required
            />
          </div>
          {/* ----------Employee Name.--------------- */}
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Full Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          {/* ----------Employee Designation.--------------- */}
          <div className="col-4">
            <label htmlFor="inputDesignation" className="form-label">
              Designation
            </label>
            <input
              type="text"
              className="form-control"
              id="inputDesignation"
              placeholder="Dr./Mr./Mrs."
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
          {/* ----------Employee Division--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDivision" className="form-label">
              Division
            </label>
            <select
              id="inputDivision"
              className="form-select"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="South-East">South-East</option>
              <option value="East Coast">East Coast</option>
            </select>
          </div>
          {/* ----------Employee Department--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDepartment" className="form-label">
              Department
            </label>
            <select
              id="inputDepartment"
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="Signaling">Signaling</option>
              <option value="ALP">ALP</option>
            </select>
          </div>
          {/* ----------Operator--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputstatus" className="form-label">
              Operator
            </label>
            <select
              id="inputstatus"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="Airtel">Airtel</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
              <option value="Jio">Jio</option>
            </select>
          </div>
          {/* ----------Employee Bill Unit--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputbillUnit" className="form-label">
              Bill Unit
            </label>
            <input
              type="number"
              className="form-control"
              id="inputbillUnit"
              value={billUnit}
              onChange={(e) => setBillUnit(e.target.value)}
              required
            />
          </div>
          {/* ----------Employee Allocation--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputAllocation" className="form-label">
              Allocation
            </label>
            <select
              id="inputAllocation"
              className="form-select"
              value={allocation}
              onChange={(e) => setAllocation(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="1234567">1234567</option>
              <option value="2345678">2345678</option>
            </select>
          </div>
          {/* ----------Employee Plan--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputPlan" className="form-label">
              Plan
            </label>
            <select
              id="inputPlan"
              className="form-select"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="Plan A">Plan A</option>
              <option value="Plan B">Plan B</option>
              <option value="Plan C">Plan C</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Addcug;
