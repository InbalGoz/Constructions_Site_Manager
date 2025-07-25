import type { RootState } from "../../app/store";

export const selectAllStages = (state: RootState) => state.stages.all_stages;
export const selectAllStagesLoading = (state: RootState) =>
  state.stages.loading;
export const selectAllStagesError = (state: RootState) => state.stages.error;
