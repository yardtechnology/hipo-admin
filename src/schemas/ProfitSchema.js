import * as Yup from "yup";

const ProfitSchema = [
  {
    key: "3",
    label: "Set Profit",
    name: "margin",
    type: "number",
    validationSchema: Yup.number().required("Profit is Required"),
    initialValue: "",
  },
];
export default ProfitSchema;
