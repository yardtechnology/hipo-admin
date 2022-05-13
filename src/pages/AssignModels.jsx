import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { MenuItem, Select } from "@mui/material";
// import { formatCurrency } from "@ashirbad/js-core";
import { BASE_URL } from "configs";
import { isValidOnlyAlphabates } from "helpers";
import { useVehicleCategory, useVehicleMaker, useVehicleModels } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const AssignModels = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { vehicleMaker, setRealtime } = useVehicleMaker();
  const { vehicleCategory } = useVehicleCategory();
  const { vehicleModels, setRealtimeModel } = useVehicleModels();
  console.log(vehicleMaker);
  return (
    <>
      <MaterialTable
        options={{
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Premiums"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Premiums"),
            },
          ],
        }}
        title={"Assign Models"}
        data={vehicleMaker?.map((maker, i) => {
          return {
            ...maker,
            sl: i + 1,
            // brandLogo: maker?.logo?.url,
          };
        })}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "5%",
          },

          {
            title: "Vehicle Make",
            field: "name",
            required: true,
            editPlaceholder: "",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
            // validate: ({ name }) => {
            //   if (!name) {
            //     return "Vehicle Make is required";
            //   }
            //   if (!isValidOnlyAlphabates(name)) {
            //     return "Vehicle Make should be alphabates";
            //   }
            //   return true;
            // },
            searchable: true,
          },
          // {
          //   title: "Amount",
          //   field: "amount",
          //   type: "numeric",
          //   render: ({ amount }) => formatCurrency(amount),
          // },
          // {
          //   title: "Count",
          //   field: "count",
          //   type: "numeric",
          // },
          // {
          //   title: "Used Count",
          //   field: "count",
          //   type: "numeric",
          // },

          {
            title: "Timestamp",
            // width: "70%",
            field: "createdAt",
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
        detailPanel={({ rowData }) => {
          return (
            <>
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
                        exportFunc: (cols, datas) =>
                          ExportPdf(cols, datas, "Sub Topics"),
                      },
                      {
                        label: "Export CSV",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "Sub Topics"),
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
                          return "Vehicle Model is required";
                        }
                        if (!isValidOnlyAlphabates(name)) {
                          return "Vehicle Model should be alphabates";
                        }
                        return true;
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
                      render: ({ createdAt }) =>
                        moment(createdAt).format("lll"),
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
                      console.log(data);
                      var formdata = new FormData();
                      formdata.append("name", data?.name);
                      formdata.append("make", rowData?._id);
                      formdata?.append(
                        "vehicleCategory",
                        data?.vehicleCategoryId
                      );
                      try {
                        const response = await fetch(
                          `${BASE_URL}/vehicle-model`,
                          {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                            body: formdata,
                          }
                        );
                        const res = await response.json();
                        console.log(res);
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
                      console.log(newData);
                      var formdata = new FormData();
                      formdata.append("name", newData?.name);
                      formdata.append("make", rowData?._id);
                      formdata?.append(
                        "vehicleCategory",
                        newData?.vehicleCategoryId
                      );
                      try {
                        const response = await fetch(
                          `${BASE_URL}/vehicle-model/${oldData?._id}`,
                          {
                            method: "PUT",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                            body: formdata,
                          }
                        );
                        const res = await response.json();
                        console.log(res);
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
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                          }
                        );
                        const res = await response.json();
                        console.log(res);
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

                  // isLoading={SUBTOPICS === null}
                />
              </div>
            </>
          );
        }}
        editable={{
          onRowAdd: async (data) => {
            console.log(data);
            var formdata = new FormData();
            formdata.append("name", "tata");
            formdata.append("logo", data?.brandLogo.target.files[0]);
            try {
              const response = await fetch(`${BASE_URL}/vehicle-maker`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: formdata,
              });
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Maker added successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            console.log(newData);
            const formdata = new FormData();
            formdata.append("name", newData?.name);
            oldData?.brandLogo !== newData?.brandLogo &&
              formdata.append("logo", newData?.brandLogo.target.files[0]);
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-maker/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: formdata,
                }
              );
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Maker updated Successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-maker/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Maker deleted Successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        // actions={[
        //   {
        //     tooltip: "Delete all selected Days",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?.day)),
        //   },
        // ]}
        // isLoading={days === null}
      />
    </>
  );
};

export default AssignModels;
