import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, loginData, AuthPayload } from "../../models/user";
import { loginUser, getCurrentUser } from "./authService";

interface AuthState {
  token: string | null;
  user: User | null;
  curUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  curUser: null,
  loading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk<AuthPayload, loginData>(
  "auth/loginUser",
  async (data: loginData) => {
    const logedUser = await loginUser(data);
    return logedUser;
  }
);

export const restoreSessionThunk = createAsyncThunk<AuthPayload, string>(
  "auth/restoreSession",
  async (token: string) => {
    const currentUser = await getCurrentUser(token);
    return currentUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    //Login user
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(restoreSessionThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        // state.user = action.payload.user;
        state.curUser = action.payload.user;
        state.loading = false;
      })
      .addCase(restoreSessionThunk.rejected, (state) => {
        state.token = null;
        state.curUser = null;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
