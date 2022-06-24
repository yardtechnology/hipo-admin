import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CardContent, TextField, CardActions, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { UPLOADFITNESS } from "assets";
import moment from "moment";
import { BASE_URL } from "configs";
const EditFitness = ({
  details,
  setRealtime,
  setOpenVehicleDocumentDrawer,
}) => {
  const [value, setValue] = useState(details?.fitness?.url);
  const initialValues = {
    fitnessNumber: "",
    validTill: "",
  };
  const validationSchema = {
    fitnessNumber: Yup.string().required("Fitness Number is Required"),
    validTill: Yup.string().test(
      "validTill",
      "Fitness Expiry Date Must Be Today or After",
      (value) => {
        return moment(value).isSameOrAfter(
          moment(new Date().toISOString().split("T")[0])
        );
      }
    ),
  };
  const handleEditFitness = async (values, submitProps) => {
    const formdata = new FormData();
    value !== details?.fitness?.url &&
      formdata.append("fitness", value?.target.files[0]);
    formdata.append("fitnessExpiry", values?.validTill);
    formdata.append("fitnessNumber", values?.fitnessNumber);

    try {
      const response = await fetch(`${BASE_URL}/vehicle/${details?._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: formdata,
      });
      const res = await response.json();
      res?.status === 200
        ? Swal.fire("Success", "Fitness Info Updated", "success")
        : Swal.fire("Error", "Fitness Not Updated", "error");
      submitProps.resetForm();
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setOpenVehicleDocumentDrawer(false);
      setRealtime((prev) => !prev);
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
            value={value || UPLOADFITNESS}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          details?.fitness
            ? {
                fitnessNumber: details?.fitness?.number,
                validTill:
                  details?.fitness?.expiry &&
                  new Date(details?.fitness?.expiry)
                    .toISOString()
                    .split("T")[0],
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleEditFitness}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"fitnessNumber"}>
                {(props) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={"Enter Fitness Number"}
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
                    label={"Enter Fitness Expiry Date"}
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
              <LoadingButton
                className="btn-background"
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid || !value}
                loading={isSubmitting}
                loadingPosition="start"
                startIcon={<Done />}
              >
                Save
              </LoadingButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditFitness;
