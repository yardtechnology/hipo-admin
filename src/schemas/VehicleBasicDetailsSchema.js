import { Person } from "@mui/icons-material";
// import { countries } from "configs";
import * as Yup from "yup";

const VehicleBasicDetailsSchema = [
  {
    key: "2",
    label: "Vehicle Name",
    name: "vehicleName",
    validationSchema: Yup.string().required("Vehicle Name is Required"),
    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "12",
    label: "Vehicle Type",
    validationSchema: Yup.string().required("Gender is required"),
    name: "gender",
    // validationSchema: Yup.number().required("Requested Credit is Required"),
    initialValue: "",
    type: "select",
    options: [
      {
        vehicleType: "Auto",
        value: "auto",
        key: "1",
      },
      {
        vehicleType: "Mini",
        value: "mini",
        key: "3",
      },
      {
        vehicleType: "Micro",
        value: "micro",
        key: "2",
      },
      {
        vehicleType: "SUV",
        value: "suv",
        key: "4",
      },
      {
        vehicleType: "Sedan",
        value: "sedan",
        key: "5",
      },
    ],
  },
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
    key: "1",
    label: "Email",
    name: "email",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    initialValue: "",
    // startIcon: <Email />,
  },
  {
    key: "5",
    label: "Date of birth",
    name: "dob",
    validationSchema: Yup.string().required("DOB is required "),
    type: "date",
    initialValue: "",
    startIcon: <Person />,
  },
  {
    key: "12",
    label: "Gender",
    validationSchema: Yup.string().required("Gender is required"),
    name: "gender",
    // validationSchema: Yup.number().required("Requested Credit is Required"),
    initialValue: "",
    type: "select",
    options: [
      {
        dismiss: "Male",
        value: "male",
        key: "1",
      },
      {
        dismiss: "Female",
        value: "female",
        key: "2",
      },
      {
        dismiss: "Transgender",
        value: "transgender",
        key: "3",
      },
    ],
  },
  {
    key: "11",
    label: "City",
    name: "city",
    validationSchema: Yup.string().required("City is required "),
    type: "text",
    initialValue: "",
    // startIcon: <Person />,
  },
];
export default VehicleBasicDetailsSchema;
