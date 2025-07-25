import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity: "success" | "error" }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
