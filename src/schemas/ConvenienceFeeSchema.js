import * as Yup from "yup";

const ConvenienceFeeSchema = [
  {
    key: "3",
    label: "Set Convenience Fee In %",
    name: "convenienceFee",
    type: "number",
    validationSchema: Yup.number().required("Convenience Fee is Required"),
    initialValue: "",
  },
];
export default ConvenienceFeeSchema;
