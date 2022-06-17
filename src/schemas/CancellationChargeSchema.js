import * as Yup from "yup";

const CancellationChargeSchema = [
  // {
  //   key: "3",
  //   label: "% of Total Fare",
  //   name: "percentage",
  //   type: "number",
  //   validationSchema: Yup.number().required("% of Total Fare is Required"),
  //   initialValue: "",
  // },
  {
    key: "4",
    label: "Max Charge In Rupees",
    name: "maxCharge",
    type: "number",
    validationSchema: Yup.number().required("Max Charge is Required"),
    initialValue: "",
  },
  {
    key: "5",
    label: "Cancellation Fee Will Be Charged After Minutes (Minutes)",
    name: "minTimePercentage",
    type: "number",
    validationSchema: Yup.number().required(
      "Cancellation Fee Will Be Charged After Minutes is Required"
    ),
    initialValue: "",
  },
];

export default CancellationChargeSchema;
