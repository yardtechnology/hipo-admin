import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { BASE_URL } from "configs";
import { Field, Form, Formik } from "formik";
import { useConfig } from "hooks";
import { AccessFeeSchema, ConvenienceFeeSchema, GSTSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";
const SetBilling = () => {
  const { config, setRealtime } = useConfig();
  const initialValues = AccessFeeSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = AccessFeeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const convenienceInitialValues = ConvenienceFeeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const convenienceValidationSchema = ConvenienceFeeSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const GSTInitialValues = GSTSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const GSTValidationSchema = GSTSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleSetAccessFee = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          accessFee: values?.accessFee,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      result.status === 200
        ? Swal.fire({ icon: "success", text: "Access Fee Updated" })
        : Swal.fire({ icon: "error", text: res?.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  const handleSetConvenienceFee = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          convenienceFee: values?.convenienceFee,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      result.status === 200
        ? Swal.fire({ icon: "success", text: "Convenience Fee Updated" })
        : Swal.fire({ icon: "error", text: res?.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  const handleSetGST = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          GST: values?.GST,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      result.status === 200
        ? Swal.fire({ icon: "success", text: "GST Updated" })
        : Swal.fire({ icon: "error", text: res?.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  return (
    <Container
      maxWidth="lg"
      className="d-flex place-content-center place-items-center"
    >
      <Grid
        container
        spacing={5}
        sx={{
          justifyContent: "center",
          mt: "2vh",
        }}
      >
        <Grid item lg={4} md={4}>
          <Card sx={{ width: { lg: 300, md: 300, sm: 400, sx: 300 } }}>
            <CardHeader
              title="Access Fee"
              subheader="Set your access fee"
              titleTypographyProps={{ variant: "h6", textAlign: "center" }}
              subheaderTypographyProps={{
                variant: "subtitle1",
                textAlign: "center",
                mb: 0,
              }}
            />
            <Formik
              enableReinitialize
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSetAccessFee}
              initialValues={
                config?.accessFee
                  ? {
                      accessFee: config?.accessFee,
                    }
                  : initialValues
              }
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {AccessFeeSchema?.map((inputItem) => (
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
                                    <MenuItem
                                      value={option.value}
                                      key={option.key}
                                    >
                                      {option.dismiss}
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
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </div>
                          );
                        }}
                      </Field>
                    ))}
                    <div className="place-content-center">
                      <LoadingButton
                        className="mt-1vh btn-background"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<Send />}
                        fullWidth
                      >
                        SAVE
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
        <Grid item lg={4} md={4}>
          <Card sx={{ width: { lg: 300, md: 300, sm: 400, sx: 300 } }}>
            <CardHeader
              title="Access Fee Tax"
              subheader="Set your access fee tax"
              titleTypographyProps={{ variant: "h6", textAlign: "center" }}
              subheaderTypographyProps={{
                variant: "subtitle1",
                textAlign: "center",
                mb: 0,
              }}
            />
            <Formik
              validationSchema={Yup.object(convenienceValidationSchema)}
              onSubmit={handleSetConvenienceFee}
              enableReinitialize
              initialValues={
                config?.convenienceFee
                  ? {
                      convenienceFee: config?.convenienceFee,
                    }
                  : convenienceInitialValues
              }
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {ConvenienceFeeSchema?.map((inputItem) => (
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
                                    <MenuItem
                                      value={option.value}
                                      key={option.key}
                                    >
                                      {option.dismiss}
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
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </div>
                          );
                        }}
                      </Field>
                    ))}
                    <div className="place-content-center">
                      <LoadingButton
                        className="mt-1vh btn-background"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<Send />}
                        fullWidth
                      >
                        SAVE
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
        <Grid item lg={4} md={4}>
          <Card sx={{ width: { lg: 300, md: 300, sm: 400, sx: 300 } }}>
            <CardHeader
              title="Ride GST"
              subheader="Set your ride GST"
              titleTypographyProps={{ variant: "h6", textAlign: "center" }}
              subheaderTypographyProps={{
                variant: "subtitle1",
                textAlign: "center",
                mb: 0,
              }}
            />
            <Formik
              validationSchema={Yup.object(GSTValidationSchema)}
              onSubmit={handleSetGST}
              enableReinitialize
              initialValues={
                config?.GST
                  ? {
                      GST: config?.GST,
                    }
                  : GSTInitialValues
              }
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {GSTSchema?.map((inputItem) => (
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
                                    <MenuItem
                                      value={option.value}
                                      key={option.key}
                                    >
                                      {option.dismiss}
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
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </div>
                          );
                        }}
                      </Field>
                    ))}
                    <div className="place-content-center">
                      <LoadingButton
                        className="mt-1vh btn-background"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<Send />}
                        fullWidth
                      >
                        SAVE
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SetBilling;
