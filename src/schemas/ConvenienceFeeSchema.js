import * as Yup from "yup";

const ConvenienceFeeSchema = [
  {
    key: "3",
    label: "Set Access Fee Tax In %",
    name: "convenienceFee",
    type: "number",
    validationSchema: Yup.number().required("Access Fee Tax Is Required"),
    initialValue: "",
  },
];
export default ConvenienceFeeSchema;
