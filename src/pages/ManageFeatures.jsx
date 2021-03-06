import MaterialTable from "@material-table/core";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { useFeaturesList } from "hooks";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
import { PhotoUpload } from "components/core";
import { CategoryOutlined } from "@mui/icons-material";
import { useState } from "react";
import { AssignTypeDrawerFeature } from "components";

const ManageFeatures = () => {
  const { features, setRealtime } = useFeaturesList();
  const [openAssignTypeDrawer, setOpenAssignTypeDrawer] = useState({});

  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <>
      <AssignTypeDrawerFeature
        setRealtime={setRealtime}
        setOpenAssignTypeDrawer={setOpenAssignTypeDrawer}
        open={openAssignTypeDrawer}
      />
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
                ExportPdf(cols, datas, "Manage Features"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Manage Features"),
            },
          ],
        }}
        isLoading={features === null}
        title={"Manage Features"}
        data={
          features === null
            ? []
            : features?.map((feature, i) => ({
                ...feature,
                sl: i + 1,
                featureImage: feature?.image,
                featureImageUrl: feature?.image?.url,
                featureIconUrl: feature?.icon?.url,
                featureIcon: feature?.icon,
                currentTimestamp: moment(feature?.createdAt).format("LL"),
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
            export: false,
            title: "Icon",
            field: "featureIconUrl",
            render: ({ featureIcon }) => (
              <Avatar
                src={featureIcon?.url}
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
            validate: (value) => {
              if (value === null) {
                return "Please select an icon";
              }
              return true;
            },
          },
          {
            export: false,
            title: "Image",
            field: "featureImageUrl",
            render: ({ featureImageUrl }) => (
              <Avatar
                src={featureImageUrl}
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
            validate: (value) => {
              if (
                value?.name?.length <= 0 ||
                value?.name?.length === undefined
              ) {
                return "Required";
              }
              return true;
            },
          },
          {
            title: "Brief",
            field: "description",
            searchable: true,
            validate: (value) => {
              if (
                value?.name?.length <= 0 ||
                value?.name?.length === undefined
              ) {
                return "Required";
              }
              return true;
            },
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
            editable: "never",
            export: false,
          },
        ]}
        editable={{
          onRowAdd: async (data) => {
            const formdata = new FormData();
            formdata.append("name", data?.name);
            formdata.append("description", data?.description);
            formdata.append("icon", data?.featureIconUrl?.target?.files[0]);
            formdata.append("image", data?.featureImageUrl?.target?.files[0]);
            try {
              const response = await fetch(`${BASE_URL}/feature`, {
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
            formdata.append("icon", newData?.featureIconUrl?.target?.files[0]);
            formdata.append(
              "image",
              newData?.featureImageUrl?.target?.files[0]
            );
            try {
              const response = await fetch(
                `${BASE_URL}/feature/${oldData?._id}`,
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
                `${BASE_URL}/feature/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              console.log(res);
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

export default ManageFeatures;
