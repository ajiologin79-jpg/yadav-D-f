import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";

export default function EmployeePage() {

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  // Load employees
  const load = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Add / Update
  const save = async () => {

    if (!name || !salary) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(`${BASE_URL}/employee/${editId}`, {
          name,
          perDaySalary: Number(salary)
        });

        alert("Employee Updated ✅");
        setEditId(null);

      } else {
        // ADD
        await axios.post(`${BASE_URL}/employee`, {
          name,
          perDaySalary: Number(salary)
        });

        alert("Employee Added ✅");
      }

      setName("");
      setSalary("");
      load();

    } catch (err) {
      console.error(err);
      alert("Error saving employee ❌");
    }
  };

  // Delete
  const remove = async (id) => {

    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`${BASE_URL}/employee/${id}`);
      alert("Deleted successfully");
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  // Edit
  const edit = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
    setSalary(emp.perDaySalary);
  };

  return (
    <div className="grid grid-2">

      {/* Form */}
      <div className="card">
        <h2>Add Employee</h2>

        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Per Day Salary" value={salary} onChange={e => setSalary(e.target.value)} />

        <button className="btn blue" onClick={save}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <h2>Employee List</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>Rs. {emp.perDaySalary}</td>
                <td>
                  <button className="btn yellow" onClick={() => edit(emp)}>Edit</button>
                  <button className="btn red" onClick={() => remove(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
