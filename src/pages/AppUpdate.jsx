// import { Card, CardContent, TextField } from "@mui/material";

// const AppUpdate = () => {
//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card sx={{ width: 500, marginTop: "4vh" }}>
//           <CardContent>
//             <TextField
//               margin="normal"
//               fullWidth
//               label={"Current App Version"}
//               //   rows={"4"}
//               multiline
//               type={"text"}
//               value={"2.5"}
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label={"App Update Title"}
//               //   rows={"4"}
//               multiline
//               type={"text"}
//               value={"app updated"}
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label={"App Update Description"}
//               rows={"4"}
//               multiline
//               type={"text"}
//               value={"Some bug fixed and Minor changes"}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default AppUpdate;
import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { BASE_URL } from "configs";
import { Field, Form, Formik } from "formik";
import { AppUpdateSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";
const AppUpdate = ({ openDialog, handleClose }) => {
  const initialValues = AppUpdateSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = AppUpdateSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const handleSendReply = async (values, submitProps) => {
    console.log(values);
    try {
      const result = await fetch(`${BASE_URL}/version/create`, {
        method: "POST",
        body: JSON.stringify({
          title: values?.title,
          description: values.description,
          version: values?.version,
          isDismissible: values?.isDismissible,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: res?.success?.message })
        : Swal.fire({ icon: "error", text: res.error.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    }
  };
  return (
    <Container
      maxWidth="sm"
      className="d-flex place-content-center place-items-center"
    >
      <Card sx={{ width: { lg: 500, md: 500, sm: 400, sx: 300 } }}>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSendReply}
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
                                <MenuItem value={option.value} key={option.key}>
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
                            helperText={props.meta.touched && props.meta.error}
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
    </Container>
  );
};

export default AppUpdate;
