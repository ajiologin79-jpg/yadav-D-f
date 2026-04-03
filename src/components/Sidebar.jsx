import { getUser } from "../utils/auth";

const user = getUser();

export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h3 style={{ padding: "20px" }}>
        {user?.userName}
      </h3>

      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("employee")}>Employees</button>
      <button onClick={() => setPage("advance")}>Advance</button>
      <button onClick={() => setPage("attendance")}>Download PaySlip</button>
    </div>
  );
}