import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

const DashboardApp = React.lazy(() => import("remote_app/App"))
const AccountingApp = React.lazy(() => import("mfe_accounting_app/App"))

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 20 }}>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/accounting">Accounting</Link>
      </nav>

      <Suspense fallback={<div>Loading MFE...</div>}>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardApp />} />
          <Route path="/accounting/*" element={<AccountingApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
