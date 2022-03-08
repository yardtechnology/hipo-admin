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
  AadharCardInfo,
  BankAccountInfo,
  BasicDetails,
  DrivingLicense,
} from "components/addDriver";
const steps = [
  "Add Basic Details",
  "Add Aadhar card Info",
  "Add Driving License Info",
  "Add Account Info",
];
const AddNewDriver = ({ open, setOpenAddPaymentsDrawer }) => {
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
        return <BasicDetails handleNext={handleNext} />;
      case 1:
        return (
          <AadharCardInfo handleNext={handleNext} handleBack={handleBack} />
        );
      case 2:
        return (
          <DrivingLicense handleNext={handleNext} handleBack={handleBack} />
        );
      case 3:
        return (
          <BankAccountInfo handleBack={handleBack} handleReset={handleReset} />
        );
      // case 4:
      //   return <HotelPhoto handleNext={handleNext} handleBack={handleBack} />;
      // case 5:
      //   return <HotelFeature handleNext={handleNext} handleBack={handleBack} />;

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
              Add New Driver Information
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

export default AddNewDriver;
