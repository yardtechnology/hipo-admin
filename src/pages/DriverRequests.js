import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { DocumentScanner } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { DocumentsDrawer, ReferralDrawer, VehicleInfoDrawer } from "components";
import { BASE_URL } from "configs";
import { useDriverRequests } from "hooks";
// import { SendNotification } from "components/dialog";
import moment from "moment";
import React, { useState } from "react";
import Swal from "sweetalert2";

const DriverRequests = () => {
  const { driverRequests, setRealtime } = useDriverRequests();
  console.log(driverRequests);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const handleDriverRequestAccept = async (ids) => {
    try {
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        body: JSON.stringify({
          userIds: ids,
          status: "APPROVED",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire({ text: res?.message, icon: "success" })
        : Swal.fire({ text: res?.message, icon: "error" });

      // navigate("/driver-requests");
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  const handleDriverRequestReject = async (ids) => {
    try {
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        body: JSON.stringify({
          userIds: ids,
          status: "REJECTED",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire({ text: res?.message, icon: "success" })
        : Swal.fire({ text: res?.message, icon: "error" });
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };

  return (
    <>
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <VehicleInfoDrawer
        open={openVehicleInfoDrawer}
        setOpenVehicleInfoDrawer={setOpenVehicleInfoDrawer}
      />
      <DocumentsDrawer
        open={openDocumentDrawer}
        setOpenDocumentsDrawer={setOpenDocumentDrawer}
      />
      <MaterialTable
        title="Driver Requests"
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Driver Requests"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Driver Requests"),
            },
          ],
          pageSize: 10,
          actionsColumnIndex: -1,
          search: true,
          selection: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        data={
          driverRequests === null
            ? []
            : driverRequests?.map((item, i) => ({
                ...item,
                sl: i + 1,
                driverEmail: item?.driver?.email || "Not Provided",
                countryName: item?.country?.name || "Not Provided",
                requestedAt: moment(item?.createdAt).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
            width: "2%",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Driver Profile",
            tooltip: "Profile",
            searchable: true,
            field: "displayName",
            render: ({ photoURL, displayName, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={phoneNumber || "Not Provided"}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
          },
          {
            title: "DOB",
            field: "dateOfBirth",
            searchable: true,
            render: (rowData) => {
              return moment(rowData?.dateOfBirth).format("LL");
            },
          },
          {
            title: "Country",
            field: "countryName",
            searchable: true,
          },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          // {
          //   title: "Joining Date",
          //   field: "joiningDate",
          //   render: (rowData) => moment(rowData.joiningDate).format("llll"),
          // },
          // {
          //   title: "Status",
          //   field: "status",
          //   render: (row) => (
          //     <>
          //       <Chip
          //         size="small"
          //         variant="outlined"
          //         color="secondary"
          //         label={row?.status}
          //       />
          //     </>
          //   ),
          // },
          {
            title: "Requested At",
            field: "requestedAt",
            render: (rowData) => moment(rowData.createdAt).format("lll"),
            searchable: true,
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
                      onClick={() => setOpenDocumentDrawer(row)}
                      sx={{
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

          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Accept Driver Request",
            icon: "done",
            onClick: (evt, data) =>
              handleDriverRequestAccept(data?.map((item) => item._id)),
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Reject Driver Request",
            icon: "cancel",
            onClick: (evt, data) =>
              handleDriverRequestReject(data?.map((item) => item._id)),
            // onClick: (evt, data) => setSelectedUsers(data),
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
        //             Email:{" "}
        //             <span
        //               style={{
        //                 color: "rgb(30, 136, 229)",
        //                 fontSize: "15px",
        //               }}
        //             >
        //               {rowData?.email}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             DOB:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.dateOfBirth}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             City:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.city}
        //             </span>
        //           </Typography>
        //         </CardContent>
        //       </Card>
        //     </div>
        //   );
        // }}
        // actions={[
        //   {
        //     // icon: () => <Visibility style={{ color: "#1991eb" }} />,
        //     // tooltip: "View All Rides ",
        //     // position: "toolbar",
        //     // onClick: () => {
        //     //   history.push("/users");
        //     // },
        //   },
        // ]}
      />
      {/* <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      /> */}
    </>
  );
};

export default DriverRequests;
