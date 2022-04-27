import {
  Email,
  Lock,
  //  PhoneAndroid
} from "@mui/icons-material";
import * as Yup from "yup";

const LoginSchema = [
  {
    key: "1",
    label: "Email",
    name: "email",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is Required")
      .email("Please enter a valid email"),
    initialValue: "",
    startIcon: <Email />,
  },
  {
    key: "2",
    label: "Password",
    name: "password",
    type: "password",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
    initialValue: "",
    startIcon: <Lock />,
  },
  // {
  //   key: "3",
  //   label: "Phone Number",
  //   name: "phoneNumber",
  //   type: "number",
  //   validationSchema: Yup.number().required("Phone Number is Required"),
  //   initialValue: "",
  //   startIcon: <PhoneAndroid />,
  // },
];
export default LoginSchema;
