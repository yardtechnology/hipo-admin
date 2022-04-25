import {
  Container,
  Drawer,
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
import { QASchema } from "schemas";
import { Done } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
// import { PhotoUpload } from "./core";

const AddQADrawer = ({ open, setOpenAddQADrawer, setRealtime }) => {
  // const drawerData = open;
  // console.log(drawerData);

  const initialValues = QASchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = QASchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleSend = async (values, submitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          title: values?.questions,
          type: "SUBTOPIC",
          answer: values?.answer,
          role: open?.role,
        }),
      });
      const res = await response.json();
      // console.log(res);
      const subtopicResponse = await fetch(`${BASE_URL}/support/${open?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          subtopics: res?.data?._id,
        }),
      });
      const subtopicRes = await subtopicResponse.json();
      // console.log(subtopicRes);
      subtopicRes?.status === 200
        ? Swal.fire({ text: res.message, icon: "success" })
        : Swal.fire({ text: res.message, icon: "error" });
      this.dataManager.setRealtime((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
      setOpenAddQADrawer(false);
      submitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenAddQADrawer(false)}
      >
        <Container
          style={{
            width: "40vw",
            marginTop: "15vh",
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Add Question and Answer
          </Typography>
          {/* <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "4vh",
            }}
          >
            <PhotoUpload
              variant={"circular"}
              value={value || value?.imgFile}
              onChange={setValue}
            />
          </div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form>
                {QASchema?.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props) => {
                      if (inputItem.type === "select") {
                        return (
                          <FormControl
                            required
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                          >
                            <InputLabel
                              shrink={true}
                              id={`label-${inputItem.name}`}
                            >
                              {inputItem.label}
                            </InputLabel>
                            <Select
                              labelId={`label-${inputItem.name}`}
                              id={inputItem.name}
                              label={inputItem.label}
                              {...props.field}
                              notched={true}
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
                            required={inputItem.required}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label={inputItem.label}
                            type={inputItem.type}
                            multiline={inputItem?.multiline}
                            rows={inputItem?.rows}
                            // InputLabelProps={{ shrink: true }}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
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
                      Add
                    </LoadingButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Drawer>
    </>
  );
};

export default AddQADrawer;
