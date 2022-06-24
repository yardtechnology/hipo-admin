import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { LOGO } from "assets";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "components/core";
import { LoadingButton } from "@mui/lab";
import { VpnKey } from "@mui/icons-material";
import { SetPasswordSchema } from "schemas";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const initialValues = SetPasswordSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = SetPasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleChangePassword = async (values, submitProps) => {
    try {
      // console.log(values);
      const result = await fetch(`${BASE_URL}/change-password`, {
        method: "PUT",
        body: JSON.stringify({
          email: email,
          newPassword: values?.newPassword,
          OTP: values?.currentPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire({ icon: "success", text: res?.message })
        : Swal.fire({ icon: "error", text: res?.message });
      submitProps.resetForm();
      result?.status === 200 && navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        <Container
          maxWidth="sm"
          className="d-flex place-content-center place-items-center"
        >
          <Card
            sx={{
              mt: "2vh",
            }}
          >
            <div className="" style={{ textAlign: "center", marginTop: "1vh" }}>
              <img src={LOGO} alt="logo" width="150" />
            </div>

            <CardHeader
              title="Set Password"
              subheader="Enter your otp and a new password below to set your password"
              titleTypographyProps={{
                gutterBottom: true,
                align: "center",
              }}
              subheaderTypographyProps={{
                // gutterBottom: true,
                align: "center",
              }}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleChangePassword}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent
                    sx={{
                      paddingTop: "0vh",
                      paddingBottom: "0vh",
                    }}
                  >
                    {SetPasswordSchema.map((inputItem) => (
                      <TextInput
                        key={inputItem.key}
                        name={inputItem?.name}
                        label={inputItem?.label}
                        type={inputItem?.type}
                        startIcon={inputItem?.startIcon}
                      />
                    ))}

                    <div className="place-content-center">
                      <LoadingButton
                        className="mt-1vh btn-background"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<VpnKey />}
                        fullWidth
                      >
                        Reset Password
                      </LoadingButton>
                    </div>
                  </CardContent>
                  <CardActions className="place-content-center">
                    <Button
                      component={Link}
                      to="/login"
                      sx={{ color: "#1877f2" }}
                    >
                      Back to Login
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default SetPassword;
