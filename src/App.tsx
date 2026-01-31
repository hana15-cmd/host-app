import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

const DashboardApp = React.lazy(() => import("remote_app/App"));
const AccountingApp = React.lazy(() => import("mfe_accounting_app/App"));

// Error boundary for MFEs
class MFEErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="text-red-500 text-center py-6">
          Failed to load module.
        </div>
      );
    return this.props.children;
  }
}

// Home page with tiles
function Home() {
  const navigate = useNavigate();

  const mfeTiles = [
    {
      title: "Dashboard",
      description: "View key metrics and analytics at a glance",
      path: "/dashboard",
      icon: "📊",
    },
    {
      title: "Accounting",
      description: "Manage invoices, expenses, and financial reports",
      path: "/accounting",
      icon: "💰",
    },
  ];

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to My MFE Portal
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Access all your dashboards and tools from a single place. Click on a card to enter.
        </p>
      </div>

      {/* MFE Tiles */}
      <div className="flex flex-wrap gap-8 justify-center">
        {mfeTiles.map((tile) => (
          <div
            key={tile.path}
            onClick={() => navigate(tile.path)}
            className="flex-1 min-w-[250px] max-w-xs bg-gradient-to-br from-navy-light to-navy-dark rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl p-6 flex flex-col items-start"
          >
            <div className="text-3xl mb-3">{tile.icon}</div>
            <h2 className="text-2xl font-bold text-white">{tile.title}</h2>
            <p className="mt-2 text-gray-200">{tile.description}</p>
            <button className="mt-4 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all font-semibold">
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared layout
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <header className="p-6 bg-navy-dark text-white shadow-md">
        <h1 className="text-2xl font-bold mb-2">My MFE Portal</h1>
        <nav className="flex gap-4">
          <Link className="hover:text-blue-400" to="/">Home</Link>
          <Link className="hover:text-blue-400" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-blue-400" to="/accounting">Accounting</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="p-6 text-center text-gray-300 bg-navy-dark">
        © 2026 My Company
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center mt-24 text-white text-xl">
            Loading module...
          </div>
        }
      >
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
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}
