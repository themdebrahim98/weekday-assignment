export function getFilterData(state) {
  const filteredData = state.jobs.filter((job) => {
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
      job.minExp >= state.filters["Experience"].value ||
      job.minExp === null; // if minimum experience is null

    // Check if the job matches the remote or hybrid or in-office
    let remoteCheck =
      !state.filters["Remote"] ||
      state.filters["Remote"].length === 0 ||
      state.filters["Remote"].some(
        (remoteFilter) => job?.location === remoteFilter.value
      );

    const minimum_Base_Salary =
      !state.filters["Minimum_Base_Salary"] ||
      state.filters["Minimum_Base_Salary"].length === 0 ||
      state.filters["Minimum_Base_Salary"].value <= job.minJdSalary;

    const companyNameCheck =
      !state.filters["Company"] ||
      job.companyName
        .toLowerCase()
        .includes(state.filters["Company"].toLowerCase());

    return (
      roleCheck &&
      experienceCheck &&
      remoteCheck &&
      companyNameCheck &&
      minimum_Base_Salary
    );
  });

  return filteredData;
}

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const roles = [
  { title: "frontend", value: "frontend", category: "Engineering" },
  { title: "backend", value: "backend", category: "Engineering" },
  { title: "ios", category: "Engineering", value: "ios" },
  { title: "techlead", category: "Engineering", value: "tech lead" },
  { title: "Android", category: "Engineering", value: "android" },

  { title: "priductmanager", category: "Product", value: "priductmanager" },
  { title: "Design manager", category: "Design", value: "designmanager" },
  { title: "designer", category: "Design", value: "designer" },
];

const remote = [
  { title: "Remote", value: "remote" },
  { title: "In-office", value: "inoffice" },
  { title: "Hybrid", value: "hybrid" },
];

const experience = [
  { title: "1", value: 1 },
  { title: "2", value: 2 },
  { title: "3", value: 3 },
  { title: "4", value: 4 },

  //   { title: "15", value: 15 },
];

const salary = [
  { title: "25L", value: 25 },
  { title: "55L", value: 55 },
  { title: "78L", value: 78 },
];
export const allFiltersElements = [
  { tile: "Role", option: roles, isMultiple: true },
  { tile: "Remote", option: remote, isMultiple: true },
  { tile: "Minimum_Base_Salary", option: salary, isMultiple: false },
  { tile: "Experience", option: experience, isMultiple: false },
];
