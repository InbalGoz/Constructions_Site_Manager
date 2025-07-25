import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Employee, NewEmployee } from "../../models/employee";
import {
  fetchAllEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeeService";

interface SiteStageState {
  all_employees: Employee[];
  selected_employee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: SiteStageState = {
  all_employees: [],
  selected_employee: null,
  loading: false,
  error: null,
};

export const loadAllEmployees = createAsyncThunk(
  "employees/getAllEmployees",
  async () => {
    const employees = await fetchAllEmployees();
    return employees;
  }
);

export const loadAEmployeeById = createAsyncThunk(
  "employees/getEmployee",
  async (employeeId: number) => {
    const employee = await fetchEmployeeById(employeeId);
    return employee;
  }
);

export const createNewEmployeeThunk = createAsyncThunk(
  "employees/createNewSiteStage",
  async (employeeData: NewEmployee) => {
    const newEmployee = await createEmployee(employeeData);
    return newEmployee;
  }
);

export const updateEmployeeThunk = createAsyncThunk(
  "employees/updateEmployee",
  async ({
    employeeId,
    employeeData,
  }: {
    employeeId: number;
    employeeData: Employee;
  }) => {
    const updatedEmployee = await updateEmployee(employeeId, employeeData);
    return updatedEmployee;
  }
);

export const deleteEmployeeThunk = createAsyncThunk(
  "employees/deleteEmployee",
  async ({ employeeId }: { employeeId: number }) => {
    const deletedEmployee = await deleteEmployee(employeeId);
    return deletedEmployee;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL Employee*/
      .addCase(loadAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.all_employees = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Employee";
      }) /*GET employee by id*/
      .addCase(loadAEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.selected_employee = action.payload; // get only the site
        }
      )
      .addCase(loadAEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /*create Employee*/
      .addCase(createNewEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNewEmployeeThunk.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          const createdEmployee = action.payload;
          state.all_employees = [...state.all_employees, createdEmployee];
          state.selected_employee = createdEmployee;
        }
      )
      .addCase(createNewEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Employee";
      }) /*update WorkHours*/
      .addCase(updateEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEmployeeThunk.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          const updatedEmployee = action.payload;
          state.all_employees = state.all_employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
          );
          state.selected_employee = updatedEmployee;
        }
      )
      .addCase(updateEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Employee";
      }) /*delete ALLWorkHours*/
      .addCase(deleteEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEmployeeThunk.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          const deletedEmployeeId = action.payload.id;
          state.all_employees = state.all_employees.filter(
            (employee) => employee.id !== deletedEmployeeId
          );
          if (state.selected_employee?.id === deletedEmployeeId) {
            state.selected_employee = null;
          }
        }
      )
      .addCase(deleteEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Employee";
      });
  },
});

export default employeesSlice.reducer;
