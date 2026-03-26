import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from "../api/api";   // ✅ correct import

// Fetch Employees
export const fetchEmployees = createAsyncThunk('emp/fetch', async () => {
  const res = await axios.get(`${BASE_URL}/employees`);   // ✅ FIXED
  return res.data;
});

// Calculate Salary
export const calculateSalary = createAsyncThunk(
  'emp/salary',
  async ({ empId, startDate, endDate }) => {
    const res = await axios.get(
      `${BASE_URL}/salary?empId=${empId}&startDate=${startDate}&endDate=${endDate}`   // ✅ FIXED
    );
    return res.data;
  }
);

const slice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    salary: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(calculateSalary.fulfilled, (state, action) => {
      state.salary = action.payload;
    });
  },
});

export default slice.reducer;
