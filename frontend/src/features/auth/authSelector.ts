import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectLogedUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;
export const selectAllEmployeesLoading = (state: RootState) =>
  state.auth.loading;
export const selectAllEmployeesError = (state: RootState) => state.auth.error;
