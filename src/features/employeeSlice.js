import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../api/api';

export const fetchEmployees = createAsyncThunk('emp/fetch', async () => {
  const res = await axios.get(`${API}/employees`);
  return res.data;
});

export const calculateSalary = createAsyncThunk(
  'emp/salary',
  async ({ empId, startDate, endDate }) => {
    const res = await axios.get(
      `${API}/salary?empId=${empId}&startDate=${startDate}&endDate=${endDate}`
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