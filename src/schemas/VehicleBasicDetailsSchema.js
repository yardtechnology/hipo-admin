// import { countries } from "configs";
import { Person } from "@mui/icons-material";
import * as Yup from "yup";
import { useVehicleCategory, useVehicleMaker } from "hooks";
import { useEffect, useState } from "react";

const VehicleBasicDetailsSchema = [
  // {
  //   key: "2",
  //   label: "Vehicle Name",
  //   name: "vehicleName",
  //   validationSchema: Yup.string().required("Vehicle Name is Required"),
  //   initialValue: "",
  //   startIcon: <Person />,
  //   required: true,
  // },
  {
    key: "52",
    label: "Vehicle Number",
    name: "vehicleNumber",
    validationSchema: Yup.string()
      .matches(/^[a-zA-Z0-9]{8,10}$/, "Invalid Vehicle Number")
      .test(
        "vehicleNumber",
        "Vehicle Number is min 8 and max 10 characters",
        (value) => value?.length >= 8 && value?.length <= 10
      ),

    // "",

    initialValue: "",
    startIcon: <Person />,
    required: true,
  },

  // {
  //   key: "12",
  //   label: "Vehicle Type",
  //   validationSchema: Yup.string().required("Vehicle Type is required"),
  //   name: "vehicleType",
  //   // validationSchema: Yup.number().required("Requested Credit is Required"),
  //   initialValue: "",
  //   type: "select",
  //   options: [
  //     {
  //       vehicleType: "Auto",
  //       value: "auto",
  //       key: "1",
  //     },
  //     {
  //       vehicleType: "Mini",
  //       value: "mini",
  //       key: "3",
  //     },
  //     {
  //       vehicleType: "Micro",
  //       value: "micro",
  //       key: "2",
  //     },
  //     {
  //       vehicleType: "SUV",
  //       value: "suv",
  //       key: "4",
  //     },
  //     {
  //       vehicleType: "Sedan",
  //       value: "sedan",
  //       key: "5",
  //     },
  //   ],
  // },
  // {
  //   key: "27",
  //   label: "Owner Name",
  //   name: "ownerName",
  //   validationSchema: Yup.string().required("Owner Name is Required"),
  //   initialValue: "",
  //   startIcon: <Person />,
  //   required: true,
  // },
  // {
  //   key: "3",
  //   label: "Owner Number",
  //   name: "ownerNumber",
  //   type: "tel",
  //   validationSchema: Yup.string()
  //     .required("Phone Number is Required")
  //     .min(5, "Phone Number must be at least 5 characters")
  //     .max(15, "Phone Number must be less than 15 characters")
  //     .matches(
  //       /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //       "Phone number is not valid"
  //     ),
  //   initialValue: "",
  //   required: true,
  // },
  // {
  //   key: "1",
  //   label: "Cost Per KM",
  //   name: "costPerKM",
  //   type: "number",
  //   validationSchema: Yup.number().required("Cost Per KM is Required"),
  //   initialValue: "",
  //   required: true,
  //   // startIcon: <Email />,
  // },
  // {
  //   key: "81",
  //   label: "Seating Capacity",
  //   name: "seatingCapacity",
  //   type: "number",
  //   validationSchema: Yup.number().required("Seating Capacity is Required"),
  //   initialValue: "",
  //   required: true,

  //   // startIcon: <Email />,
  // },
  // {
  //   key: "5",
  //   label: "Purchase On",
  //   name: "purchaseOn",
  //   validationSchema: Yup.string().required("Purchase On is required "),
  //   type: "date",
  //   initialValue: "",
  //   startIcon: <Person />,
  //   required: true,
  // },

  // {
  //   key: "11",
  //   label: "Fuel",
  //   name: "fuel",
  //   validationSchema: Yup.string().required("Fuel is required "),
  //   type: "text",
  //   initialValue: "",
  //   // startIcon: <Person />,
  //   required: true,
  // },
];

export const useVehicleTypeSchema = (vehicleMakerId, categoryId) => {
  const [addVehicleTypeSchema, setAddVehicleTypeSchema] = useState([]);
  const { vehicleCategory } = useVehicleCategory();
  const { vehicleMaker, model, fetchVehicleModel } = useVehicleMaker();
  console.log(model);

  useEffect(() => {
    if ((vehicleMakerId, categoryId)) {
      fetchVehicleModel(vehicleMakerId, categoryId);
    }
  }, [categoryId, vehicleMakerId, fetchVehicleModel]);
  // const { drivers } = useDrivers();
  console.log("vehicleCategory", vehicleCategory);
  useEffect(() => {
    if (vehicleCategory) {
      setAddVehicleTypeSchema([
        ...VehicleBasicDetailsSchema,
        {
          key: "12",
          label: "Vehicle Type",
          // validationSchema: Yup.string().required("Vehicle Type is required"),
          name: "vehicleType",
          initialValue: "",
          type: "select",
          required: true,
          options:
            vehicleCategory === null
              ? []
              : vehicleCategory?.map((item) => ({
                  vehicleType: item?.name,
                  value: item?._id,
                  key: item?._id,
                })),
        },
        {
          key: "13",
          label: "Vehicle Maker",
          required: true,
          // validationSchema: Yup.string().required("Vehicle Maker is required"),
          name: "vehicleMaker",
          initialValue: "",
          type: "select",
          options:
            vehicleMaker === null
              ? []
              : vehicleMaker?.map((item) => ({
                  vehicleType: item?.name,
                  value: item?._id,
                  key: item?._id,
                })),
        },
        {
          key: "14",
          label: "Vehicle Models",
          // validationSchema: Yup.string().required("Vehicle Models is required"),
          name: "vehicleModel",
          required: true,
          initialValue: "",
          type: "select",
          options: !model?.length
            ? []
            : model?.map((item) => ({
                vehicleType: item?.name,
                value: item?._id,
                key: item?._id,
              })),
        },
        // {
        //   key: "27",
        //   label: "Driver Name",
        //   name: "driverName",
        //   validationSchema: Yup.string()
        //     // .required("Driver Name is Required")
        //     ?.oneOf(
        //       drivers == null ? [] : drivers?.map((item) => item?._id),
        //       "Driver Name is Required"
        //     ),
        //   initialValue: "",
        //   required: true,
        //   type: "select",
        //   options:
        //     drivers === null
        //       ? []
        //       : drivers?.map((item) => ({
        //           driverName: item?.displayName,
        //           value: item?._id,
        //           key: item?._id,
        //         })),
        // },
      ]);
    } else {
      setAddVehicleTypeSchema(VehicleBasicDetailsSchema);
    }
  }, [vehicleCategory, vehicleMaker, model]);
  return { addVehicleTypeSchema };
};

export default VehicleBasicDetailsSchema;
