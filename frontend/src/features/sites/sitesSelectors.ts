import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectAllSites = (state: RootState) => state.sites.all_sites;
export const selectAllSitesStatuses = (state: RootState) =>
  state.sites.siteStatuses;
export const selectAllSitesLoading = (state: RootState) => state.sites.loading;
export const selectAllSitesError = (state: RootState) => state.sites.error;
export const selectSelectedSite = (state: RootState) =>
  state.sites.selected_site;

//export const selectSitesByStatus = (state: RootState) =>
//state.sites.all_sites.filter(site => site.statusId === statusId);

export const selectActiveSites = (state: RootState) =>
  state.sites.all_sites.filter((site) => site.statusId === 1);

export const selectCompletedSites = (state: RootState) =>
  state.sites.all_sites.filter((site) => site.statusId === 2);

export const selectInactiveSites = (state: RootState) =>
  state.sites.all_sites.filter((site) => site.statusId === 3);

export const selectSitesStats = (state: RootState) => {
  const sites = state.sites.all_sites;
  return {
    total: sites.length,
    active: sites.filter((s) => s.statusId === 1).length,
    completed: sites.filter((s) => s.statusId === 2).length,
    inactive: sites.filter((s) => s.statusId === 3).length,
    totalBudget: sites.reduce((sum, s) => sum + (s.budget || 0), 0),
    totalActualCost: sites.reduce((sum, s) => sum + (s.actualCost || 0), 0),
  };
};
