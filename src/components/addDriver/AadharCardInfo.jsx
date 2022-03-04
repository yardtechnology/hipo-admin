import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  InputAdornment,
  CardHeader,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done, Email, Send } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";

const AadharCardInfo = ({ handelNext, handleBack }) => {
  const initialValues = {
    aadharCardNumber: "",
  };
  const validationSchema = {
    aadharCardNumber: Yup.number().required("Aadhar Card Number is Required"),
  };
  const handleAadharCardInfo = async (values, submitProps) => {
    try {
      console.log(values);
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
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
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload width={"100%"} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AadharUpload width={"100%"} />
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleAadharCardInfo}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"aadharCardNumber"}>
                {(props) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={"Enter your Aadhar Card Number"}
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
                className=" btn-background"
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid}
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

export default AadharCardInfo;
