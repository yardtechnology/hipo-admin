import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useAppContext } from "contexts";
import { useState } from "react";
import { UPLOADPUC } from "assets";
import { BASE_URL } from "configs";

const PUCInfo = ({ handleReset, handleBack }) => {
  const {
    pucInfo,
    setPucInfo,
    setVehicleBasicDetails,
    setRCInfo,
    setInsuranceInfo,
    setFitnessInfo,
    setPermitInfo,
    insuranceInfo,
    vehicleBasicDetails,
    fitnessInfo,
    permitInfo,
    RCInfo,
  } = useAppContext();
  const [value, setValue] = useState(pucInfo?.pucImage);
  const initialValues = {
    pucNumber: "",
    validTill: "",
  };
  const validationSchema = {
    pucNumber: Yup.number().required("PUC Number is Required"),
    validTill: Yup.string().test(
      "validTill",
      "PUC Expiry Date Must Be Today or After",
      (value) => {
        return moment(value).isSameOrAfter(
          moment(new Date().toISOString().split("T")[0])
        );
      }
    ),
  };
  const handlePUCInfo = async (values, submitProps) => {
    const formdata = new FormData();
    formdata.append("vehicleType", vehicleBasicDetails?.vehicleType);
    formdata.append("vehicleNumber", vehicleBasicDetails?.vehicleNumber);
    formdata.append("make", vehicleBasicDetails?.vehicleMaker);
    formdata.append("model", vehicleBasicDetails?.vehicleModel);
    formdata.append("rc", RCInfo?.RCImage?.target.files[0]);
    formdata.append("rcNumber", RCInfo?.RCNumber);
    formdata.append("rcExpiry", RCInfo?.validTill);
    formdata.append(
      "insurance",
      insuranceInfo?.insuranceImage?.target.files[0]
    );
    formdata.append("insuranceExpiry", insuranceInfo?.validTill);
    formdata.append("insuranceNumber", insuranceInfo?.insuranceNumber);
    formdata.append("pollution", value?.target.files[0]);
    formdata.append("pollutionExpiry", values?.validTill);
    formdata.append("pollutionNumber", values?.pucNumber);
    formdata.append("fitness", fitnessInfo?.fitnessImage?.target.files[0]);
    formdata.append("fitnessExpiry", fitnessInfo?.validTill);
    formdata.append("fitnessNumber", fitnessInfo?.fitnessNumber);
    formdata.append("routePermit", permitInfo?.permitImage?.target.files[0]);
    formdata.append("routePermitExpiry", permitInfo?.validTill);
    formdata.append("routePermitNumber", permitInfo?.permitNumber);
    try {
      const response = await fetch(`${BASE_URL}/vehicle`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: formdata,
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire({ icon: "success", text: "Vehicle added successfully" })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      console.log(values);
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setVehicleBasicDetails();
      setInsuranceInfo();
      setRCInfo();
      setFitnessInfo();
      setPermitInfo();
      setPucInfo();
      submitProps.setSubmitting(false);
      handleReset();
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
            value={value || UPLOADPUC}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          pucInfo?.pucNumber ? { pucNumber: pucInfo?.pucNumber } : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handlePUCInfo}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"pucNumber"}>
                {(props) => (
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                    label={"Enter PUC Number"}
                    required
                    error={Boolean(props.meta.touched && props.meta.error)}
                    helperText={props.meta.touched && props.meta.error}
                    {...props.field}
                  />
                )}
              </Field>
              <Field name={"validTill"}>
                {(props) => (
                  <TextField
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                    margin="normal"
                    required
                    label={"Enter PUC Expiry Date"}
                    type={"date"}
                    error={Boolean(props.meta.touched && props.meta.error)}
                    helperText={props.meta.touched && props.meta.error}
                    {...props.field}
                    InputLabelProps={{
                      shrink: true,
                    }}
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

export default PUCInfo;
