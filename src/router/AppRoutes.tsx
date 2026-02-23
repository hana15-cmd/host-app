import { Routes, Route } from "react-router-dom";

import { DashboardApp, AccountingApp, UserManagementApp } from "../mfe/remotes";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import MFEErrorBoundary from "../components/MFEErrorBoundary";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard/*"
          element={
            <MFEErrorBoundary>
              <DashboardApp />
            </MFEErrorBoundary>
          }
        />
        <Route
          path="/accounting/*"
          element={
            <MFEErrorBoundary>
              <AccountingApp />
            </MFEErrorBoundary>
          }
        />
        <Route
          path="/user-management/*"
          element={
            <MFEErrorBoundary>
              <UserManagementApp />
            </MFEErrorBoundary>
          }
        />
      </Routes>
    </Layout>
  );
}
