import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../api";

export default function AdvancePage() {

  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Load employees
  useEffect(() => {
    axios.get(`${BASE_URL}/employees`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const add = async () => {

    if (!empId || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/advance`, {
        employeeId: Number(empId),   // 🔥 important
        amount: Number(amount),      // 🔥 important
        date
      });

      alert("Advance Added ✅");

      // reset fields
      setAmount("");
      setDate("");

    } catch (err) {
      console.error(err);
      alert("Error adding advance ❌");
    }
  };

  return (
    <div className="card">

      <h2>Advance Payment</h2>

      <select onChange={e => setEmpId(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button className="btn blue" onClick={add}>
        Add Advance
      </button>

    </div>
  );
}
