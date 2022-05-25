import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  CardActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { DL } from "assets";
import { DrivingLicenseSchema } from "schemas";

const EditDrivingLicense = ({ open }) => {
  const [value, setValue] = useState(open?.drivingLicense?.url);
  const initialValues = DrivingLicenseSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = DrivingLicenseSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleDrivingLicenseInfo = async (values, submitProps) => {
    try {
      //   setAadharCardInfo({ ...values, imgFile: value, imgFile1: value1 });
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
          p: "2vh 1.2vw 0vh 1.2vw ",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={value || DL}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={
          open?.drivingLicense
            ? {
                drivingLicenseNumber: open?.drivingLicense?.number,
                drivingLicenseExpiryDate: new Date(open?.drivingLicense?.expiry)
                  .toISOString()
                  .split("T")[0],
                category: open?.drivingLicense?.licenseType,
              }
            : initialValues
        }
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleDrivingLicenseInfo}
        enableReinitialize
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <CardContent>
              {DrivingLicenseSchema?.map((inputItem) => (
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
                          <InputLabel
                            id={`label-${inputItem.name}`}
                            shrink={true}
                          >
                            {inputItem.label}
                          </InputLabel>
                          <Select
                            notched
                            labelId={`label-${inputItem.name}`}
                            id={inputItem.name}
                            label={inputItem.label}
                            {...props.field}
                          >
                            {inputItem.options.map((option) => (
                              <MenuItem value={option.value} key={option.key}>
                                {option.category}
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
                          required
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
                          inputProps={{
                            min: inputItem?.min,
                            max: inputItem?.max,
                            // step: inputItem.step,
                          }}
                        />
                      </div>
                    );
                  }}
                </Field>
              ))}
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
                SAVE
              </LoadingButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditDrivingLicense;
