import * as Yup from "yup";

const SearchRadiusSchema = [
  {
    key: "3",
    label: "Search Radius in Km",
    name: "searchRadius",
    type: "number",
    validationSchema: Yup.number().required("Search Radius is Required"),
    initialValue: "",
  },
];
export default SearchRadiusSchema;
