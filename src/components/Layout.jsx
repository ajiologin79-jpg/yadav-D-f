import { useState } from "react";
import { getUser, logoutUser } from "../utils/auth";

export default function Layout({ children, setPage }) {

  const [open, setOpen] = useState(false);
  const user = getUser();

  // 🔥 MENU ITEM COMPONENT
  const menuItem = (label, pageName) => (
    <div
      onClick={() => {
        setPage(pageName);
        setOpen(false);
      }}
      style={{
        padding: "14px 20px",
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "0.2s"
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
      }
      onMouseLeave={e =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      {label}
    </div>
  );

  return (
    <div style={{ display: "flex" }}>

      {/* 🔥 MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1001,
          padding: "8px 12px",
          background: "#0f172a",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        ☰
      </button>

      {/* 🔥 OVERLAY */}
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
          width: "230px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: open ? "0" : "-230px",
          transition: "0.3s",
          zIndex: 1000,
          color: "white",
          display: "flex",
          flexDirection: "column",

          background: "linear-gradient(180deg, #1e293b, #0f172a)"
        }}
      >

        {/* 🔥 USER NAME */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            fontWeight: "bold"
          }}
        >
          👤 {user?.userName || "User"}
        </div>

        {/* 🔥 MENU ITEMS */}
        <div style={{ flex: 1 }}>
          {menuItem("Dashboard", "dashboard")}
          {menuItem("Employees", "employee")}
          {menuItem("Download Payslip", "attendance")}
          {menuItem("Advance", "advance")}
        </div>

        {/* 🔥 LOGOUT */}
        <div
          onClick={() => {
            logoutUser();
            window.location.reload();
          }}
          style={{
            padding: "14px 20px",
            cursor: "pointer",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "#f87171",
            transition: "0.2s"
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={e =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          🚪 Logout
        </div>

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
