import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import MyProfile from "./pages/profile/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
// import Logout from "./pages/Logout";
import Organization from "./pages/organizations/Organizations";
import OrganizationDetails from "./pages/organizations/OrganizationDetails";
import Settings from "./pages/Settings";
import TermsAndCond from "./pages/TermsAndCond";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route
            path="/MyProfile/:userId/password"
            element={<PasswordChange />}
          />
          <Route path="/organization" element={<Organization />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/organization/:orgId/organization-details"
            element={<OrganizationDetails />}
          />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/TermsAndCond" element={<TermsAndCond />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
