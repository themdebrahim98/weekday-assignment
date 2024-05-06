import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";

const JobCard = ({
  jobRole,
  company,
  location,
  description,
  applyLink,
  minSalary,
  maxSalary,
  logo,
  salaryCurrencyCode,
  minExp,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        maxWidth: 345,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Box flex alignItems={"center"} gap={10} flexDirection={"column"}>
          <Avatar src={logo} />
          <div>
            {company && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {company}
              </Typography>
            )}
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h1"
              style={{ color: "#333" }}
            >
              {jobRole}
            </Typography>
          </div>
        </Box>

        {location && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {location}
          </Typography>
        )}
        {(minSalary !== null || maxSalary !== null) && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Estimated salary: {salaryCurrencyCode} {minSalary ?? "-"} lpa to{" "}
            {maxSalary ?? "-"} lpa
          </Typography>
        )}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: 8 }}
          >
            {description.length > 100 && !expanded
              ? description.substring(0, 100) + "..."
              : description}
            {description.length > 100 && (
              <Button
                onClick={handleExpandClick}
                size="small"
                style={{
                  marginLeft: 4,
                  color: "#007bff",
                  textTransform: "none",
                }}
              >
                {expanded ? "Read less" : "Read more"}
              </Button>
            )}
          </Typography>
        )}
        {minExp !== null && (
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: 4 }}
          >
            Experience Required: {minExp}
          </Typography>
        )}
        {applyLink && (
          <Button variant="contained" color="primary" fullWidth>
            <a
              href={applyLink}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Apply
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
