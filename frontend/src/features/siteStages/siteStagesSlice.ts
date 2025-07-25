import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SiteStage } from "../../models/siteStage";
import {
  fetchAllSiteStage,
  createSiteStage,
  updateSiteStage,
  deleteSiteStage,
} from "./siteStagesService";

interface SiteStageState {
  all_siteStage: SiteStage[];
  cur_siteStage: SiteStage | null;
  loading: boolean;
  error: string | null;
}

const initialState: SiteStageState = {
  all_siteStage: [],
  cur_siteStage: null,
  loading: false,
  error: null,
};

export const loadAllSiteStages = createAsyncThunk(
  "siteStages/getAllSiteStages",
  async (siteId: number) => {
    const sites = await fetchAllSiteStage(siteId);
    return sites; // TypeScript יגדיר את payload כ־Site[] אוטומטית
  }
);

export const createNewSiteStage = createAsyncThunk(
  "siteStages/createNewSiteStage",
  async (siteStageData: SiteStage) => {
    const newSiteStage = await createSiteStage(siteStageData);
    return newSiteStage;
  }
);

export const updateSiteStageThunk = createAsyncThunk(
  "siteStages/updateSiteStage",
  async ({
    // siteId,
    // siteStageId,
    siteStageData,
  }: {
    // siteId: number;
    // siteStageId: number;
    siteStageData: SiteStage;
  }) => {
    const updatedSite = await updateSiteStage(
      // siteId,
      // siteStageId,
      siteStageData
    );
    return updatedSite;
  }
);

export const deleteSiteStageThunk = createAsyncThunk(
  "siteStages/deleteSiteStage",
  async ({ siteId, siteStageId }: { siteId: number; siteStageId: number }) => {
    console.log("hekkp del slice");
    const deletedSite = await deleteSiteStage(siteId, siteStageId);
    return deletedSite;
  }
);

const siteStagesSlice = createSlice({
  name: "siteStages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL SITES Stages*/
      .addCase(loadAllSiteStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllSiteStages.fulfilled,
        (state, action: PayloadAction<SiteStage[]>) => {
          state.all_siteStage = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllSiteStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch siteStage";
      });
  },
});

export default siteStagesSlice.reducer;
