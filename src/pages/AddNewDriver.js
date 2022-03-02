import {
  Card,
  Container,
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

import { Fragment } from "react";
import { AddDriverSchema } from "schemas";
import { Done } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { PhotoUpload } from "components/core";
import { useState } from "react";

const AddNewDriver = ({ open, setOpenAddPaymentsDrawer }) => {
  const [value, setValue] = useState({});
  console.log(value);
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  const initialValues = AddDriverSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = AddDriverSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSend = async (values, submitProps) => {
    try {
      console.log(values);
      submitProps.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <Container
        maxWidth="md"
        // style={{
        //   width: "40vw",
        //   marginTop: "12vh",
        // }}
      >
        <Card sx={{ p: 3, borderRadius: "20px" }}>
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1877f2" }}
            marginBottom={"4vh"}
          >
            Add Driver Information
          </Typography>
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <PhotoUpload
              variant={"circular"}
              value={value}
              onChange={setValue}
            />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {AddDriverSchema?.map((inputItem) => (
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
        </Card>
      </Container>
    </>
  );
};

export default AddNewDriver;
