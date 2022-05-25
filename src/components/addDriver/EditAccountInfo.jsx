import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "contexts";
import React, { Fragment } from "react";
import { AccountInfoSchema } from "schemas";

const EditAccountInfo = ({ open }) => {
  const { bankAccountInfo, setBankAccountInfo, setBasicDetails } =
    useAppContext();
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
    try {
      console.log(values);
      await setBankAccountInfo({
        ...values,
      });
      setBasicDetails({ imgFile: "" });
    } catch (error) {
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={
          open?.bankDetails
            ? {
                accountHolderName: open?.bankDetails?.accountHolderName,
                // bankName: open?.bankDetails?.bankName,
                accountNo: open?.bankDetails?.accountNumber,
                ifscCode: open?.bankDetails?.ifscCode,
                bankAccountType: open?.bankDetails?.bankType,
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
              // spacing={1}
              justifyContent="center"
              sx={{ mt: "2vh" }}
            >
              {AccountInfoSchema?.map((inputItem) => (
                <Grid item lg={12} md={12} sm={12} xs={12}>
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
            <div style={{ textAlign: "end" }}>
              {" "}
              <LoadingButton
                className=" btn-background"
                variant="contained"
                type="submit"
                disabled={formik?.isSubmitting || !formik?.isValid}
                loading={formik?.isSubmitting}
                loadingPosition="start"
                startIcon={<Done />}
              >
                Save
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAccountInfo;
