export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>Payroll</h2>

      <button onClick={()=>setPage("dashboard")}>Dashboard</button>
      <button onClick={()=>setPage("employee")}>Employees</button>
      <button onClick={()=>setPage("attendance")}>Reports</button>
      <button onClick={()=>setPage("advance")}>Advance</button>
    </div>
  );
}