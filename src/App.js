import { useState } from "react";
import Dashboard from "./Pages/temp/pages/dashboard";
import EmployeePage from "./Pages/temp/pages/employeePage";
import AttendancePage from "./Pages/temp/pages/attendancePage";
import Layout from "./components/Layout";
import AdvancePage from "./Pages/temp/pages/advancePage";


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