import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectAllEmployees = (state: RootState) =>
  state.employees.all_employees;
export const selectAllEmployeesLoading = (state: RootState) =>
  state.employees.loading;
export const selectAllEmployeesError = (state: RootState) =>
  state.employees.error;
export const selectSelectedEmployee = (state: RootState) =>
  state.employees.selected_employee;
