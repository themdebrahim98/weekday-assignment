import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Container, FormControl } from "@mui/material";
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

  // When filtering change
  const handleFilterChange = async (val, name, reason, details) => {
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

  // when company name change
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

  // Load more jobs when the user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (clientHeight + scrollTop + 5 >= scrollHeight) {
        // Load more jobs when the user reaches the bottom of the container
        console.log("loading more data....");
        !state.loading && (await dispatch(fetchJobs()));
        dispatch(applyFilter());
      }
    };
    // Add scroll event listener to the document
    document.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // After render this page fetch data from server
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          minHeight: "120vh",
          position: "relative",
          pt: "8px",
        }}
      >
        {/*  Showing loader when filtering or fetching data from server */}
        {state.filtering && <Loader />}
        {state.loading && <Loader />}

        {/* Filters elements */}
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            flexFlow: "wrap",
            zIndex: "50",
            background: "#ffffff",
            position: "sticky",
            top: 0,
            p: "0 15px 0 15px",
          }}
        >
          {allFiltersElements.map((ef, idx) => (
            <Autocomplete
              key={idx}
              name={ef.title}
              onChange={(e, val, reason, details) => {
                handleFilterChange(val, ef.title, reason, details);
              }}
              multiple={ef.isMultiple}
              id={ef.title}
              options={ef.option}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={ef.title}
                  placeholder={ef.title}
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
            p: "0 8px 50px 8px",
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
