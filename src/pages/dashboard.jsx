import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";

export default function Dashboard() {

  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/employees`)
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);

  const mark = async (status) => {

    console.log("CLICK:", empId, date, status);

    if (!empId) {
      alert("Please select employee");
      return;
    }

    if (!date) {
      alert("Please select date");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/attendance`, {
        employeeId: Number(empId),
        date: date,
        status: status
      });

      alert(`Attendance marked: ${status} ✅`);

    } catch (err) {
      console.error(err);
      alert("Error saving attendance ❌");
    }
  };

  return (
    <div className="grid grid-2">

      {/* Attendance Card */}
      <div className="card">
        <h2>Mark Attendance</h2>

        <select onChange={e => setEmpId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <input type="date" onChange={e => setDate(e.target.value)} />

        <div className="grid grid-2">
          <button className="btn green" onClick={() => mark("FULL")}>Full Day</button>
          <button className="btn yellow" onClick={() => mark("HALF")}>Half Day</button>
          <button className="btn red" onClick={() => mark("ABSENT")}>Absent</button>
        </div>
      </div>

      {/* Info Card */}
      <div className="card">
        <h2>System Info</h2>
        <p>✔ Manage employees</p>
        <p>✔ Track attendance</p>
        <p>✔ Generate payslip</p>
        <p>✔ Advance deduction supported</p>
      </div>

    </div>
  );
}
