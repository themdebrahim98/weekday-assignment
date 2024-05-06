import React, { useEffect, useRef, useState } from "react";
import styles from "./Jobs.module.css";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import JobCard from "../JobCard/JobCard";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilter,
  clearFilter,
  fetchJobs,
  setFilters,
  updateFilter,
} from "../../redux/jobSlice";
import { allFiltersElements, wait } from "../../util";
import Loader from "../Loader/Loader";

export default function Jobs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.jobs);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleChangeRole = async (val, name, reason, details) => {
    if (reason === "removeOption") {
      dispatch(
        updateFilter({
          name: name,
          value: details?.option,
        })
      );
      await wait(1000);
      dispatch(applyFilter());
    } else if (reason === "selectOption") {
      dispatch(
        setFilters({
          name: name,
          value: val,
        })
      );

      await wait(1000);
      dispatch(applyFilter());
    } else if (reason === "clear") {
      dispatch(clearFilter({ name: name }));
      await wait(1000);
      dispatch(applyFilter(name));
    }
  };

  const handleCompanyNameChange = async (e) => {
    dispatch(
      setFilters({
        name: "Company",
        value: e.target.value,
      })
    );
    await wait(1000);
    dispatch(applyFilter());
  };
  const handleScroll = async () => {
    const container = scrollContainerRef.current;
    if (
      container.clientHeight + container.scrollTop + 250 >=
      container.scrollHeight
    ) {
      // Load more jobs when the user reaches the bottom of the container
      console.log("loading more data....");
      !state.loading && (await dispatch(fetchJobs()));
      dispatch(applyFilter());
    }
  };

  useEffect(() => {
    // Hide main document scrollbar when the component mounts
    document.body.style.overflow = "hidden";

    // Cleanup: Revert back to the default behavior when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  console.log(isAtBottom);
  return (
    <Container maxWidth="xl">
      <Box
        onScroll={handleScroll}
        ref={scrollContainerRef}
        sx={{
          bgcolor: "white",
          color: "black",
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          height: "100vh",
          overflowY: "scroll",
          position: "relative",
          pt: "8px",
        }}
      >
        {/*  Showing loader when filtering or fetching data from server */}
        {state.filtering && <Loader />}
        {state.loading && <Loader />}

        {/* Filters elements */}
        <Box
          className={styles["hero"]}
          sx={{
            display: "flex",
            gap: "5px",
            flexFlow: "wrap",
            zIndex: "50",
            background: "#ddd",
            position: "sticky",
            top: 0,
            p: "0 15px 0 15px",
          }}
        >
          {allFiltersElements.map((ef) => (
            <Autocomplete
              name={ef.tile}
              onChange={(e, val, reason, details) => {
                handleChangeRole(val, ef.tile, reason, details);
              }}
              multiple={ef.isMultiple}
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

        {/* Jobs lists */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minMax(300px, 1fr))",
            gap: "20px",
            p: "0 5px 100px 5px",
          }}
        >
          {!state.filtering &&
            state?.filteredJobs?.map((job, idx) => (
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
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
}
