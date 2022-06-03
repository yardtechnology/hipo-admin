import * as Yup from "yup";

const AccessFeeSchema = [
  {
    key: "3",
    label: "Set Access Fee Per User",
    name: "accessFee",
    type: "number",
    validationSchema: Yup.number().required("Access Fee is Required"),
    initialValue: "",
  },
];
export default AccessFeeSchema;
