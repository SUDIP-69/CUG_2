import "./Login.css";
import logo from "../assets/railwaylogo.png";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../api/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../api/AuthContext";

const Login = () => {
  const [userType, setUserType] = useState("Dealer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDealer = () => setUserType("Dealer");
  const handleAdmin = () => setUserType("Admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionName = userType === "Dealer" ? "dealers" : "admins";
      const q = query(
        collection(db, collectionName),
        where("name", "==", name),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        login({ ...userData, role: userType });
        localStorage.setItem("user",JSON.stringify(userData));
        if (userType === "Dealer") navigate("/dealer/addcug");
        else navigate("/admin/createDealer");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error while logging in");
      console.error(err);
    }
  };

  return (
    <>
      <main className="login">
        <header className="login_header">
          <img src={logo} alt="Railway_logo" className="logo" />
        </header>
        <center>
          <h1>Login</h1>
        </center>
        <div className="form">
          <form onSubmit={handleSubmit} className="login_form">
            {error && <p className="error">{error}</p>}
            <div className="select_user">
              <button
                className={` ${userType === "Dealer" ? "dealer" : ""} `}
                onClick={handleDealer}
                type="button"
              >
                Dealer
              </button>
              <button
                className={` ${userType === "Admin" ? "admin" : ""} `}
                onClick={handleAdmin}
                type="button"
              >
                Admin
              </button>
            </div>
            <div className="user_name">
              Name:
              <input
                type="text"
                className="loginname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <LuUser2 className="userlogo" />
            </div>
            <div className="user_email">
              Email:
              <input
                type="email"
                className="loginemail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineEmail className="userlogo" />
            </div>
            <div className="user_password">
              Password:
              <input
                type="password"
                className="loginpass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="userlogo" />
            </div>
            <button className="submit" type="submit">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;