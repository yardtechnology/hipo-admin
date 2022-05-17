import {
  Box,
  Card,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import React, { Fragment } from "react";

import {
  InsuranceInfo,
  RCInfo,
  VehicleBasicDetails,
} from "components/AddVehicle";
const steps = [
  "Add Vehicle Basic Details",
  "Add Insurance Info",
  "Add RC Info",
];
const AddNewVehicle = ({ open, setOpenAddPaymentsDrawer }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return <VehicleBasicDetails handleNext={handleNext} />;
      case 1:
        return (
          <InsuranceInfo handleNext={handleNext} handleBack={handleBack} />
        );
      case 2:
        return <RCInfo handleReset={handleReset} handleBack={handleBack} />;
      //   case 3:
      //     return (
      //       <BankAccountInfo handleBack={handleBack} handleReset={handleReset} />
      //     );

      default:
        break;
    }
  };
  return (
    <>
      <Container
        maxWidth="md"
        // style={{
        //   width: "40vw",
        //   marginTop: "12vh",
        // }}
      >
        <Box sx={{ width: "100%" }}>
          <Card sx={{ padding: 4, marginTop: "0vh" }}>
            <Typography
              align="center"
              color="text.primary"
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1877f2" }}
              marginBottom={"6vh"}
            >
              Add New Vehicle Information
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps?.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default AddNewVehicle;
