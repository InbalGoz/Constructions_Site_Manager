import type { RootState } from "../../app/store";

export const selectAllStageStatuses = (state: RootState) =>
  state.stageStatus.all_stageStatuses;
export const selectAllStageStatusesLoading = (state: RootState) =>
  state.stageStatus.loading;
export const selectAllStageStatusesError = (state: RootState) =>
  state.stageStatus.error;
