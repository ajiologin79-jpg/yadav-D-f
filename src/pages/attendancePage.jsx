import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BASE_URL from "../api/api";

export default function AttendancePage() {

  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [employee, setEmployee] = useState(null);

  const [attendance, setAttendance] = useState([]);
  const [advances, setAdvances] = useState([]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Load employees
  useEffect(() => {
    axios.get(`${BASE_URL}/employees`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const loadData = async (id) => {

    const emp = employees.find(e => e.id === Number(id));
    setEmployee(emp);

    try {
      const att = await axios.get(`${BASE_URL}/attendance/${id}`);
      setAttendance(att.data);

      const adv = await axios.get(`${BASE_URL}/advance/${id}`);
      setAdvances(adv.data);

    } catch (err) {
      console.error(err);
      alert("Error loading data ❌");
    }
  };

  const downloadPDF = () => {

    if (!empId || !start || !end) {
      alert("Select employee and date range");
      return;
    }

    const result = calculate();
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Salary Slip", 14, 20);

    doc.setFontSize(12);
    doc.text(`Employee: ${employee.name}`, 14, 30);
    doc.text(`Period: ${start} to ${end}`, 14, 36);

    // 🔥 ATTENDANCE TABLE (handles multi-page automatically)
    autoTable(doc, {
      startY: 45,
      head: [["Date", "Status", "Amount"]],
      body: result.rows.map(r => [r.date, r.status, r.amount])
    });

    // 🔥 ALWAYS GET FINAL POSITION FROM LAST PAGE
    let y = doc.lastAutoTable.finalY;

    // 🔥 ADVANCE TABLE
    if (result.advances.length > 0) {

      // If not enough space → go to new page
      if (y + 20 > doc.internal.pageSize.height) {
        doc.addPage();
        y = 20;
      }

      doc.text("Advance Details", 14, y + 10);

      autoTable(doc, {
        startY: y + 15,
        head: [["Date", "Amount"]],
        body: result.advances.map(a => [a.date, a.amount])
      });

      // 🔥 again get correct final Y
      y = doc.lastAutoTable.finalY;
    }

    // 🔥 FINAL SUMMARY (CRITICAL FIX)

    // Always ensure space
    if (y + 30 > doc.internal.pageSize.height) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.text(`Total Earnings: Rs. ${result.total}`, 14, y + 10);
    doc.text(`Advance Deduction: Rs. ${result.advTotal}`, 14, y + 16);

    doc.setFontSize(14);
    doc.text(`Final Salary: Rs. ${result.final}`, 14, y + 26);

    doc.save("SalarySlip.pdf");
  };


  return (
    <div className="card">
      <h2>Download Payslip</h2>

      <select onChange={(e) => {
        setEmpId(e.target.value);
        loadData(e.target.value);
      }}>
        <option value="">Select Employee</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>

      <input type="date" onChange={e => setStart(e.target.value)} />
      <input type="date" onChange={e => setEnd(e.target.value)} />

      <button className="btn blue" onClick={downloadPDF}>
        Download Payslip
      </button>
    </div>
  );
}
