export default function EmployeeDropdown({ employees, setEmpId }) {
  return (
    <select
      className="border p-2 w-full mb-3 rounded"
      onChange={(e) => setEmpId(e.target.value)}
    >
      <option value="">Select Employee</option>
      {employees.map((e) => (
        <option key={e.id} value={e.id}>
          {e.name}
        </option>
      ))}
    </select>
  );
}