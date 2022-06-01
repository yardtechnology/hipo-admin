import {
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Fragment, useState } from "react";
import { useAddDriverSchema } from "schemas";
import { Done } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { PhotoUpload } from "./core";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";

const EditDriverDrawer = ({ open, setOpenEditDriverDrawer, setRealtime }) => {
  const [value, setValue] = useState("");
  const { addDriverSchema } = useAddDriverSchema();
  console.log(open);
  const initialValues = addDriverSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = addDriverSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSend = async (values, submitProps) => {
    console.log(values);
    const formdata = new FormData();
    if (value) {
      formdata.append("displayName", values?.displayName);
      formdata.append("email", values?.email);
      formdata.append("dateOfBirth", values?.dob);
      formdata.append("phoneNumber", values?.phoneNumber);
      formdata.append("avatar", value?.target.files[0]);
      formdata.append("countryName", values?.country);
      formdata.append("city", values?.city);
      console.log("formdata", formdata);
    } else {
      formdata.append("displayName", values?.displayName);
      formdata.append("email", values?.email);
      formdata.append("dateOfBirth", values?.dob);
      formdata.append("phoneNumber", values?.phoneNumber);
      formdata.append("countryName", values?.country);
      formdata.append("city", values?.city);
      console.log("formdata", formdata);
    }
    try {
      console.log(values);
      const response = await fetch(`${BASE_URL}/driver/${open._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: formdata,
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire("Success", "Driver Updated Successfully", "success")
        : Swal.fire("Error", "Driver Not Updated", "error");
    } catch (error) {
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
      setRealtime((prev) => !prev);
      setOpenEditDriverDrawer(false);
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenEditDriverDrawer(false)}
      >
        <Container
          style={{
            width: "40vw",
            marginTop: "12vh",
          }}
        >
          <Typography align="center" color="text.primary" variant="h5">
            Edit Driver Basic Details
          </Typography>
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "4vh",
            }}
          >
            <PhotoUpload
              variant={"circular"}
              value={value || open?.photoURL}
              onChange={setValue}
            />
          </div>
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
            enableReinitialize
            initialValues={
              open?.phoneNumber
                ? {
                    displayName: open?.displayName,
                    phoneNumber: open?.phoneNumber,
                    email: open?.email,
                    dob: new Date(open?.dateOfBirth)
                      .toISOString()
                      .split("T")[0],
                    // dob: open?.dateOfBirth,
                    country: open?.country?.name,
                    city: open?.city?._id,
                  }
                : initialValues
            }
          >
            {(formik) => (
              <Form>
                {addDriverSchema?.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props) => {
                      if (inputItem.type === "select") {
                        return (
                          <FormControl
                            required
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                          >
                            <InputLabel
                              shrink={true}
                              id={`label-${inputItem.name}`}
                            >
                              {inputItem.label}
                            </InputLabel>
                            <Select
                              notched={true}
                              labelId={`label-${inputItem.name}`}
                              id={inputItem.name}
                              label={inputItem.label}
                              {...props.field}
                            >
                              {inputItem.options.map((option) => (
                                <MenuItem value={option.value} key={option.key}>
                                  {option?.phone && (
                                    <img
                                      loading="lazy"
                                      width="20"
                                      src={`https://flagcdn.com/w20/${option.key.toLowerCase()}.png`}
                                      srcSet={`https://flagcdn.com/w40/${option.key.toLowerCase()}.png 2x`}
                                      alt=""
                                      style={{ margin: "0 1vw" }}
                                    />
                                  )}

                                  {option?.phone ? (
                                    <>{`${option.value} (${option.key}) +${option.phone} `}</>
                                  ) : (
                                    option?.city
                                  )}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {props.meta.touched && props.meta.error}
                            </FormHelperText>
                          </FormControl>
                        );
                      }
                      return (
                        <div>
                          <TextField
                            required={inputItem.required}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label={inputItem.label}
                            type={inputItem.type}
                            multiline={inputItem?.multiline}
                            rows={inputItem?.rows}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
                          />
                        </div>
                      );
                    }}
                  </Field>
                ))}

                <div>
                  <div style={{ marginTop: "4px", marginBottom: "2vh" }}>
                    <LoadingButton
                      className="mt-1vh gradient"
                      variant="contained"
                      sx={{ color: "snow" }}
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                      loadingPosition="start"
                      startIcon={<Done sx={{ color: "snow" }} />}
                    >
                      Save
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </>
  );
};

export default EditDriverDrawer;
