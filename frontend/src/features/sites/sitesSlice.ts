import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Site, SiteStatus } from "../../models/site";
import {
  fetchAllSites,
  fetchSiteById,
  createSite,
  updateSite,
  deleteSite,
  fetchAllSiteStatuses,
} from "./sitesService";
import { toast } from "sonner";

interface SitesState {
  all_sites: Site[];
  selected_site: Site | null;
  siteStatuses: SiteStatus[];
  loading: boolean;
  error: string | null;
}

const initialState: SitesState = {
  all_sites: [],
  selected_site: null,
  siteStatuses: [],
  loading: false,
  error: null,
};
/*
try {
  const res = await createSite(data);
  const site = resService.handleSuccess<Site>(res, "האתר נוצר בהצלחה");
} catch (err) {
  resService.handleErr(err as Res);
}
*/
//"sites/getAllSites" - שם מזהה ל action
export const loadAllSites = createAsyncThunk("sites/getAllSites", async () => {
  const sites = await fetchAllSites();
  return sites; // TypeScript יגדיר את payload כ־Site[] אוטומטית
});

export const getSiteStatuses = createAsyncThunk(
  "site/getSiteStatuses",
  async () => {
    const siteStatuses = await fetchAllSiteStatuses();
    return siteStatuses;
  }
);

export const loadSiteById = createAsyncThunk(
  "sites/getSiteById",
  async (siteId: number) => {
    const site = await fetchSiteById(siteId);
    return site;
  }
);

export const createNewSite = createAsyncThunk(
  "sites/createNewSite",
  async (siteData: Site) => {
    console.log(siteData);
    const newSite = await createSite(siteData);
    return newSite;
  }
);

export const updateSiteThunk = createAsyncThunk(
  "sites/updateSite",
  async ({ siteId, siteData }: { siteId: string; siteData: Site }) => {
    const updatedSite = await updateSite(siteId, siteData);
    return updatedSite;
  }
);

export const deleteSiteThunk = createAsyncThunk(
  "sites/deleteSite",
  async (siteId: string) => {
    const deletedSite = await deleteSite(siteId);
    return deletedSite;
  }
);

const sitesSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL SITES */
      .addCase(loadAllSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllSites.fulfilled,
        (state, action: PayloadAction<Site[]>) => {
          console.log(action.payload);
          state.all_sites = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sites";
        toast.error("שגיאה בטעינת האתרים");
      }) /* */
      .addCase(getSiteStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSiteStatuses.fulfilled,
        (state, action: PayloadAction<SiteStatus[]>) => {
          console.log(action.payload);
          state.siteStatuses = action.payload;
          state.loading = false;
        }
      )
      .addCase(getSiteStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sites_statuses";
        toast.error("שגיאה בטעינת הסטטוסים");
      })
      /*GET SITE */
      .addCase(loadSiteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSiteById.fulfilled, (state, action: PayloadAction<Site>) => {
        state.loading = false;
        state.selected_site = action.payload; // get only the site
      })
      .addCase(loadSiteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /*CREATE SITE */
      .addCase(createNewSite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNewSite.fulfilled,
        (state, action: PayloadAction<Site>) => {
          state.loading = false;
          const createdSite = action.payload;
          state.all_sites = [...state.all_sites, createdSite];
          state.selected_site = createdSite;
        }
      )
      .addCase(createNewSite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("שגיאה בהוספת האתר");
      })
      /*UPDATE SITE */
      .addCase(updateSiteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSiteThunk.fulfilled,
        (state, action: PayloadAction<Site>) => {
          state.loading = false;
          const updatedSite = action.payload;
          state.all_sites = state.all_sites.map((site) =>
            site.id === updatedSite.id ? updatedSite : site
          );
          state.selected_site = updatedSite;
        }
      )
      .addCase(updateSiteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("שגיאה בעדכון האתר");
      })
      /*DELETE SITE */
      .addCase(deleteSiteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSiteThunk.fulfilled,
        (state, action: PayloadAction<Site>) => {
          state.loading = false;
          const deletedSiteId = action.payload.id;
          state.all_sites = state.all_sites.filter(
            (site) => site.id !== deletedSiteId
          );
          if (state.selected_site?.id === deletedSiteId) {
            state.selected_site = null;
          }
        }
      )
      .addCase(deleteSiteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("שגיאה במחיקת האתר");
      });
  },
});

export default sitesSlice.reducer;
