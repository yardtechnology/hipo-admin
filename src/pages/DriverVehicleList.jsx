import MaterialTable from "@material-table/core";
import {
  Avatar,
  Breadcrumbs,

  // Chip,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import {
  AssignmentInd,
  Delete,
  DocumentScanner,
  Edit,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import VehicleDocumentDrawer from "components/VehicleDocumentDrawer";
import { EditVehicle } from "components/AddVehicle";
import { useIsMounted, useVehicles } from "hooks";
import { AssignDrivers } from "components";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
// import { formatCurrency } from "@ashirbad/js-core";

const DriverVehicleList = () => {
  const { driverId } = useParams();
  console.log(driverId);
  const { isMounted } = useIsMounted();
  const { vehicles, setRealtime } = useVehicles();
  const [vehicleList, setVehicleList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(
          `${BASE_URL}/vehicles/driver/${driverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setVehicleList(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, driverId]);
  console.log(vehicleList);

  const [openVehicleDocumentDrawer, setOpenVehicleDocumentDrawer] =
    useState(false);
  const [openEditVehicleDocumentDrawer, setOpenEditVehicleDocumentDrawer] =
    useState(false);
  const [openAssignDriverDrawer, setOpenAssignDriverDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const turnOnVehicle = async (item) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/update-vehicle/is-active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: [item?._id],
          isActive: true,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const turnOffVehicle = async (item) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/update-vehicle/is-active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: [item?._id],
          isActive: false,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const turnOnMultipleVehicles = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/update-vehicle/is-active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: data,
          isActive: true,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Vehicles turned on", "success")
        : Swal.fire("Error", "Something went wrong", "error");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const turnOffMultipleVehicles = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/update-vehicle/is-active`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: data,
          isActive: false,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Vehicles turned off", "success")
        : Swal.fire("Error", "Something went wrong", "error");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <EditVehicle
        setRealtime={setRealtime}
        open={openEditVehicleDocumentDrawer}
        setOpenEditVehicleDrawer={setOpenEditVehicleDocumentDrawer}
      />
      <VehicleDocumentDrawer
        open={openVehicleDocumentDrawer}
        setOpenVehicleDocumentDrawer={setOpenVehicleDocumentDrawer}
        setRealtime={setRealtime}
      />
      <AssignDrivers
        setRealtime={setRealtime}
        open={openAssignDriverDrawer}
        setOpenAssignDriverDrawer={setOpenAssignDriverDrawer}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "2vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/drivers/all-drivers">
          All Drivers
        </Link>
        <Typography color="text.primary">Driver Vehicle List</Typography>
      </Breadcrumbs>

      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          detailPanelColumnAlignment: "right",
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Vehicles"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Vehicles"),
            },
          ],
        }}
        title={"Driver Vehicle List"}
        data={
          vehicles === null
            ? []
            : vehicleList?.map((vehicle, i) => ({
                ...vehicle,
                sl: i + 1,
                vehicleName: `${
                  vehicle?.make?.name ? vehicle?.make?.name : "--"
                } ${vehicle?.model?.name ? vehicle?.model?.name : ""}`,
                type: vehicle?.model?.vehicleCategory?.name
                  ? vehicle?.model?.vehicleCategory?.name
                  : "--",
                ownerName: vehicle?.owner?.displayName
                  ? vehicle?.owner?.displayName
                  : "--",
                currentTimestamp: moment(vehicle?.createdAt).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },

          {
            title: "Name",
            field: "vehicleName",
            searchable: true,
          },
          {
            title: "Number",
            field: "vehicleNumber",
            searchable: true,
          },
          {
            title: "Type",
            field: "type",
            searchable: true,
          },
          {
            title: "Owner",
            field: "ownerName",
            searchable: true,
          },

          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Switch
                  checked={row?.isActive ? true : false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      turnOnVehicle(row);
                    } else {
                      turnOffVehicle(row);
                    }
                  }}
                />
                {/* <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.status}
                  sx={{ padding: "4px" }}
                /> */}
              </>
            ),
          },
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
          {
            title: "Actions",
            width: "18%",
            headerStyle: {
              textAlign: "center",
            },
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  <Tooltip title="View Documents">
                    <Avatar
                      variant="rounded"
                      onClick={() => setOpenVehicleDocumentDrawer(row)}
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "lawngreen",
                        cursor: "pointer",
                      }}
                    >
                      <DocumentScanner sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Edit Vehicle Basic Details">
                    <Avatar
                      variant="rounded"
                      onClick={() => setOpenEditVehicleDocumentDrawer(row)}
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "gray",
                        cursor: "pointer",
                      }}
                    >
                      <Edit sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Assign Driver">
                    <Avatar
                      variant="rounded"
                      onClick={() => setOpenAssignDriverDrawer(row)}
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "blue",
                        cursor: "pointer",
                      }}
                    >
                      <AssignmentInd sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Delete Driver">
                    <Avatar
                      variant="rounded"
                      // onClick={() => setOpenDocumentDrawer(row)}
                      sx={{
                        padding: "0px !important",
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                    >
                      <Delete sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                </div>
              </>
            ),
          },
        ]}
        isLoading={loading || vehicles === null}
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Turn On",
            icon: "toggle_on",
            onClick: (evt, data) =>
              turnOnMultipleVehicles(
                data?.map((d) => d?._id),
                setRealtime((prev) => !prev)
              ),
          },
          {
            tooltip: "Turn Off",
            icon: "toggle_off",
            onClick: (evt, data) =>
              turnOffMultipleVehicles(
                data?.map((d) => d?._id),
                setRealtime((prev) => !prev)
              ),
          },
        ]}
        // detailPanel={({ rowData }) => {
        //   return (
        //     <div
        //       style={{
        //         padding: "20px",
        //         margin: "auto",
        //         backgroundColor: "#eef5f9",
        //       }}
        //     >
        //       <Card
        //         sx={{
        //           minWidth: 500,
        //           maxWidth: 550,
        //           transition: "0.3s",
        //           margin: "auto",
        //           padding: "2vh 2vw",
        //           borderRadius: "10px",
        //           // fontFamily: italic,
        //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        //           "&:hover": {
        //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        //           },
        //         }}
        //       >
        //         <CardContent>
        //           <Typography
        //             variant="body1"
        //             component="p"
        //             gutterBottom
        //             align="left"
        //           >
        //             Cost Per KM:{" "}
        //             <span
        //               style={{
        //                 color: "rgb(30, 136, 229)",
        //                 fontSize: "15px",
        //               }}
        //             >
        //               {formatCurrency(rowData?.costPerKm)}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             Seating Capacity:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.seatingCapacity}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             Purchase On:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.purchaseOn}
        //             </span>
        //           </Typography>
        //           {/* <Typography variant="body1" gutterBottom align="left">
        //             Fuel:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.fuel}
        //             </span>
        //           </Typography> */}
        //         </CardContent>
        //       </Card>
        //     </div>
        //   );
        // }}

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

export default DriverVehicleList;
