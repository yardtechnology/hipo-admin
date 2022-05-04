import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "contexts";
import React, { Fragment, useState } from "react";
import { useVehicleTypeSchema } from "schemas";

import { AadharUpload } from "components/core";
import { UPLOADINSURANCE, UPLOADRC } from "assets";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
const VehicleBasicDetails = ({ handleNext }) => {
  const { vehicleBasicDetails } = useAppContext();
  const { addVehicleTypeSchema } = useVehicleTypeSchema();
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  console.log(value);
  console.log(vehicleBasicDetails);
  // const [driverName, setDriverName] = useState(vehicleBasicDetails?.driverName);
  const [drivers, setDrivers] = useState([]);
  console.log(drivers);
  const initialValues = addVehicleTypeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = addVehicleTypeSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSend = async (values, submitProps) => {
    const formData = new FormData();
    formData.append("vehicleType", values.vehicleType);
    formData.append("vehicleNumber", values.vehicleNumber);
    formData.append("vehicleName", values?.vehicleName);
    formData.append("drivers", drivers);
    formData.append("rc", value?.target?.files[0]);
    formData.append("insurance", value1?.target?.files[0]);

    try {
      const response = await fetch(`${BASE_URL}/vehicle`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("SAL")}` },
      });
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire("Success", res.message, "success")
        : Swal.fire("Error", res.message, "error");
      submitProps.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setValue("");
      setValue1("");
      // handleNext();
      submitProps.resetForm();
      submitProps.setSubmitting(false);
    }
  };
  return (
    <div style={{ marginTop: "4vh" }}>
      {/* <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: "4vh",
        }}
      >
        <PhotoUpload
          width={"40%"}
          height={"27vh"}
          variant={"square"}
          value={value || VEHICLE}
          onChange={setValue}
        />
      </div> */}
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
            value={value || UPLOADRC}
            onChange={setValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AadharUpload
            width={"100%"}
            value={value1 || UPLOADINSURANCE}
            onChange={setValue1}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSend}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={0.5} justifyContent="center">
              {addVehicleTypeSchema?.map((inputItem) => (
                <Grid
                  item
                  lg={inputItem?.name === "vehicleType" ? 12 : 6}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props) => {
                      if (
                        inputItem.type === "select" &&
                        inputItem.name !== "driverName"
                      ) {
                        return (
                          <FormControl
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                          >
                            <InputLabel
                              id={`label-${inputItem.name}`}
                              shrink={true}
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
                                <MenuItem
                                  value={option?.value}
                                  key={option.key}
                                >
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
                                    option?.vehicleType
                                  )}
                                  {option?.phone ? (
                                    <>{`${option.value} (${option.key}) +${option.phone} `}</>
                                  ) : (
                                    option?.driverName
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
                      if (
                        inputItem.type === "select" &&
                        inputItem.name === "driverName"
                      ) {
                        return (
                          <FormControl
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                          >
                            <InputLabel
                              id={`label-${inputItem.name}`}
                              shrink={true}
                            >
                              {inputItem.label}
                            </InputLabel>
                            <Select
                              notched={true}
                              labelId={`label-${inputItem.name}`}
                              multiple={true}
                              value={drivers}
                              onChange={(e) => {
                                setDrivers(e.target.value);
                              }}
                              id={inputItem.name}
                              label={inputItem.label}
                              // {...props.field}
                            >
                              {inputItem.options.map((option) => (
                                <MenuItem
                                  value={option?.value}
                                  key={option.key}
                                >
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
                                    option?.vehicleType
                                  )}
                                  {option?.phone ? (
                                    <>{`${option.value} (${option.key}) +${option.phone} `}</>
                                  ) : (
                                    option?.driverName
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
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
                            InputLabelProps={{ shrink: true }}
                          />
                        </div>
                      );
                    }}
                  </Field>
                </Grid>
              ))}
            </Grid>
            <div>
              <div
                style={{
                  marginTop: "4px",
                  marginBottom: "2vh",
                  textAlign: "right",
                }}
              >
                <LoadingButton
                  className="mt-1vh gradient"
                  variant="contained"
                  sx={{ color: "snow" }}
                  type="submit"
                  disabled={
                    formik.isSubmitting ||
                    !formik.isValid ||
                    !value ||
                    !value1 ||
                    !drivers
                  }
                  loading={formik.isSubmitting}
                  loadingPosition="start"
                  startIcon={<Done sx={{ color: "snow" }} />}
                >
                  Create{" "}
                </LoadingButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehicleBasicDetails;
