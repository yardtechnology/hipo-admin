import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import React, { Fragment } from "react";
import { AddDriverSchema } from "schemas";
import { Done } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { PhotoUpload } from "components/core";
import { useState } from "react";
import { AadharCardInfo, BasicDetails } from "components/addDriver";
const steps = [
  "Add Basic Details",
  "Add Aadhar card Info",
  "Add Driving License Info",
  "Add Account Info",
];
const AddNewDriver = ({ open, setOpenAddPaymentsDrawer }) => {
  const [value, setValue] = useState({});
  console.log(value);
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  const initialValues = AddDriverSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = AddDriverSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSend = async (values, submitProps) => {
    try {
      console.log(values);
      submitProps.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
      // case 2:
      //   return (
      //     <HotelMapLocation handleNext={handleNext} handleBack={handleBack} />
      //   );
      // case 3:
      //   return <RoomCategory handleBack={handleBack} />;
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
