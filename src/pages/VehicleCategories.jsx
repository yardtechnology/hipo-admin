import MaterialTable from "@material-table/core";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { useVehicleCategory } from "hooks";
import { PhotoUpload } from "components/core";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
import { Assignment, CategoryOutlined } from "@mui/icons-material";
import { AssignFeatureDrawer, AssignTypeDrawer } from "components";
import { useState } from "react";

const VehicleCategories = () => {
  const [openAssignFeatureDrawer, setOpenAssignFeatureDrawer] = useState({});
  const [openAssignTypeDrawer, setOpenAssignTypeDrawer] = useState({});
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { vehicleCategory, setRealtime } = useVehicleCategory();
  console.log(vehicleCategory);
  return (
    <>
      <AssignFeatureDrawer
        setRealtime={setRealtime}
        open={openAssignFeatureDrawer}
        setOpenAssignFeatureDrawer={setOpenAssignFeatureDrawer}
      />
      <AssignTypeDrawer
        setRealtime={setRealtime}
        setOpenAssignTypeDrawer={setOpenAssignTypeDrawer}
        open={openAssignTypeDrawer}
      />
      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Vehicle Categories"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Vehicle Categories"),
            },
          ],
        }}
        title={"Manage Vehicle Categories"}
        data={
          vehicleCategory === null
            ? []
            : vehicleCategory?.map((item, index) => ({
                ...item,
                sl: index + 1,
                categoryImage: item?.image,
                categoryImageUrl: item?.image?.url,
                categoryIconUrl: item?.icon?.url,
                categoryIcon: item?.icon,
                currentTimestamp: moment(item?.createdAt).format("LL"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Icon",
            field: "categoryIconUrl",
            render: ({ categoryIcon }) => (
              <Avatar
                src={categoryIcon?.url}
                variant="square"
                sx={{ width: 100, height: 65 }}
              />
            ),
            editComponent: ({ value, onChange }) => {
              return (
                <>
                  <PhotoUpload value={value} onChange={onChange} />
                </>
              );
            },
            searchable: true,
            export: false,
          },
          {
            title: "Image",
            field: "categoryImageUrl",
            export: false,
            render: ({ categoryImage }) => (
              <Avatar
                src={categoryImage?.url}
                variant="square"
                sx={{ width: 120, height: 70 }}
              />
            ),
            editComponent: ({ value, onChange }) => {
              return (
                <>
                  <PhotoUpload value={value} onChange={onChange} />
                </>
              );
            },
            searchable: true,
          },
          {
            title: "Name",
            field: "name",
            searchable: true,
            width: "2%",
          },
          {
            title: "Brief",
            field: "description",
            searchable: true,
          },

          {
            title: "Timestamp",
            // width: "70%",
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
            searchable: true,
            emptyValue: "--",
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
          {
            // title: "Features",
            field: "features",
            render: (row) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={"Assign Features"}>
                    <IconButton
                      onClick={() => {
                        setOpenAssignFeatureDrawer(row);
                      }}
                    >
                      <Assignment />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Assign Ride Type"}>
                    <IconButton
                      onClick={() => {
                        setOpenAssignTypeDrawer(row);
                      }}
                    >
                      <CategoryOutlined />
                    </IconButton>
                  </Tooltip>
                </div>
              );
            },
            width: "2%",
          },
        ]}
        editable={{
          onRowAdd: async (data) => {
            const formdata = new FormData();
            formdata.append("name", data?.name);
            formdata.append("description", data?.description);
            formdata.append("icon", data?.categoryIconUrl?.target?.files[0]);
            formdata.append("image", data?.categoryImageUrl?.target?.files[0]);
            try {
              const response = await fetch(`${BASE_URL}/vehicle-category`, {
                method: "POST",
                body: formdata,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
              });
              const res = await response.json();
              res.status === 200
                ? Swal.fire({ icon: "success", text: res.message })
                : Swal.fire({ icon: "error", text: res.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            const formdata = new FormData();
            formdata.append("name", newData?.name);
            formdata.append("description", newData?.description);
            formdata.append("icon", newData?.categoryIconUrl?.target?.files[0]);
            formdata.append(
              "image",
              newData?.categoryImageUrl?.target?.files[0]
            );
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-category/${oldData?._id}`,
                {
                  method: "PUT",
                  body: formdata,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              res.status === 200
                ? Swal.fire({ icon: "success", text: res.message })
                : Swal.fire({ icon: "error", text: res.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-category/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              res.status === 200
                ? Swal.fire({ icon: "success", text: res.message })
                : Swal.fire({ icon: "error", text: res.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
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

export default VehicleCategories;
