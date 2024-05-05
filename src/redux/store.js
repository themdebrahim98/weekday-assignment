import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
});

export const jobsSelector = (state) => state.jobs.jobs;
