import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectSnackbarState = (state: RootState) => state.snackbarAlerts;

export const selectSnackbarMessage = createSelector(
  selectSnackbarState,
  (snackbar) => snackbar.message
);

export const selectSnackbarOpen = createSelector(
  selectSnackbarState,
  (snackbar) => snackbar.open
);
