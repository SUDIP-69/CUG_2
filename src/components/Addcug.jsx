import "./Addcug.css";

const Addcug = () => {
  return (
    <>
      <main className="addcug">
        <h1>Add New CUG</h1>
        <br />
        <form className="row g-3">
          {/* ----------CUG NO.------------------ */}
          <div className="col-md-4">
            <label htmlFor="inputCUGno" className="form-label">
              CUG No.
            </label>
            <input type="number" className="form-control" id="inputCUGno" />
          </div>
          {/* ----------Employee No.--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputempNo" className="form-label">
              Employee No.
            </label>
            <input type="number" className="form-control" id="inputempNo" />
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
              placeholder="John Wick"
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
              placeholder="Employee"
            />
          </div>
          {/* ----------Employee Division--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDivision" className="form-label">
              Division
            </label>
            <select id="inputDivision" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          {/* ----------Employee Department--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputDepartment" className="form-label">
              Department
            </label>
            <select id="inputDepartment" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          {/* ----------Employee Status--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputstatus" className="form-label">
              Employee Status
            </label>
            <select id="inputstatus" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          {/* ----------Employee Bill Unit--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputbillUnit" className="form-label">
              Bill Unit
            </label>
            <input type="number" className="form-control" id="inputbillUnit" />
          </div>
          {/* ----------Employee Allocation--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputAllocation" className="form-label">
              Allocation
            </label>
            <select id="inputAllocation" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          {/* ----------Employee Plan--------------- */}
          <div className="col-md-4">
            <label htmlFor="inputPlan" className="form-label">
              Plan
            </label>
            <select id="inputPlan" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          {/* <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div> */}
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
