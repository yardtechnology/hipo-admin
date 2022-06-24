import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import {
  Avatar,
  //   Card,
  //   CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import {
  OperatorDocumentsDrawer,
  OperatorDriverData,
  ReferralDrawer,
  VehicleInfoDrawer,
} from "components";
import { SendNotification } from "components/dialog";
import { useOperators } from "hooks";
import moment from "moment";
import React, { useState } from "react";

const OperatorPayment = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const { operators, setRealtime } = useOperators();

  return (
    <>
      {" "}
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <VehicleInfoDrawer
        open={openVehicleInfoDrawer}
        setOpenVehicleInfoDrawer={setOpenVehicleInfoDrawer}
      />
      <OperatorDocumentsDrawer
        open={openDocumentDrawer}
        setOpenDocumentsDrawer={setOpenDocumentDrawer}
      />
      <MaterialTable
        title="Operators"
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Operators"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Operators"),
            },
          ],
          pageSize: 20,
          actionsColumnIndex: -1,
          search: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        isLoading={operators === null}
        data={
          operators === null
            ? []
            : operators?.map((operator, i) => ({
                ...operator,
                sl: i + 1,
                currentTimestamp: moment(operator.createdAt).format("ll"),
              }))

          //   [
          //   {
          //     dateOfBirth: "12/12/12",
          //     displayName: "Alexa",
          //     email: "alexa@gmail.com",
          //     phoneNumber: "+91 7778876436",
          //     city: "Bbsr",
          //     joiningDate: new Date().toString(),
          //     trips: "15",
          //     profileImageUrl: "",
          //     status: "Approved",
          //   },
          // ]
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
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            field: "displayName",
            render: ({ photoURL, displayName, phoneNumber, isOnline }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                      color={isOnline ? "success" : "error"}
                      invisible={!isOnline}
                    >
                      <Avatar src={photoURL} alt={"img"} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName || "Not Provided"}
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
            // width: "5%",
          },

          // {
          //   title: "City",
          //   field: "city",
          // },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          {
            title: "Joining Date",
            field: "createdAt",
            render: (rowData) => moment(rowData.createdAt).format("ll"),
            export: false,
          },
          {
            title: "Joining Date",
            field: "currentTimestamp",
            export: true,
            hidden: true,
          },
          // {
          //   title: "Status",
          //   field: "status",
          //   render: (row) => (
          //     <>
          //       {/* <Button
          //         sx={{ padding: "4px 5px", textTransform: "none" }}
          //         size="small"
          //         variant="contained"
          //         color="success"
          //       >
          //         {row?.status}
          //       </Button> */}
          //       <Tooltip
          //         placement="top"
          //         title={row?.isBlocked ? "Unblock Operator" : "Block Operator"}
          //       >
          //         <IOSSwitch
          //           size="small"
          //           checked={row?.isBlocked === true ? true : false}
          //           onChange={
          //             row?.isBlocked === true
          //               ? () => unblockOperator(row?._id)
          //               : () => blockOperator(row?._id)
          //           }
          //         />
          //       </Tooltip>
          //     </>
          //   ),
          // },

          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        // actions={[
        //   {
        //     tooltip: "Send notification to selected operator",
        //     icon: "send",
        //     onClick: (evt, data) =>
        //       data?.length > 1
        //         ? Swal.fire({
        //             text: "Please select only one operator to send notification",
        //             icon: "warning",
        //             confirmButtonText: "Ok",
        //           })
        //         : setSelectedUsers(data[0]?._id),
        //   },
        //   {
        //     tooltip: "Block selected operators",
        //     icon: "block",
        //     onClick: (evt, data) => handleBlockAll(data.map((d) => d._id)),
        //   },
        //   {
        //     tooltip: "Unblock selected operators",
        //     icon: "done",
        //     onClick: (evt, data) => handleUnblockAll(data.map((d) => d._id)),
        //   },
        // ]}
        detailPanel={[
          {
            tooltip: "View Drivers",
            icon: "supervisor_account",
            openIcon: "supervisor_account",
            render: (rowData) => (
              <div
                style={{
                  padding: "5px",
                  margin: "auto",
                  backgroundColor: "#eef5f9",
                }}
              >
                <OperatorDriverData
                  operatorData={rowData}
                  setRealtime={setRealtime}
                />
              </div>
            ),
          },
        ]}
      />
      <SendNotification
        setRealtime={setRealtime}
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default OperatorPayment;
