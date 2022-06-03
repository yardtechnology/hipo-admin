import * as Yup from "yup";

const GSTSchema = [
  {
    key: "3",
    label: "Set GST in %",
    name: "GST",
    type: "number",
    validationSchema: Yup.number().required("GST is Required"),
    initialValue: "",
  },
];
export default GSTSchema;
