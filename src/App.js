import { useState } from "react";
import Dashboard from "./pages/dashboard";
import EmployeePage from "./pages/employeePage";
import AttendancePage from "./pages/attendancePage";
import Layout from "./components/Layout";
import AdvancePage from "./pages/advancePage";


function App() {

  const [page, setPage] = useState("dashboard");

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