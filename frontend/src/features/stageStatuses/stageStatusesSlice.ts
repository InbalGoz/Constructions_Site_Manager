import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { stageStatuses } from "../../models/stageStatuses";
import { fetchAllstageStatuses } from "./stageStatusesService";

interface StatusState {
  all_stageStatuses: stageStatuses[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  all_stageStatuses: [],
  //selected_site: null,
  loading: false,
  error: null,
};

export const loadAllStageStatuses = createAsyncThunk(
  "stages/getAllStageStatuses",
  async () => {
    const statuses = await fetchAllstageStatuses();
    return statuses;
  }
);

const stageStatusSlice = createSlice({
  name: "stageStatuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL STAGES */
      .addCase(loadAllStageStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllStageStatuses.fulfilled,
        (state, action: PayloadAction<stageStatuses[]>) => {
          state.all_stageStatuses = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllStageStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stageStatuses";
      });
  },
});

export default stageStatusSlice.reducer;
