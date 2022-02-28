import { Person } from "@mui/icons-material";
// import { countries } from "configs";
import * as Yup from "yup";
import { number } from "yup";

const AddPaymentSchema = [
  {
    key: "2",
    label: "Name",
    name: "displayName",
    validationSchema: Yup.string()
      .required("Name is Required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 150 characters"),
    initialValue: "",
    startIcon: <Person />,
  },
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
  {
    key: "3",
    label: "Phone Number",
    name: "phoneNumber",
    type: "tel",
    validationSchema: Yup.string()
      .required("Phone Number is Required")
      .min(5, "Phone Number must be at least 5 characters")
      .max(15, "Phone Number must be less than 15 characters")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
    initialValue: "",
  },
  {
    key: "5",
    label: "Ride Amount",
    name: "rideAmount",
    validationSchema: Yup.number().required("Ride amount is required "),

    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "5",
    label: "Payment Amount",
    name: "gender",
    validationSchema: Yup.number().required("Payment amount is required "),

    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "6",
    label: "Payment Method",
    name: "paymentMethod",
    validationSchema: Yup.string().required("Payment Method is Required"),

    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "7",
    label: "Incentives",
    name: "incentive",
    validationSchema: Yup.number().required("Incentive is Required"),

    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "8",
    label: "Bank Name",
    name: "bankName",
    validationSchema: Yup.string()
      .required("Bank Name is Required")
      .min(2, "Bank Name must be at least 2 characters"),
    initialValue: "",
    startIcon: <Person />,
  },

  {
    key: "10",
    label: "Account No",
    name: "accountNo",
    type: number,
    validationSchema: Yup.number().required("Account No is Required"),
    initialValue: "",
    startIcon: <Person />,
  },
];
export default AddPaymentSchema;
