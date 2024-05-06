import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilterData } from "../util";

// asynchronous thunk to fetch jobs
export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (_, thunkAPI) => {
    try {
      const pageOffSet = thunkAPI.getState().jobs.pageOffSet;
      const limit = 25;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        limit: limit,
        offset: pageOffSet,
      });

      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        body,
        config
      );
      // Dispatch the setPageOffset action to update the pageOffset in the Redux store
      thunkAPI.dispatch(setPageOffset(limit + pageOffSet));

      return response.data; // Assuming the response contains an array of jobs
    } catch (error) {
      throw Error("Failed to fetch jobs"); // Throw an error if fetching fails
    }
  }
);

const initialState = {
  jobs: [],
  loading: false,
  error: "",
  filters: {},
  filteredJobs: [],
  filtering: false,
  pageOffSet: 0,
  totalCount: 0,
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setPageOffset: (state, action) => {
      state.pageOffSet = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      };
      state.filtering = true;
    },

    applyFilter: (state) => {
      const filteredData = getFilterData(state);
      state.filteredJobs = filteredData;
      state.filtering = false;
    },

    updateFilter: (state, action) => {
      state.filtering = true;
      const category = action.payload.name;
      const value = action.payload.value;
      state.filters[category] = state.filters[category].filter(
        (elm) => elm.value !== value.value
      );
    },

    clearFilter: (state, action) => {
      const category = action.payload.name;
      delete state.filters[category];
      state.filtering = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        const jobsList = action.payload.jdList;

        state.jobs = [...state.jobs, ...jobsList];
        state.filteredJobs = [...state.jobs];
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilters,
  updateFilter,
  clearFilter,
  applyFilter,
  setPageOffset,
} = jobSlice.actions;

export default jobSlice.reducer;
