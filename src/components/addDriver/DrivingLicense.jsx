import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useAppContext } from "contexts";
import { useState } from "react";
import { DL } from "assets";

const DrivingLicense = ({ handleNext, handleBack }) => {
  const { drivingLicenceInfo, setDrivingLicenceInfo } = useAppContext();
  const [value, setValue] = useState(drivingLicenceInfo?.imgFile);
  const initialValues = {
    drivingLicenceNumber: "",
  };
  const validationSchema = {
    drivingLicenceNumber: Yup.string()
      .required("Driving License Number is Required")
      .min(12, "12 digits required")
      .test(
        "drivingLicenceNumber",
        "Driving License Number Not More Than 12 Digits",
        (value) => {
          return value.length === 12;
        }
      ),
  };
  const handleAadharCardInfo = async (values, submitProps) => {
    try {
      setDrivingLicenceInfo({ ...values, imgFile: value });
      console.log(values);
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      handleNext();
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: "4vh 2vw 0vh 2vw ",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item lg={8} md={8} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={value || DL}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          drivingLicenceInfo?.drivingLicenceNumber
            ? { drivingLicenceNumber: drivingLicenceInfo?.drivingLicenceNumber }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleAadharCardInfo}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"drivingLicenceNumber"}>
                {(props) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={"Enter Your Driving License Number"}
                    type={"number"}
                    error={Boolean(props.meta.touched && props.meta.error)}
                    helperText={props.meta.touched && props.meta.error}
                    {...props.field}
                  />
                )}
              </Field>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleBack}
                style={{ marginRight: ".5rem" }}
              >
                Previous
              </Button>
              <LoadingButton
                className="btn-background"
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid || !value}
                loading={isSubmitting}
                loadingPosition="start"
                startIcon={<Done />}
              >
                Next
              </LoadingButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DrivingLicense;
