import * as Yup from "yup";

const TeamNumberSchema = [
  {
    key: "3",
    label: "Set Hipo Team Number",
    name: "hipoTeamNumber",
    type: "tel",
    validationSchema: Yup.number().required("Hipo team number is Required"),
    initialValue: "",
  },
];
export default TeamNumberSchema;
