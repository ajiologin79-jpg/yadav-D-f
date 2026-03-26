import { useState } from "react";

export default function Layout({ children, setPage }) {

  const [open, setOpen] = useState(false);

  const menuItem = (label, pageName) => (
    <div
      onClick={() => {
        setPage(pageName);
        setOpen(false); // 🔥 close sidebar on mobile
      }}
      style={{
        padding: "12px 20px",
        cursor: "pointer",
        borderBottom: "1px solid #334155"
      }}
    >
      {label}
    </div>
  );

  return (
    <div style={{ display: "flex" }}>

      {/* 🔥 MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1001,
          padding: "8px 12px",
          background: "#1e293b",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        ☰
      </button>

      {/* 🔥 OVERLAY (for mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 999
          }}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          height: "100vh",
          position: "fixed",
          left: open ? "0" : "-220px",
          top: 0,
          transition: "0.3s",
          zIndex: 1000
        }}
      >
        <h3 style={{ padding: "20px", borderBottom: "1px solid #334155" }}>
          Payroll
        </h3>

        {menuItem("Dashboard", "dashboard")}
        {menuItem("Employees", "employee")}
        {menuItem("Attendance", "attendance")}
        {menuItem("Advance", "advance")}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div
        style={{
          width: "100%",
          padding: "20px",
          marginTop: "40px"
        }}
      >
        {children}
      </div>

    </div>
  );
}
