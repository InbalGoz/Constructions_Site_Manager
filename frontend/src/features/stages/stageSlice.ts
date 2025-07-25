import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Stage } from "../../models/stage";
import { fetchAllStages } from "./stageService";

interface StagesState {
  all_stages: Stage[];
  //selected_site: Stage | null;
  loading: boolean;
  error: string | null;
}

const initialState: StagesState = {
  all_stages: [],
  //selected_site: null,
  loading: false,
  error: null,
};

export const loadAllStages = createAsyncThunk(
  "stages/getAllStages",
  async () => {
    const stages = await fetchAllStages();
    return stages;
  }
);

const stagesSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL STAGES */
      .addCase(loadAllStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllStages.fulfilled,
        (state, action: PayloadAction<Stage[]>) => {
          state.all_stages = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stages";
      });
  },
});

export default stagesSlice.reducer;
