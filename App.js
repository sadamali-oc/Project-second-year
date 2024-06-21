import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/profile/UpdateProfile";
import Users from "./pages/users/Users";
import Logout from "./pages/Logout";
import Organization from "./pages/organizations/Organizations";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Correct import
import OrganizationDetails from "../src/pages/organizations/OrganizationDetails";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />{" "}
          <Route path="/profile" element={<MyProfile />} />{" "}
          <Route path="/organization" element={<Organization />} />{" "}
          <Route path="/users" element={<Users />} />{" "}
          <Route path="/logout" element={<Logout />} />{" "}
          <Route path="/organization/:orgId/organization-details" component={OrganizationDetails} 
          
          />
          <Route path="/change-password" element={<PasswordChange/>} />{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}
