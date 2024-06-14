// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth, db } from '../api/firebaseConfig';
// import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const userDoc = await getDoc(doc(db, 'cred', userCredential.user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setCurrentUser(userCredential.user);
//         setUserRole(userData.role);
//         return userData.role;  // Return the role
//       } else {
//         throw new Error('User data not found');
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       throw new Error('Invalid credentials');
//     }
//   };  

//   const logout = () => {
//     signOut(auth);
//     setCurrentUser(null);
//     setUserRole(null);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, 'cred', user.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setCurrentUser(user);
//           setUserRole(userData.role);
//         }
//       } else {
//         setCurrentUser(null);
//         setUserRole(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     userRole,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// src/api/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object with role

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
