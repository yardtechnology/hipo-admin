import * as Yup from "yup";
import moment from "moment";
const DrivingLicenseSchema = [
  {
    key: "1",
    label: "Driving License Number",
    name: "drivingLicenseNumber",
    type: "number",
    validationSchema: Yup.string()
      .required("Driving License Number is Required")
      .min(12, "12 digits required")
      .test(
        "drivingLicenceNumber",
        "Driving License Number Not More Than 12 Digits",
        (value) => {
          return value?.length === 12;
        }
      ),
    initialValue: "",
  },
  {
    key: "2",
    label: "Driving License Expiry Date",
    name: "drivingLicenseExpiryDate",
    type: "date",
    // max: "2014-05-20",
    min: new Date().toISOString().split("T")[0],
    validationSchema: Yup.string()
      .required("Driving License Expiry Date is Required")
      .test(
        "drivingLicenseExpiryDate",
        "Driving License Expiry Date must be today or after",
        (value) => {
          return moment(value).isSameOrAfter(
            moment(new Date().toISOString().split("T")[0])
          );
        }
      ),
    initialValue: "",
  },
  {
    key: "3",
    label: "Category",
    name: "category",
    type: "select",
    validationSchema: Yup.string().required("Category is Required"),
    initialValue: "",
    options: [
      {
        category: "Motorcycle",
        value: "motorcycle",
        key: "1",
      },
      {
        category: "LMV",
        value: "lmv",
        key: "2",
      },
    ],
  },
];
export default DrivingLicenseSchema;
