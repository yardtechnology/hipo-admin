import { Person } from "@mui/icons-material";
// import { countries } from "configs";
import * as Yup from "yup";
import { number } from "yup";

const AccountInfoSchema = [
  {
    key: "12",
    label: "Account Holder Name",
    name: "accountHolderName",
    validationSchema: Yup.string()
      .required("Account Holder Name is required")
      .min(2, "Account Holder Name must be at least 2 characters"),
    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "8",
    label: "Bank Name",
    name: "bankName",
    validationSchema: Yup.string()
      .required("Bank name is required")
      .min(2, "Bank Name must be at least 2 characters"),
    initialValue: "",
    startIcon: <Person />,
  },

  {
    key: "10",
    label: "Account No",
    name: "accountNo",
    type: number,
    validationSchema: Yup.number().required("Account No is required"),
    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "11",
    label: "IFSC Code",
    name: "ifscCode",
    type: "text",
    validationSchema: Yup.string()
      .required("IFSC Code Is Required")
      .test(
        "IFSC Code",
        "IFSC Code must be of length 11",
        (value) => value?.length === 11
      )
      .matches(
        /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
        "First 4 characters must be alphabets and last 7 characters must be numbers"
      ),

    initialValue: "",
    startIcon: <Person />,
  },
];
export default AccountInfoSchema;
