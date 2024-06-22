import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Addcug from "./components/Addcug";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AcDeac from "./components/activate_deactivateCUG";
import AllocationReport from "./components/allocationRepo";
import PlanReport from "./components/planReport";
import AdminSidebar from "./Admin/adminSidebar";
import CUGbill from "./Admin/CUGbill"
import CUGno from "./Admin/CUGno"
import AllHis from "./Admin/allotmentHistory";
import AcDeacReport from "./Admin/activate_deactivateReport";
import CreateDealer from "./Admin/createDealer";
import CugStatusReport from "./Admin/cugStatusReport";
import { AuthProvider } from "./api/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* -------------Dealer Page Routing--------------- */}
          <Route
            path="/dealer"
            element={
              <ProtectedRoute allowedRoles={["Dealer"]}>
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route path="addcug" element={<Addcug />} />
            <Route path="activateDeactivate" element={<AcDeac />} />
            <Route path="allocationReport" element={<AllocationReport />} />
            <Route path="planReport" element={<PlanReport />} />
          </Route>
          {/* -------------Admin Page Routing--------------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminSidebar />
              </ProtectedRoute>
            }
          >
            <Route path="createDealer" element={<CreateDealer />} />
            <Route path="addcug" element={<Addcug />} />
            <Route path="cugdetails" element={<AcDeac />} />
            <Route path="allotmentHistory" element={<AllHis />} />
            <Route path="allocationReport" element={<AllocationReport />} />
            <Route path="cugStatusReport" element={<CugStatusReport />} />
            <Route path="activate_Deactivate_report" element={<AcDeacReport />} />
            <Route path="CUGbill" element={<CUGbill />} />
            <Route path="CUGno" element={<CUGno />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
