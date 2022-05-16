import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  CardActions,
  Button,
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
import { useAppContext } from "contexts";
import { useState } from "react";
import { DL } from "assets";
import { DrivingLicenseSchema } from "schemas";

const DrivingLicense = ({ handleNext, handleBack }) => {
  const { drivingLicenceInfo, setDrivingLicenceInfo } = useAppContext();
  const [value, setValue] = useState(drivingLicenceInfo?.imgFile);
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
      setDrivingLicenceInfo({ ...values, imgFile: value });
      console.log(values);
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
        <Grid item lg={8} md={8} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={value || DL}
            onChange={setValue}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleDrivingLicenseInfo}
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
                className="btn-background"
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid || !value}
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

export default DrivingLicense;
