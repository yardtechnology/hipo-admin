import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StatementInvoice = () => {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/">
          Over All Ride Statement
        </Link>
        <Typography color="text.primary">Ride Details</Typography>
      </Breadcrumbs>
    </>
  );
};

export default StatementInvoice;
