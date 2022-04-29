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
import { AppUpdateSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";
const RiderConfig = () => {
  const { config, setRealtime } = useConfig();
  const initialValues = AppUpdateSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = AppUpdateSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSetAndroid = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          userAndroidApp: {
            title: values?.title,
            message: values.description,
            version: values?.version,
            isDismissible: values?.isDismissible,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      result.status === 200
        ? Swal.fire({ icon: "success", text: res?.message })
        : Swal.fire({ icon: "error", text: res?.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  const handleSetIos = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          userIosApp: {
            title: values?.title,
            message: values.description,
            version: values?.version,
            isDismissible: values?.isDismissible,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      result.status === 200
        ? Swal.fire({ icon: "success", text: res?.message })
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
        }}
      >
        <Grid item lg={6} md={6}>
          <Card sx={{ width: { lg: 400, md: 400, sm: 400, sx: 300 } }}>
            <CardHeader
              title="Rider Android App Update"
              //   subheader="Update your app"
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
              onSubmit={handleSetAndroid}
              initialValues={
                config?.userAndroidApp?.version
                  ? {
                      version: config?.userAndroidApp?.version,
                      title: config?.userAndroidApp?.title,
                      description: config?.userAndroidApp?.message,
                      isDismissible: config?.userAndroidApp?.isDismissible,
                    }
                  : initialValues
              }
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {AppUpdateSchema?.map((inputItem) => (
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
                        Update App
                      </LoadingButton>
                    </div>
                  </CardContent>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
        <Grid item lg={6} md={6}>
          <Card sx={{ width: { lg: 400, md: 400, sm: 400, sx: 300 } }}>
            <CardHeader
              title="Rider IOS App Update"
              //   subheader="Update your app"
              titleTypographyProps={{ variant: "h6", textAlign: "center" }}
              subheaderTypographyProps={{
                variant: "subtitle1",
                textAlign: "center",
                mb: 0,
              }}
            />
            <Formik
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSetIos}
              enableReinitialize
              initialValues={
                config?.userIosApp?.version
                  ? {
                      version: config?.userIosApp?.version,
                      title: config?.userIosApp?.title,
                      description: config?.userIosApp?.message,
                      isDismissible: config?.userIosApp?.isDismissible,
                    }
                  : initialValues
              }
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {AppUpdateSchema?.map((inputItem) => (
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
                        Update App
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

export default RiderConfig;
