import React, { useEffect } from "react";
import styles from "./Jobs.module.css";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import JobCard from "../JobCard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { jobsSelector } from "../../redux/store";
import {
  applyFilter,
  clearFilter,
  fetchJobs,
  setFilters,
  updateFilter,
} from "../../redux/jobSlice";

export default function Jobs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.jobs);

  const handleChangeRole = (val, name, reason, details) => {
    if (reason === "removeOption") {
      dispatch(
        updateFilter({
          name: name,
          value: details?.option,
        })
      );
      dispatch(applyFilter(name));
    } else if (reason === "selectOption") {
      dispatch(
        setFilters({
          name: name,
          value: val,
        })
      );
      dispatch(applyFilter(name));
    } else if (reason === "clear") {
      dispatch(clearFilter({ name: name }));
      dispatch(applyFilter(name));
    }
  };

  const handleCompanyNameChange = (e) => {
    dispatch(
      setFilters({
        name: "Company",
        value: e.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "white",
          p: "25px",
          color: "black",
          display: "flex",
          flexDirection: "column",
          gap: "45px",
        }}
      >
        <Box>
          <Box
            className={styles["hero"]}
            sx={{
              display: "flex",
              gap: "5px",
              flexFlow: "wrap",
              flexGrow: "1",
            }}
          >
            {allFiltersElements.map((ef) => (
              <Autocomplete
                name={ef.tile}
                onChange={(e, val, reason, details) => {
                  handleChangeRole(val, ef.tile, reason, details);
                }}
                multiple={ef.tile !== "Experience"}
                id="tags-outlined"
                options={ef.option}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={ef.tile}
                    placeholder={ef.tile}
                    sx={{ minWidth: "200px" }}
                  />
                )}
                groupBy={(option) => option.category}
              />
            ))}
            <TextField
              onChange={handleCompanyNameChange}
              placeholder="Company name"
              label="Company name"
            />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "wrap",
              gap: "8px",
            }}
          >
            {state.filtering && <Typography>Loading...</Typography>}
            {!state.filtering &&
              state?.filteredJobs.jdList?.map((job, idx) => (
                <JobCard
                  key={idx}
                  jobRole={job.jobRole}
                  company={job.companyName}
                  location={job.location}
                  description={job.jobDetailsFromCompany}
                  minExp={job.minExp}
                  applyLink={job.jdLink}
                  minSalary={job.minJdSalary}
                  maxSalary={job.maxJdSalary}
                  logo={job.logoUrl}
                  salaryCurrencyCode={job.salaryCurrencyCode}
                  min
                />
              ))}
            {state.loading && (
              <Typography sx={{ margin: "0 auto" }}>Loading...</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
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

const allFiltersElements = [
  { tile: "Role", option: roles },
  { tile: "Experience", option: experience },
  { tile: "Remote", option: remote },
];
