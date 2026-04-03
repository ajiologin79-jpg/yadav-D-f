import { useState, useEffect } from "react";

import Dashboard from "./pages/dashboard";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import AdvancePage from "./pages/AdvancePage";

import Login from "./pages/login";
import Signup from "./pages/signup";

import Layout from "./components/Layout";
import { isLoggedIn } from "./utils/auth";

function App() {

  const [page, setPage] = useState("login");

  // 🔥 Auto login check
  useEffect(() => {
    if (isLoggedIn()) {
      setPage("dashboard");
    } else {
      setPage("login");
    }
  }, []);

  // 🔥 AUTH PAGES (NO SIDEBAR)
  if (page === "login") return <Login setPage={setPage} />;
  if (page === "signup") return <Signup setPage={setPage} />;

  // 🔥 MAIN APP (WITH SIDEBAR)
  return (
    <Layout setPage={setPage}>

      {page === "dashboard" && <Dashboard />}
      {page === "employee" && <EmployeePage />}
      {page === "attendance" && <AttendancePage />}
      {page === "advance" && <AdvancePage />}

    </Layout>
  );
}

export default App;
