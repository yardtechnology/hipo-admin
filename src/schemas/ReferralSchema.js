import * as Yup from "yup";

const ReferralSchema = [
  {
    key: "3",
    label: "Set Referral Price Per User",
    name: "referral",
    type: "number",
    validationSchema: Yup.number().required("Referral Price is Required"),
    initialValue: "",
  },
];
export default ReferralSchema;
