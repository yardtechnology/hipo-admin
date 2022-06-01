import { Lock, MobileFriendly } from "@mui/icons-material";
import * as Yup from "yup";

const SetPasswordSchema = [
  {
    key: "1",
    label: "Enter The OTP",
    name: "currentPassword",
    type: "text",
    validationSchema: Yup.string().required("OTP is Required"),
    initialValue: "",
    startIcon: <MobileFriendly />,
  },
  {
    key: "2",
    label: "New Password",
    name: "newPassword",
    type: "password",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is Required"),
    initialValue: "",
    startIcon: <Lock />,
  },
  {
    key: "3",
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    validationSchema: Yup.string()
      .required("Confirm Password is Required")
      .test("confirmPassword", "Passwords must match", function (value) {
        return this?.parent?.newPassword === value;
      }),
    initialValue: "",
    startIcon: <Lock />,
  },
];
export default SetPasswordSchema;
