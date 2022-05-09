import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CardActions,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "contexts";
import React, { Fragment } from "react";
import { AccountInfoSchema } from "schemas";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";

const BankAccountInfo = ({ handleBack, handleNext, handleReset }) => {
  const {
    bankAccountInfo,
    basicDetails,
    drivingLicenceInfo,
    aadharCardInfo,
    setBankAccountInfo,
    setBasicDetails,
    setAadharCardInfo,
    setDrivingLicenceInfo,
  } = useAppContext();
  console.log("basicDetails", basicDetails);
  console.log("drivingLicenceInfo", drivingLicenceInfo);
  console.log("aadharCardInfo", aadharCardInfo);
  // const [value, setValue] = useState(basicDetails.imgFile);
  // console.log(value);
  console.log("bankAccountInfo", bankAccountInfo);
  const initialValues = AccountInfoSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = AccountInfoSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  const handleSend = async (values, submitProps) => {
    const formdata = new FormData();
    formdata.append("bankAccountNumber", values?.accountNo);
    formdata.append("bankName", values?.bankName);
    formdata.append("ifscCode", values?.ifscCode);
    formdata.append("bankAccountHolderName", values?.accountHolderName);
    formdata.append("displayName", basicDetails?.displayName);
    formdata.append("email", basicDetails?.email);
    formdata.append("dateOfBirth", basicDetails?.dob);
    formdata.append("phoneNumber", basicDetails?.phoneNumber);
    formdata.append("avatar", basicDetails?.imgFile?.target.files[0]);
    formdata.append("countryCode", basicDetails?.countryCode);
    formdata.append("countryName", basicDetails?.country);
    formdata.append("city", basicDetails?.city);

    formdata.append(
      "drivingLicenseNumber",
      drivingLicenceInfo?.drivingLicenceNumber
    );
    formdata.append(
      "drivingLicense",
      drivingLicenceInfo?.drivingLicenceimage?.target.files[0]
    );
    // formdata.append("aadharCardNumber", aadharCardInfo?.aadharCardNumber);
    formdata.append(
      "aadharCardFront",
      aadharCardInfo?.imgFile?.target.files[0]
    );
    formdata.append(
      "aadharCardBack",
      aadharCardInfo?.imgFile1?.target.files[0]
    );

    try {
      console.log(values);
      // await setBankAccountInfo({
      //   ...values,
      // })
      console.log(formdata);
      const response = await fetch(`${BASE_URL}/driver`, {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Driver added successfully",
            icon: "success",
          })
        : Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error",
          });

      setBasicDetails({ imgFile: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setBasicDetails("");
      setBankAccountInfo();
      setAadharCardInfo();
      setDrivingLicenceInfo();
      handleReset();

      submitProps.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={
          bankAccountInfo?.bankName
            ? {
                accountHolderName: bankAccountInfo?.accountHolderName,
                bankName: bankAccountInfo?.bankName,
                accountNo: bankAccountInfo?.accountNo,
                ifscCode: bankAccountInfo?.ifscCode,
              }
            : initialValues
        }
        enableReinitialize
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSend}
      >
        {(formik) => (
          <Form>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              sx={{ mt: "2vh" }}
            >
              {AccountInfoSchema?.map((inputItem) => (
                <Grid item lg={10} md={12} sm={12} xs={12}>
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
                            // InputLabelProps={{ shrink: true }}
                          />
                        </div>
                      );
                    }}
                  </Field>
                </Grid>
              ))}
            </Grid>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{ marginRight: ".5rem" }}
                onClick={handleBack}
              >
                Previous
              </Button>
              <LoadingButton
                className=" btn-background"
                variant="contained"
                type="submit"
                disabled={formik?.isSubmitting || !formik?.isValid}
                loading={formik?.isSubmitting}
                loadingPosition="start"
                startIcon={<Done />}
              >
                Submit
              </LoadingButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BankAccountInfo;
