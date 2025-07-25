import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WorkHours, NewWorkHour } from "../../models/workHours";
import {
  fetchAllWorkHours,
  fetchFilteredWorkHours,
  createWorkHour,
  updateWorkHour,
  deleteWorkHour,
} from "./workHoursService";

interface SiteStageState {
  all_workHours: WorkHours[];
  all_filteredWorkHours: WorkHours[];
  loading: boolean;
  error: string | null;
}

const initialState: SiteStageState = {
  all_workHours: [],
  all_filteredWorkHours: [],
  loading: false,
  error: null,
};

export const loadAllWorkHours = createAsyncThunk(
  "workHours/getAllWorkHours",
  async () => {
    const workHours = await fetchAllWorkHours();
    return workHours;
  }
);

export const loadAllFilteredWorkHours = createAsyncThunk(
  "workHours/getAllFilteredWorkHours",
  async ({
    siteId,
    employeeId,
    month,
  }: {
    siteId: number;
    employeeId: number;
    month: string;
  }) => {
    const filteredWorkHours = await fetchFilteredWorkHours(
      employeeId,
      siteId,
      month
    );
    return filteredWorkHours;
  }
);

export const createNewWorkHourThunk = createAsyncThunk(
  "workHours/createNewWorkHour",
  async (workHoursData: NewWorkHour) => {
    const newWorkHours = await createWorkHour(workHoursData);
    return newWorkHours;
  }
);

export const updateWorkHourThunk = createAsyncThunk(
  "workHours/updateWorkHour",
  async ({
    workHourId,
    workHourData,
  }: {
    workHourId: number;
    workHourData: WorkHours;
  }) => {
    const updatedWorkHour = await updateWorkHour(workHourId, workHourData);
    return updatedWorkHour;
  }
);

export const deleteWorkHoursThunk = createAsyncThunk(
  "workHours/deleteWorkHour",
  async ({ workHourId }: { workHourId: number }) => {
    const deletedWorkHour = await deleteWorkHour(workHourId);
    return deletedWorkHour;
  }
);

const workHoursSlice = createSlice({
  name: "workHours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALLWorkHours*/
      .addCase(loadAllWorkHours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllWorkHours.fulfilled,
        (state, action: PayloadAction<WorkHours[]>) => {
          state.all_workHours = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllWorkHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch WorkHour";
      }) /*GET ALL filtered WorkHours*/
      .addCase(loadAllFilteredWorkHours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllFilteredWorkHours.fulfilled,
        (state, action: PayloadAction<WorkHours[]>) => {
          state.all_filteredWorkHours = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllFilteredWorkHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch WorkHour";
      }) /*create WorkHours*/
      .addCase(createNewWorkHourThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNewWorkHourThunk.fulfilled,
        (state, action: PayloadAction<WorkHours>) => {
          state.loading = false;
          const createdWorkHour = action.payload;
          state.all_workHours = [...state.all_workHours, createdWorkHour];
        }
      )
      .addCase(createNewWorkHourThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch WorkHour";
      }) /*update WorkHours*/
      .addCase(updateWorkHourThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateWorkHourThunk.fulfilled,
        (state, action: PayloadAction<WorkHours>) => {
          state.loading = false;
          const updatedWorkHour = action.payload;
          state.all_workHours = state.all_workHours.map((wh) =>
            wh.id === updatedWorkHour.id ? updatedWorkHour : wh
          );
        }
      )
      .addCase(updateWorkHourThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch WorkHour";
      }) /*delete ALLWorkHours*/
      .addCase(deleteWorkHoursThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteWorkHoursThunk.fulfilled,
        (state, action: PayloadAction<WorkHours>) => {
          state.loading = false;
          const deletedWorkHourId = action.payload.id;
          state.all_workHours = state.all_workHours.filter(
            (wh) => wh.id !== deletedWorkHourId
          );
        }
      )
      .addCase(deleteWorkHoursThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch WorkHour";
      });
  },
});

export default workHoursSlice.reducer;
