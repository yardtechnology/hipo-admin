import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
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
import { useConfig } from "hooks";
import { ProfitSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";
const Profit = () => {
  const { config, setRealtime } = useConfig();
  const initialValues = ProfitSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = ProfitSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  const handleSetProfit = async (values, submitProps) => {
    // console.log(values);
    try {
      const result = await fetch(`${BASE_URL}/config`, {
        method: "PUT",
        body: JSON.stringify({
          margin: values?.margin,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      setRealtime((prev) => !prev);
      const res = await result.json();
      res?.status === 200
        ? Swal.fire({ icon: "success", text: "Profit updated successfully" })
        : Swal.fire({ icon: "error", text: res?.message });
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
      <Card sx={{ width: { lg: 500, md: 500, sm: 400, sx: 300 }, mt: "8vh" }}>
        <CardHeader
          title="Set Profit"
          subheader="Set your profit margin"
          titleTypographyProps={{ variant: "h6", textAlign: "center" }}
          subheaderTypographyProps={{
            variant: "subtitle1",
            textAlign: "center",
            mb: 0,
          }}
        ></CardHeader>
        <Formik
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSetProfit}
          enableReinitialize
          initialValues={
            config?.margin
              ? {
                  margin: config?.margin,
                }
              : initialValues
          }
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <CardContent>
                {ProfitSchema?.map((inputItem) => (
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
                    Save
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

export default Profit;
