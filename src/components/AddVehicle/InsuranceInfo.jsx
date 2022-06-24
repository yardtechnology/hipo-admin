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
import { UPLOADINSURANCE } from "assets";
import moment from "moment";
const InsuranceInfo = ({ handleNext, handleBack }) => {
  const { insuranceInfo, setInsuranceInfo } = useAppContext();
  const [value, setValue] = useState(insuranceInfo?.insuranceImage);
  const initialValues = {
    insuranceNumber: "",
    validTill: "",
  };
  const validationSchema = {
    insuranceNumber: Yup.number().required("Insurance Number is Required"),
    validTill: Yup.string().test(
      "validTill",
      "Insurance Expiry Date Must Be Today or After",
      (value) => {
        return moment(value).isSameOrAfter(
          moment(new Date().toISOString().split("T")[0])
        );
      }
    ),
  };
  const handleAadharCardInfo = async (values, submitProps) => {
    try {
      setInsuranceInfo({ ...values, insuranceImage: value });
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
            value={value || UPLOADINSURANCE}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          insuranceInfo?.insuranceNumber
            ? {
                insuranceNumber: insuranceInfo?.insuranceNumber,
                validTill: insuranceInfo?.validTill,
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleAadharCardInfo}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"insuranceNumber"}>
                {(props) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={"Enter Insurance Number"}
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(props.meta.touched && props.meta.error)}
                    helperText={props.meta.touched && props.meta.error}
                    required
                    {...props.field}
                  />
                )}
              </Field>
              <Field name={"validTill"}>
                {(props) => (
                  <TextField
                    required
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    label={"Enter Insurance Expiry Date"}
                    type={"date"}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
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

export default InsuranceInfo;
