import { useState } from "react";
import { Outlet } from "react-router-dom";
import { db } from "../api/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./createDealer.css";

const CreateDealer = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "dealers"), {
        name: username,
        email: email,
        password: password,
        address: address,
        city: city,
        state: state,
        zip: zip,
        role: "Dealer",
      });
      console.log("Document written with ID: ", docRef.id);
      setSuccess("Dealer created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setError("");
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Error creating dealer. Please try again.");
      setSuccess("");
    }
  };

  return (
    <>
      <main className="createDealer">
        <h1>Create Dealer</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-6">
            <label htmlFor="inputUsername" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              placeholder="Full Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="__@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Create Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select
              id="inputState"
              className="form-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Odisha">Odisha</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
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
