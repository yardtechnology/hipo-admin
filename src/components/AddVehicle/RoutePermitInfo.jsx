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
import { UPLOADRP } from "assets";

const RoutePermitInfo = ({ handleReset, handleBack, handleNext }) => {
  const { permitInfo, setPermitInfo } = useAppContext();
  const [value, setValue] = useState(permitInfo?.permitImage);
  const initialValues = {
    permitNumber: "",
    validTill: "",
  };
  const validationSchema = {
    permitNumber: Yup.number().required("Permit Number is Required"),
    validTill: Yup.string().test(
      "validTill",
      "Route Permit Expiry Date Must Be Today or After",
      (value) => {
        return moment(value).isSameOrAfter(
          moment(new Date().toISOString().split("T")[0])
        );
      }
    ),
  };
  const handleRoutePermitInfo = async (values, submitProps) => {
    try {
      setPermitInfo({ ...values, permitImage: value });
      console.log(values);
      handleNext();
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
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
            value={value || UPLOADRP}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          permitInfo?.permitNumber
            ? {
                permitNumber: permitInfo?.permitNumber,
                validTill: permitInfo?.validTill,
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleRoutePermitInfo}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"permitNumber"}>
                {(props) => (
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                    label={"Enter Route Permit Number"}
                    type={"number"}
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
                    label={"Enter Route Permit Expiry Date"}
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

export default RoutePermitInfo;
