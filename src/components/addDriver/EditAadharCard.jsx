import { CardActions, CardContent, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { BACK, FRONT } from "assets";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const EditAadharCard = ({ open }) => {
  console.log(open);
  const [value, setValue] = useState(open?.aadharCard?.front?.url);
  const [value1, setValue1] = useState(open?.aadharCard?.back?.url);

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
      // setAadharCardInfo({ ...values, imgFile: value, imgFile1: value1 });
      console.log(values);
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
          p: "2vh 1.5vw 0vh 1.5vw ",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={open?.aadharCard?.front?.url || value || FRONT}
            onChange={setValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AadharUpload
            width={"100%"}
            value={open?.aadharCard?.back?.url || value1 || BACK}
            onChange={setValue1}
          />
        </Grid>
      </Grid>

      <Formik
        initialValues={
          open?.aadharCard
            ? { aadharCardNumber: open?.aadharCard?.number }
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
              <LoadingButton
                className=" btn-background"
                variant="contained"
                type="submit"
                disabled={!value || !value1 || !isValid || isSubmitting}
                loading={isSubmitting}
                loadingPosition="start"
                startIcon={<Done />}
              >
                SAVE
              </LoadingButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditAadharCard;
