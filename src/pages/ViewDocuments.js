import { Delete, Edit } from "@mui/icons-material";
import { Card, CardHeader, Grid, IconButton } from "@mui/material";
import React from "react";

const viewDocuments = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Card>
            {" "}
            <CardHeader
              title={"Aadhar Card Info"}
              action={
                <>
                  <IconButton aria-label="settings">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Delete />
                  </IconButton>
                </>
              }
            />
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Card>
            {" "}
            <CardHeader
              title={"Driving License Info"}
              action={
                <>
                  <IconButton aria-label="settings">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Delete />
                  </IconButton>
                </>
              }
            />
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <Card>
            {" "}
            <CardHeader
              title={"Accounts Info"}
              action={
                <>
                  <IconButton aria-label="settings">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Delete />
                  </IconButton>
                </>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default viewDocuments;
