import * as Yup from "yup";

const VerifyOtpSchema = [
  // {
  //   key: "1",
  //   label: "Email",
  //   name: "email",
  //   type: "email",
  //   validationSchema: Yup.string()
  //     .required("Email is Required")
  //     .email("Please enter a valid email"),
  //   initialValue: "",
  //   startIcon: <Email />,
  // },
  // {
  //   key: "2",
  //   label: "Password",
  //   name: "password",
  //   type: "password",
  //   validationSchema: Yup.string()
  //     .min(6, "Password must be at least 6 characters")
  //     .required("Password is Required"),
  //   initialValue: "",
  //   startIcon: <Lock />,
  // },
  {
    key: "3",
    label: "Verification Code",
    name: "OTP",
    type: "number",
    validationSchema: Yup.number().required("OTP is Required"),
    initialValue: "",
    // startIcon: <Ve />,
  },
];
export default VerifyOtpSchema;
