import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CardContent,
  TextField,
  InputAdornment,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Email, Send } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { withAuthLayout } from "layouts";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = {
    email: Yup.string()
      .required("Email is Required")
      .email("Please enter a valid email"),
  };
  const handleForgotPassword = async (values, submitProps) => {
    try {
      const result = await fetch(
        `${BASE_URL}/auth/set-password/forgetpassword`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: values?.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: res?.success?.message })
        : Swal.fire({ icon: "error", text: res.error.message });
      submitProps.resetForm();
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  return (
    <>
      <>
        <>
          <CardHeader
            title="Forgot your password?"
            subheader="Please enter the email address associated with your account and We will email you a link to reset your password."
            titleTypographyProps={{
              gutterBottom: true,
              align: "center",
            }}
            subheaderTypographyProps={{ align: "justify" }}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleForgotPassword}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardContent>
                  <Field name={"email"}>
                    {(props) => (
                      <TextField
                        fullWidth
                        margin="normal"
                        label={"Enter your email address"}
                        type={"email"}
                        error={Boolean(props.meta.touched && props.meta.error)}
                        helperText={props.meta.touched && props.meta.error}
                        {...props.field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
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
                    Reset Password
                  </LoadingButton>
                </CardContent>
                <CardActions className="place-content-center">
                  <Button
                    component={Link}
                    to="/login"
                    sx={{ color: "#c91c83" }}
                  >
                    Back to Login
                  </Button>
                </CardActions>
              </Form>
            )}
          </Formik>
        </>
      </>
    </>
  );
};

export default withAuthLayout(ForgotPassword);
