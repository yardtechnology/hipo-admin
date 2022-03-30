import * as Yup from "yup";

const QASchema = [
  {
    key: "1",
    label: "Question",
    name: "question",
    validationSchema: Yup.string()
      .required("Question is Required")
      .max(50, "Question must be less than 50 characters")
      .min(5, "Question must be greater than 5 characters"),
    initialValue: "",
  },
  {
    key: "2",
    label: "Answer",
    name: "answer",
    multiline: true,
    rows: 4,
    validationSchema: Yup.string()
      .required("Answer is Required")
      .max(350, "Answer must be less than 350 characters")
      .min(5, "Answer must be greater than 5 characters"),
    initialValue: "",
  },
];
export default QASchema;
