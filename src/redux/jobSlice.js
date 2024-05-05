import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilterData } from "../util";

// asynchronous thunk to fetch jobs
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });
    console.log("SC");
    const response = await axios.post(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      body,
      config
    );
    return response.data; // Assuming the response contains an array of jobs
  } catch (error) {
    throw Error("Failed to fetch jobs"); // Throw an error if fetching fails
  }
});

const initialState = {
  jobs: [],
  loading: false,
  error: "",
  filters: {},
  filteredJobs: [], // New field to store filtered jobs locally
  filtering: false, // New field to indicate if filtering is in progress.
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      };
      state.filtering = true;
    },

    applyFilter: (state, action) => {
      const filteredData = getFilterData(state);
      state.filteredJobs = {
        jdList: filteredData,
      };
      state.filtering = false;
    },

    updateFilter: (state, action) => {
      const category = action.payload.name;
      const value = action.payload.value;
      //finding category from filters and update category
      state.filters[category] = state.filters[category].filter(
        (elm) => elm.value !== value.value
      );
      // if (state.filters[category].length == 0) {
      //   delete state.filters[category];
      // }
    },

    clearFilter: (state, action) => {
      const category = action.payload.name;
      delete state.filters[category];
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
        state.jobs = action.payload;
        state.filteredJobs = action.payload; // Set filteredJobs initially with all jobs
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, updateFilter, clearFilter, applyFilter } =
  jobSlice.actions;

export default jobSlice.reducer;
