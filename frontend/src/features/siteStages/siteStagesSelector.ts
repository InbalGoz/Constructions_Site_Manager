import type { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";
import type { SiteStage } from "../../models/siteStage";

export const selectAllSitesStages = (state: RootState) =>
  state.siteStages.all_siteStage;
export const selectAllSitesStagesLoading = (state: RootState) =>
  state.siteStages.loading;
export const selectAllSitesStagesError = (state: RootState) =>
  state.siteStages.error;
/*GET THE SITESTAGES BY A SITEID*/
export const selectSiteStagesBySiteId = (curSiteId: number) =>
  createSelector([selectAllSitesStages], (siteStages) =>
    siteStages.filter((stage) => stage.siteId === curSiteId)
  );
