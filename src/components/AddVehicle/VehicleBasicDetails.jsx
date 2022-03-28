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
import { VehicleBasicDetailsSchema } from "schemas";

import { PhotoUpload } from "components/core";
import { VEHICLE } from "assets";
const VehicleBasicDetails = ({ handleNext }) => {
  const { basicDetails, setBasicDetails } = useAppContext();
  console.log("basicDetails", basicDetails);
  const [value, setValue] = useState(basicDetails?.imgFile);
  console.log(value);

  const initialValues = VehicleBasicDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = VehicleBasicDetailsSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSend = async (values, submitProps) => {
    try {
      console.log(values);
      await setBasicDetails({
        ...values,
        imgFile: value,
      });
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      handleNext();
      // submitProps.setSubmitting(false);
    }
  };
  return (
    <div>
      <div
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
      </div>
      <Formik
        initialValues={
          basicDetails?.displayName
            ? { displayName: basicDetails?.displayName }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSend}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={0.5} justifyContent="center">
              {VehicleBasicDetailsSchema?.map((inputItem) => (
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props) => {
                      if (inputItem.type === "select") {
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
                            <InputLabel id={`label-${inputItem.name}`}>
                              {inputItem.label}
                            </InputLabel>
                            <Select
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
                                    option.value
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
                  disabled={formik.isSubmitting || !formik.isValid || !value}
                  loading={formik.isSubmitting}
                  loadingPosition="start"
                  startIcon={<Done sx={{ color: "snow" }} />}
                >
                  Next
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
