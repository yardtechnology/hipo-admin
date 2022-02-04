import { Cancel, Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextInput } from "components/core";
import { BASE_URL } from "configs";
import { useAppContext } from "contexts";
import { Form, Formik } from "formik";
import { MessageSchema } from "schemas";
import Swal from "sweetalert2";
import * as Yup from "yup";
const SendNotification = ({ selectedUsers, handleClose }) => {
  const ICON = "https://sky-rise.s3.amazonaws.com/notification/superadmin.png";
  console.log(selectedUsers);
  const { user } = useAppContext();
  const initialValues = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {});
  const validationSchema = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {});
  //   const sendREPLY = () => {};
  const handleSendReply = async (values, submitProps) => {
    try {
      for (let users of selectedUsers) {
        const result = await fetch(`${BASE_URL}/notification/create`, {
          method: "POST",
          body: JSON.stringify({
            sendToId: users?._id,
            selfId: user?._id,
            description: values?.message,
            title: values?.subject,
            iconUrl: ICON,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await result.json();
        console.log(res);
        console.log(result.status);

        result.status === 200
          ? console.log(res?.success?.message)
          : Swal.fire({ icon: "error", text: res?.error?.message });
        handleClose();
        console.log(values, selectedUsers);
        submitProps.resetForm();
      }
      Swal.fire({ icon: "success", text: "Notification Sent Successfully" });
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", text: error.message });
      submitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <Dialog
        open={Boolean(selectedUsers?.length)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSendReply}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <DialogTitle>Send Notification</DialogTitle>
              <DialogContent dividers>
                {MessageSchema.map((inputItem) => (
                  <TextInput
                    key={inputItem.key}
                    name={inputItem?.name}
                    label={inputItem?.label}
                    type={inputItem?.type}
                    startIcon={inputItem?.startIcon}
                    multiline={inputItem?.multiline}
                    rows={inputItem?.rows}
                  />
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleClose}
                  color="error"
                >
                  Close
                </Button>
                <LoadingButton
                  variant="contained"
                  startIcon={<Send />}
                  disabled={!isValid}
                  loading={isSubmitting}
                  type="submit"
                >
                  Send
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default SendNotification;
