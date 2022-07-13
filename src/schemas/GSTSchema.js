import * as Yup from "yup";

const GSTSchema = [
  {
    key: "3",
    label: "Set Ride GST in %",
    name: "GST",
    type: "number",
    validationSchema: Yup.number().required("Ride GST Is Required"),
    initialValue: "",
  },
];
export default GSTSchema;
