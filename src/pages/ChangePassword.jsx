import { Container, Card, CardHeader, CardContent } from "@mui/material";
import { LOGO } from "assets";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "components/core";
import { LoadingButton } from "@mui/lab";
import { VpnKey } from "@mui/icons-material";
import { ChangePasswordSchema } from "schemas";
import { useAppContext } from "contexts";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { user } = useAppContext();
  const initialValues = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleChangePassword = async (values, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/change-password`, {
        method: "PUT",
        body: JSON.stringify({
          email: user?.email,
          newPassword: values?.newPassword,
          oldPassword: values?.currentPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await result.json();
      res?.status === 200
        ? Swal.fire({ icon: "success", text: res?.message })
        : Swal.fire({ icon: "error", text: res?.message });
      submitProps.resetForm();
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
          <Card>
            <div className="" style={{ textAlign: "center", marginTop: "2vh" }}>
              <img src={LOGO} alt="logo" width="150" />
            </div>

            <CardHeader
              title="Change Password"
              subheader="Enter a New Password Below to change your Password"
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
              onSubmit={handleChangePassword}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <CardContent>
                    {ChangePasswordSchema.map((inputItem) => (
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
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ChangePassword;
