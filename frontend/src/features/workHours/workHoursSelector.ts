import type { RootState } from "../../app/store";

export const selectAllWorkHours = (state: RootState) =>
  state.workHours.all_workHours;
export const selectWorkHoursLoading = (state: RootState) =>
  state.workHours.loading;
export const selectWorkHoursError = (state: RootState) => state.workHours.error;
export const selectAllFilterWorkHours = (state: RootState) =>
  state.workHours.all_filteredWorkHours;
