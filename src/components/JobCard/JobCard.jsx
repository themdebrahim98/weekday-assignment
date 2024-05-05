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
      sx={{
        maxWidth: 345,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Avatar src={logo} />
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{ color: "#333" }}
          >
            {jobRole}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {company} - {location}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Estimated salary:{salaryCurrencyCode} {minSalary} lpa to {maxSalary}{" "}
          lpa
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description.length > 100 && !expanded
            ? description.substring(0, 100) + "..."
            : description}
          {description.length > 100 && (
            <Button onClick={handleExpandClick} size="small" sx={{ ml: 1 }}>
              {expanded ? "Read less" : "Read more"}
            </Button>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Experience Required: {minExp}
        </Typography>
        <Button variant="contained" color="primary">
          <a href={applyLink}>Apply</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
