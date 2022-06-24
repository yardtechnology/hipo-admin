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
  Autocomplete,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Fragment } from "react";
import { useVehicleTypeSchema } from "schemas";
import { Done } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
import { useState } from "react";
// import { PhotoUpload } from "./core";

const EditVehicle = ({ open, setOpenEditVehicleDrawer, setRealtime }) => {
  const [categoryId, setCategoryId] = useState(open?.vehicleType);
  const [vehicleMakerId, setVehicleMakerId] = useState(open?.make?._id);
  const [vehicleModelId, setVehicleModelId] = useState(open?.model?._id);
  const { addVehicleTypeSchema } = useVehicleTypeSchema(
    vehicleMakerId,
    categoryId
  );

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
    const formdata = new FormData();
    formdata.append("vehicleType", categoryId);
    formdata.append("vehicleNumber", values.vehicleNumber);
    formdata.append("make", vehicleMakerId);
    formdata.append("model", vehicleModelId);

    try {
      const response = await fetch(`${BASE_URL}/vehicle/${open?._id}`, {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: formdata,
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire("Success", res?.message, "success")
        : Swal.fire("Error", res?.message, "error");
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
      setOpenEditVehicleDrawer(false);
      setRealtime((prev) => !prev);
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenEditVehicleDrawer(false)}
      >
        <Container
          style={{
            width: "40vw",
            marginTop: "18vh",
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Edit Vehicle Basic Details
          </Typography>
          {/* <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "4vh",
            }}
          >
            <PhotoUpload
              variant={"circular"}
              value={value || value?.imgFile}
              onChange={setValue}
            />
          </div> */}
          <Formik
            initialValues={
              open?.vehicleNumber
                ? {
                    vehicleNumber: open?.vehicleNumber,
                    vehicleType: open?.vehicleType,
                    vehicleMaker: {
                      vehicleType: open?.make?.name,
                      value: open?.make?._id,
                      key: open?.make?._id,
                    },
                    vehicleModel: {
                      vehicleType: open?.model?.name,
                      value: open?.model?._id,
                      key: open?.model?._id,
                    },
                    // vehicleMaker:{ open?.make?._id},
                    // vehicleModel: open?.model?._id,
                  }
                : initialValues
            }
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                {addVehicleTypeSchema?.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props) => {
                      if (
                        inputItem.type === "select" &&
                        inputItem.name !== "vehicleMaker" &&
                        inputItem.name !== "vehicleModel"
                      ) {
                        return (
                          <FormControl
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            // error={Boolean(formik.errors.vehicleType)}
                          >
                            <InputLabel
                              id={`label-${inputItem.name}`}
                              shrink={true}
                            >
                              {inputItem.label}
                            </InputLabel>
                            <Select
                              notched={true}
                              labelId={`label-${inputItem?.name}`}
                              id={inputItem?.name}
                              label={inputItem?.label}
                              value={props.field.value}
                              displayEmpty
                              onChange={(e) => {
                                if (inputItem?.name === "vehicleType") {
                                  setCategoryId(e.target.value);
                                  formik.setFieldValue(
                                    "vehicleType",
                                    e.target.value
                                  );
                                  formik.setFieldTouched("vehicleType", true);
                                  return;
                                }

                                props?.input?.onChange(e.target.value);
                              }}
                              error={Boolean(formik.errors.vehicleType)}
                              helperText={
                                // formik.touched.phoneNumber &&
                                formik.errors.vehicleType
                              }
                            >
                              {inputItem?.options?.map((option) => (
                                <MenuItem
                                  value={option?.value}
                                  key={option?.key}
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
                              {/* {formik.errors.vehicleType} */}
                            </FormHelperText>
                          </FormControl>
                        );
                      }
                      if (
                        inputItem?.name === "vehicleMaker" &&
                        inputItem?.type === "select"
                      ) {
                        return (
                          <Autocomplete
                            sx={{
                              width: "100%",
                              mb: "2vh",
                            }}
                            id="combo-box-demo"
                            name={"vehicleMaker"}
                            options={inputItem?.options}
                            getOptionLabel={(option) => option?.vehicleType}
                            isOptionEqualToValue={(option, value) =>
                              option?.key === value
                            }
                            value={
                              props.field.value || formik.values.vehicleMaker
                            }
                            onChange={(e, value) => {
                              setVehicleMakerId(value?.value);
                              formik.setFieldValue("vehicleMaker", value);
                              formik.setFieldTouched("vehicleMaker", true);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name={"vehicleMaker"}
                                value={formik.values.vehicleMaker}
                                required={inputItem?.required}
                                label="Vehicle Maker"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        );
                      }
                      if (
                        inputItem?.name === "vehicleModel" &&
                        inputItem?.type === "select"
                      ) {
                        return (
                          <Autocomplete
                            id="combo-box-demo"
                            value={props.field.value}
                            onChange={(e, value) => {
                              setVehicleModelId(value?.key);
                              formik.setFieldValue("vehicleModel", value);
                              formik.setFieldTouched("vehicleModel", true);
                            }}
                            options={inputItem?.options}
                            getOptionLabel={(option) => option?.vehicleType}
                            isOptionEqualToValue={(option, value) =>
                              option?.key === value
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Vehicle Model"
                                InputLabelProps={{ shrink: true }}
                                required={inputItem?.required}
                                variant="outlined"
                              />
                            )}
                          />
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

export default EditVehicle;
