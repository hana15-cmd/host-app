import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <header className="p-6 bg-navy-dark text-white shadow-md">
        <h1 className="text-2xl font-bold mb-2">My MFE Portal</h1>
        <nav className="flex gap-4">
          <Link className="hover:text-blue-400" to="/">
            Home
          </Link>
          <Link className="hover:text-blue-400" to="/dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-blue-400" to="/accounting">
            Accounting
          </Link>
            <Link className="hover:text-blue-400" to="/user-management">
              User Management
            </Link>
        </nav>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="p-6 text-center text-gray-300 bg-navy-dark">
        © 2026 My Company
      </footer>
    </div>
  );
}