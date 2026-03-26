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
      .catch(err => console.error(err));
  }, []);

  const mark = async (status) => {

    if (!empId) {
      alert("Select employee");
      return;
    }

    if (!date) {
      alert("Select date");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/attendance`, {
        employeeId: Number(empId),
        date,
        status
      });

      alert(`Marked ${status} ✅`);

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="card">

      <h2>Mark Attendance</h2>

      {/* 🔥 FORM GRID */}
      <div className="date-grid">

        <div className="input-group">
          <label>Select Employee</label>
          <select onChange={e => setEmpId(e.target.value)}>
            <option value="">Select Employee</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Select Date</label>
          <input
            type="date"
            onChange={e => setDate(e.target.value)}
          />
        </div>

      </div>

      {/* 🔥 BUTTON GRID */}
      <div className="grid grid-2" style={{ marginTop: "15px" }}>

        <button className="btn green" onClick={() => mark("FULL")}>
          Full Day
        </button>

        <button className="btn yellow" onClick={() => mark("HALF")}>
          Half Day
        </button>

        <button className="btn red" onClick={() => mark("ABSENT")}>
          Absent
        </button>

      </div>

      {/* 🔥 INFO SECTION (FILL EMPTY SPACE) */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Quick Info</h3>
        <p>✔ Full Day = 100% salary</p>
        <p>✔ Half Day = 50% salary</p>
        <p>✔ Absent = 0 salary</p>
      </div>

    </div>
  );
}
