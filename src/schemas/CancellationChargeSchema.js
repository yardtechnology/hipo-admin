import * as Yup from "yup";

const CancellationChargeSchema = [
  {
    key: "3",
    label: "% of Total Fare",
    name: "percentage",
    type: "number",
    validationSchema: Yup.number().required("% of Total Fare is Required"),
    initialValue: "",
  },
  {
    key: "4",
    label: "Max Charge",
    name: "maxCharge",
    type: "number",
    validationSchema: Yup.number().required("Max Charge is Required"),
    initialValue: "",
  },
  {
    key: "5",
    label: "Min Time Percentage Of Total Distance",
    name: "minTimePercentage",
    type: "number",
    validationSchema: Yup.number().required(
      "Min Time Percentage Of Total Distance is Required"
    ),
    initialValue: "",
  },
];

export default CancellationChargeSchema;
