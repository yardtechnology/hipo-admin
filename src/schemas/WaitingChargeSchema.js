import * as Yup from "yup";

const WaitingChargeSchema = [
  {
    key: "3",
    label: "Free Waiting Time",
    name: "freeTime",
    type: "number",
    validationSchema: Yup.number().required("Free Waiting Time is Required"),
    initialValue: "",
  },
  {
    key: "4",
    label: "Charge Per Minute",
    name: "perMinute",
    type: "number",
    validationSchema: Yup.number().required("Charge Per Minute is Required"),
    initialValue: "",
  },
];
export default WaitingChargeSchema;
