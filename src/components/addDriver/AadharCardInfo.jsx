import { Field, Form, Formik } from "formik";
import {
  CardActions,
  Button,
  Grid,
  CardContent,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useAppContext } from "contexts";
import { useState } from "react";
import { BACK, FRONT } from "assets";
import * as Yup from "yup";
const AadharCardInfo = ({ handleNext, handleBack }) => {
  const { aadharCardInfo, setAadharCardInfo } = useAppContext();
  const [value, setValue] = useState(aadharCardInfo?.imgFile);
  const [value1, setValue1] = useState(aadharCardInfo?.imgFile1);
  const initialValues = {
    aadharCardNumber: "",
  };
  const validationSchema = {
    aadharCardNumber: Yup.string()
      .required("Aadhar Card Number is Required")
      .test(
        "aadharCardNumber",
        "Aadhar Card Number Not More Than 12 Digits",
        (value) => {
          return value?.length === 12;
        }
      ),
  };
  const handleAadharCardInfo = async (values, submitProps) => {
    try {
      setAadharCardInfo({ imgFile: value, imgFile1: value1, ...values });
      // console.log(values);
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
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={value || FRONT}
            onChange={setValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AadharUpload
            width={"100%"}
            value={value1 || BACK}
            onChange={setValue1}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          aadharCardInfo?.aadharCardNumber
            ? { aadharCardNumber: aadharCardInfo?.aadharCardNumber }
            : initialValues
        }
        enableReinitialize
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
                    label={"Enter Your Aadhar Card Number"}
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
                disabled={!value || !value1 || !isValid || isSubmitting}
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
