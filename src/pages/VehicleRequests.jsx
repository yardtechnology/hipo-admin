import MaterialTable from "@material-table/core";
import {
  Avatar,

  // Chip,
  Tooltip,
} from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { DocumentScanner } from "@mui/icons-material";
import { useState } from "react";
import VehicleDocumentDrawer from "components/VehicleDocumentDrawer";
import { useVehicleRequests } from "hooks";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
// import { formatCurrency } from "@ashirbad/js-core";

const VehicleRequests = () => {
  const { vehicleRequests, setRealtime } = useVehicleRequests();
  const [openVehicleDocumentDrawer, setOpenVehicleDocumentDrawer] =
    useState(false);
  const [loading, setLoading] = useState(false);
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const rejectVehicles = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/vehicles/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: data,
          status: "REJECTED",
        }),
      });
      const res = await response.json();
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Vehicles Rejected", "success")
        : Swal.fire("Error", "Something went wrong", "error");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const acceptVehicles = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/vehicles/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          vehicleIds: data,
          status: "APPROVED",
        }),
      });
      const res = await response.json();
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Vehicle Approved", "success")
        : Swal.fire("Error", "Something went wrong", "error");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <VehicleDocumentDrawer
        open={openVehicleDocumentDrawer}
        setOpenVehicleDocumentDrawer={setOpenVehicleDocumentDrawer}
        setRealtime={setRealtime}
      />

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
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Vehicle Requests"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Vehicle Requests"),
            },
          ],
        }}
        title={"Vehicles"}
        data={
          vehicleRequests === null
            ? []
            : vehicleRequests?.map((vehicle, i) => ({
                ...vehicle,
                sl: i + 1,
                vehicleName: `${
                  vehicle?.make?.name ? vehicle?.make?.name : "--"
                } ${vehicle?.model?.name ? vehicle?.model?.name : ""}`,
                type: vehicle?.model?.vehicleCategory?.name,
                ownerName: vehicle?.owner?.displayName,
                currentTimestamp: moment(vehicle?.createdAt).format("lll"),
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
            title: "Name",
            field: "vehicleName",
            searchable: true,
            render: (rowData) =>
              `${rowData?.make?.name ? rowData?.make?.name : ""} ${
                rowData?.model?.name ? rowData?.model?.name : ""
              }`,
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
            emptyValue: "--",
            render: (rowData) => `${rowData?.model?.vehicleCategory?.name}`,
          },
          {
            title: "Owner",
            field: "ownerName",
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
                </div>
              </>
            ),
          },
        ]}
        isLoading={loading || vehicleRequests === null}
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Accept Vehicle Request",
            icon: "check",
            onClick: (evt, data) =>
              acceptVehicles(
                data?.map((d) => d?._id),
                setRealtime((prev) => !prev)
              ),
          },
          {
            tooltip: "Reject Vehicle Request",
            icon: "close",
            onClick: (evt, data) =>
              rejectVehicles(
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

export default VehicleRequests;
