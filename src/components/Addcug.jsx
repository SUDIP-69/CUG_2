import { useState, useEffect } from "react";
import { db } from "../api/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import "./Addcug.css";

const Addcug = () => {
  const [cugNo, setCugNo] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [operator, setOperator] = useState("");
  const [billUnit, setBillUnit] = useState("");
  const [allocation, setAllocation] = useState("");
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cugAvailable, setCugAvailable] = useState(null);

  const [divisionOptions, setDivisionOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [allocationOptions, setAllocationOptions] = useState([]);

  useEffect(() => {
    const checkCugAvailability = async () => {
      if (cugNo.length === 10) {
        try {
          const q = query(collection(db, "cug"), where("cugNo", "==", cugNo), where("status", "==", "Active"));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const existingCug = querySnapshot.docs[0].data();
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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch divisions
        const divisionsResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/division.json');
        if (!divisionsResponse.ok) {
          throw new Error('Failed to fetch divisions');
        }
        const divisionsData = await divisionsResponse.json();
        setDivisionOptions(Object.keys(divisionsData).map(key => divisionsData[key]));

        // Fetch departments
        const departmentsResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/department.json');
        if (!departmentsResponse.ok) {
          throw new Error('Failed to fetch departments');
        }
        const departmentsData = await departmentsResponse.json();
        setDepartmentOptions(Object.keys(departmentsData).map(key => departmentsData[key]));

        // Fetch operators
        const operatorsResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/operator.json');
        if (!operatorsResponse.ok) {
          throw new Error('Failed to fetch operators');
        }
        const operatorsData = await operatorsResponse.json();
        setOperatorOptions(Object.keys(operatorsData).map(key => operatorsData[key]));

        // Fetch plans
        const plansResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/plan.json');
        if (!plansResponse.ok) {
          throw new Error('Failed to fetch plans');
        }
        const plansData = await plansResponse.json();
        setPlanOptions(Object.keys(plansData).map(key => plansData[key]));

        // Fetch designations
        const designationsResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/designation.json');
        if (!designationsResponse.ok) {
          throw new Error('Failed to fetch designations');
        }
        const designationsData = await designationsResponse.json();
        setDesignationOptions(Object.keys(designationsData).map(key => designationsData[key]));

        // Fetch allocations
        const allocationsResponse = await fetch('https://cug-management-default-rtdb.firebaseio.com/allocation.json');
        if (!allocationsResponse.ok) {
          throw new Error('Failed to fetch allocations');
        }
        const allocationsData = await allocationsResponse.json();
        setAllocationOptions(Object.keys(allocationsData).map(key => allocationsData[key]));

      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChangeCugNo = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    setCugNo(value);
  };

  const handleChangeEmployeeNo = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only alphanumeric characters
    setEmployeeNo(value);
  };

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
      const status = "Active";

      const cugCollectionRef = collection(db, "cug");
      await addDoc(cugCollectionRef, {
        cugNo: cugNo,
        employeeNo: employeeNo,
        employeeName: employeeName,
        operator: operator,
        designation: designation,
        division: division,
        department: department,
        status: status,
        billUnit: billUnit,
        allocation: allocation,
        plan: plan,
        createdAt: now,
      });

      setSuccess("CUG added successfully!");
      setCugNo("");
      setEmployeeNo("");
      setEmployeeName("");
      setDesignation("");
      setDivision("");
      setDepartment("");
      setOperator("");
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
                onChange={handleChangeCugNo}
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
              onChange={handleChangeEmployeeNo}
              maxLength="11"
              pattern="[a-zA-Z0-9]{11}"
              required
            />
          </div>
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
          <div className="col-4">
            <label htmlFor="inputDesignation" className="form-label">
              Designation
            </label>
            <select
              id="inputDesignation"
              className="form-select"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              {designationOptions.map((desig, index) => (
                <option key={index} value={desig}>{desig}</option>
              ))}
            </select>
          </div>
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
              {divisionOptions.map((div, index) => (
                <option key={index} value={div}>{div}</option>
              ))}
            </select>
          </div>
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
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputOperator" className="form-label">
              Operator
            </label>
            <select
              id="inputOperator"
              className="form-select"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              {operatorOptions.map((op, index) => (
                <option key={index} value={op}>{op}</option>
              ))}
            </select>
          </div>
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
              {allocationOptions.map((alloc, index) => (
                <option key={index} value={alloc}>{alloc}</option>
              ))}
            </select>
          </div>
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
              {planOptions.map((pln, index) => (
                <option key={index} value={pln}>{pln}</option>
              ))}
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
