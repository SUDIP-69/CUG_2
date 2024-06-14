import { Outlet } from "react-router-dom";
import "./createDealer.css";
const CreateDealer = () => {
  return (
    <>
      <main className="createDealer">
        <h1>Create Dealer</h1>
        <form className="row g-3">
          <div className="col-6">
            <label htmlFor="inputUsername" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              placeholder="John Wick"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Create Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
            />
          </div>

          <div className="col-6">
            <label htmlFor="inputAddress2" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create Dealer
            </button>
          </div>
        </form>
      </main>

      <Outlet />
    </>
  );
};
export default CreateDealer;
