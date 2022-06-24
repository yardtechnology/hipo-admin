import { Person } from "@mui/icons-material";
// import { countries } from "configs";
import * as Yup from "yup";
import { useCities } from "hooks";
import { useEffect, useState } from "react";
import moment from "moment";
const AddDriverSchema = [
  {
    key: "2",
    label: "Name",
    name: "displayName",
    validationSchema: Yup.string()
      .required("Name is Required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    initialValue: "",
    startIcon: <Person />,
    required: true,
  },

  {
    key: "3",
    required: true,
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
  // {
  //   key: "45",
  //   label: "countryCode",
  //   required: true,
  //   name: "countryCode",
  //   type: "",
  //   validationSchema: Yup.string()
  //     .required("Email is required")
  //     .email("Please enter a valid email"),
  //   initialValue: "",
  //   // startIcon: <Email />,
  // },
  {
    key: "1",
    label: "Email",
    required: true,
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
    required: true,
    label: "Date of birth",
    name: "dob",
    validationSchema: Yup.date()
      .required("DOB is required ")
      .test("DOB", "Please choose a valid date of birth", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      }),
    type: "date",
    initialValue: new Date(new Date().getFullYear() - 18, 1, -29)
      .toISOString()
      .split("T")[0],
    startIcon: <Person />,
  },
  // {
  //   key: "12",
  //   // required: true,
  //   label: "Gender",
  //   validationSchema: Yup.string().required("Gender is required"),
  //   name: "gender",
  //   // validationSchema: Yup.number().required("Requested Credit is Required"),
  //   initialValue: "",
  //   type: "select",
  //   options: [
  //     {
  //       dismiss: "Male",
  //       value: "male",
  //       key: "1",
  //     },
  //     {
  //       dismiss: "Female",
  //       value: "female",
  //       key: "2",
  //     },
  //     {
  //       dismiss: "Transgender",
  //       value: "transgender",
  //       key: "3",
  //     },
  //   ],
  // },
  // {
  //   key: "115",
  //   label: "City",
  //   required: true,
  //   name: "city",
  //   validationSchema: Yup.string().required("City"),
  //   type: "text",
  //   initialValue: "",
  //   // startIcon: <Person />,
  // },
  {
    key: "11",
    label: "Country",
    required: true,
    name: "country",
    validationSchema: Yup.string().required("Country "),
    type: "text",
    initialValue: "",
    // startIcon: <Person />,
  },
];
export const useAddDriverSchema = () => {
  const [addDriverSchema, setAddDriverSchema] = useState([]);
  const { cities } = useCities();
  // const { drivers } = useDrivers();
  useEffect(() => {
    if (cities) {
      setAddDriverSchema([
        ...AddDriverSchema,
        {
          key: "12",
          label: "City",
          validationSchema: Yup.string().required("City is required"),
          name: "city",
          initialValue: "",
          type: "select",
          options:
            cities === null
              ? []
              : cities?.map((item) => ({
                  city: item?.name,
                  value: item?._id,
                  key: item?._id,
                })),
        },
        // {
        //   key: "27",
        //   label: "Driver Name",
        //   name: "driverName",
        //   validationSchema: Yup.string()
        //     // .required("Driver Name is Required")
        //     ?.oneOf(
        //       drivers == null ? [] : drivers?.map((item) => item?._id),
        //       "Driver Name is Required"
        //     ),
        //   initialValue: "",
        //   required: true,
        //   type: "select",
        //   options:
        //     drivers === null
        //       ? []
        //       : drivers?.map((item) => ({
        //           driverName: item?.displayName,
        //           value: item?._id,
        //           key: item?._id,
        //         })),
        // },
      ]);
    } else {
      setAddDriverSchema(AddDriverSchema);
    }
  }, [cities]);
  return { addDriverSchema };
};
export default AddDriverSchema;
