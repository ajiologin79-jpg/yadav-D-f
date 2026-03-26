import Sidebar from "./Sidebar";

export default function Layout({ children, setPage }) {
  return (
    <div className="app">

      <Sidebar setPage={setPage} />

      <div className="main">

        <div className="topbar">
          <h3>Payroll Management System</h3>
        </div>

        {children}

      </div>
    </div>
  );
}