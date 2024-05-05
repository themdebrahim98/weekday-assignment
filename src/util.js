export function getFilterData(state) {
  const filteredData = state.jobs.jdList.filter((job) => {
    // Check if the job matches at least one role filter
    let roleCheck =
      !state.filters["Role"] ||
      state.filters["Role"].length === 0 ||
      state.filters["Role"].some(
        (roleFilter) => job.jobRole === roleFilter.value
      );

    // Check if the job matches the minimum experience
    let experienceCheck =
      !state.filters["Experience"] ||
      state.filters["Experience"].length === 0 ||
      job.minExp >= state.filters["Experience"].value;

    // Check if the job matches the remote or hybrid or in-office
    let remoteCheck =
      !state.filters["Remote"] ||
      state.filters["Remote"].length === 0 ||
      state.filters["Remote"].some(
        (remoteFilter) => job?.location === remoteFilter.value
      );

    return roleCheck && experienceCheck && remoteCheck;
  });

  return filteredData;
}
