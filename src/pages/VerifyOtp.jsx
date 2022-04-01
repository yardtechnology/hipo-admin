import * as Yup from "yup";
import { Form, Formik } from "formik";
import { CardContent, CardHeader, Container, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { VerifyOtpSchema } from "schemas";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "contexts";
import { TextInput } from "components/core";
import Swal from "sweetalert2";
import { LOGO } from "assets";

const VerifyOtp = () => {
  const { verifyOtp } = useAppContext();
  const navigate = useNavigate();
  const initialValues = VerifyOtpSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = VerifyOtpSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleLogin = async (values, submitProps) => {
    try {
      await verifyOtp(values?.OTP, submitProps);

      navigate("/");
      window.localStorage.removeItem("ID");
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", text: error.message });
      submitProps.restForm();

      submitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ marginTop: "6vh" }}>
          <div className="" style={{ textAlign: "center", marginTop: "3vh" }}>
            <img src={LOGO} alt="logo" width="150" style={{}} />
          </div>
          <CardHeader
            title="Sign In To Access Panel"
            subheader="Verify OTP and Sign In"
            titleTypographyProps={{
              gutterBottom: true,
              align: "center",
            }}
            subheaderTypographyProps={{
              gutterBottom: true,
              align: "center",
            }}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <CardContent>
                  {VerifyOtpSchema.map((inputItem) => (
                    <TextInput
                      key={inputItem.key}
                      name={inputItem?.name}
                      label={inputItem?.label}
                      type={inputItem?.type}
                      startIcon={inputItem?.startIcon}
                    />
                  ))}
                  {/* <div className="d-flex place-content-end">
                    <Button
                      component={Link}
                      to="/forgot-password"
                      sx={{ color: "#1877f2" }}
                    >
                      Forgot Password?
                    </Button>
                  </div> */}
                  <div
                    className="place-content-center"
                    style={{ marginTop: "2vh" }}
                  >
                    <LoadingButton
                      className="mt-1vh btn-background"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      loading={isSubmitting}
                      loadingPosition="start"
                      endIcon={<Forward />}
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      Verify OTP
                    </LoadingButton>
                  </div>
                </CardContent>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </>
  );
};

export default VerifyOtp;
