import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CardContent, TextField, CardActions, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { UPLOADRC } from "assets";
import moment from "moment";
import { BASE_URL } from "configs";
const EditRC = ({ details, setRealtime, setOpenVehicleDocumentDrawer }) => {
  console.log(details);
  const [value, setValue] = useState(details?.rc?.url);
  const initialValues = {
    rcNumber: "",
    validTill: "",
  };
  const validationSchema = {
    rcNumber: Yup.string().required("Rc Number is Required"),
    validTill: Yup.string().test(
      "validTill",
      "RC Expiry Date Must Be Today or After",
      (value) => {
        return moment(value).isSameOrAfter(
          moment(new Date().toISOString().split("T")[0])
        );
      }
    ),
  };
  const handleEditRc = async (values, submitProps) => {
    console.log(values);
    const formdata = new FormData();
    value !== details?.rc?.url && formdata.append("rc", value?.target.files[0]);
    formdata.append("rcExpiry", values?.validTill);
    formdata.append("rcNumber", values?.rcNumber);

    try {
      console.log(values);
      const response = await fetch(`${BASE_URL}/vehicle/${details?._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: formdata,
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire("Success", "RC Updated", "success")
        : Swal.fire("Error", "RC Not Updated", "error");
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
            value={value || UPLOADRC}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          details?.rc
            ? {
                rcNumber: details?.rc?.number,
                validTill:
                  details?.rc?.expiry &&
                  new Date(details?.rc?.expiry).toISOString().split("T")[0],
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleEditRc}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              <Field name={"rcNumber"}>
                {(props) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={"Enter RC Number"}
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
                    label={"Enter RC Expiry Date"}
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

export default EditRC;
