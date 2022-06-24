import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { useIsMounted, useVehicleCategory } from "hooks";
import React, { useEffect } from "react";
import moment from "moment";
import { MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
const Models = ({ rowData, setRealtime }) => {
  const [realtimeModel, setRealtimeModel] = React.useState([]);
  const [vehicleModels, setVehicleModels] = React.useState([]);
  const { isMounted } = useIsMounted();
  const { vehicleCategory } = useVehicleCategory();

  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/vehicle-make/vehicle-models/${rowData._id}`,
          {
            method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setVehicleModels(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleModels();
  }, [isMounted, realtimeModel, rowData]);

  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Sub Topics"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Sub Topics"),
            },
          ],
        }}
        title={`Models of ${rowData?.name}`}
        data={vehicleModels?.map((models, i) => ({
          ...models,
          sl: i + 1,
          modelLogo: models?.image?.url,
          currentTimestamp: moment(models?.createdAt).format("LL"),
          vehicleCategoryId: models?.vehicleCategory?._id,
        }))}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },

          {
            title: "Vehicle Model",
            field: "name",

            searchable: true,
            validate: ({ name }) => {
              if (!name) {
                return "Name is required";
              }
            },
          },
          {
            title: "Vehicle Category",
            field: "vehicleCategoryId",
            render: (rowData) => {
              return rowData?.vehicleCategory?.name;
            },
            validate: ({ vehicleCategoryId }) => {
              if (!vehicleCategoryId) {
                return "Vehicle Category is required";
              }
              return true;
            },
            searchable: true,
            editComponent: (props) => {
              return (
                <Select
                  required
                  value={props.value}
                  onChange={(e) => {
                    props.onChange(e.target.value);
                  }}
                  error={
                    props.value === "" || props.value === undefined
                      ? true
                      : false
                  }
                  helperText={
                    props.value === "" || props.value === undefined
                      ? "Required"
                      : ""
                  }
                >
                  {vehicleCategory?.map((item) => (
                    <MenuItem key={item?._id} value={item?._id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            },
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "timestamp",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
            searchable: true,
            // hidden: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
        ]}
        editable={{
          onRowAdd: async (data) => {
            var formdata = new FormData();
            formdata.append("name", data?.name);
            formdata.append("make", rowData?._id);
            formdata?.append("vehicleCategory", data?.vehicleCategoryId);
            try {
              const response = await fetch(`${BASE_URL}/vehicle-model`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: formdata,
              });
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Model Updated successfully",
                    icon: "success",
                  })
                : Swal.fire({
                    text: "Something went wrong",
                    icon: "error",
                  });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtimeModel((prev) => !prev);
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            var formdata = new FormData();
            formdata.append("name", newData?.name);
            formdata.append("make", rowData?._id);
            formdata?.append("vehicleCategory", newData?.vehicleCategoryId);
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-model/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: formdata,
                }
              );
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Model updated successfully",
                    icon: "success",
                  })
                : Swal.fire({
                    text: "Something went wrong",
                    icon: "error",
                  });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtimeModel((prev) => !prev);
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-model/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Model deleted successfully",
                    icon: "success",
                  })
                : Swal.fire({
                    text: "Something went wrong",
                    icon: "error",
                  });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtimeModel((prev) => !prev);
              setRealtime((prev) => !prev);
            }
          },
        }}
        isLoading={
          vehicleModels === null || vehicleCategory === null ? true : false
        }
      />
    </div>
  );
};

export default Models;
