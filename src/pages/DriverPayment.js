import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DocumentsDrawer, ReferralDrawer, VehicleInfoDrawer } from "components";
// import { SendNotification } from "components/dialog";
import moment from "moment";
import React, { useState } from "react";

const DriverPayment = () => {
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);

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
      <DocumentsDrawer
        open={openDocumentDrawer}
        setOpenDocumentsDrawer={setOpenDocumentDrawer}
      />
      <MaterialTable
        title="Driver Payments"
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Riders"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Riders"),
            },
          ],
          pageSize: 10,
          actionsColumnIndex: -1,
          search: true,
          selection: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        data={[
          {
            dateOfBirth: "12/12/12",
            displayName: "Alexa",
            email: "alexa@gmail.com",
            phoneNumber: "+91 7778876436",
            city: "Bbsr",
            joiningDate: new Date().toString(),
            trips: "15",
            profileImageUrl: "",
            status: "Paid",
            transactionId: "#123456",
            onDate: new Date().toString(),
            amount: "1000",
            commission: "10%",
          },
        ]}
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
            width: "25%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
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
            title: "Transaction Id",
            field: "transactionId",
            width: "5%",
          },
          {
            title: "Date",
            field: "onDate",
            render: (rowData) => moment(rowData.joiningDate).format("LL"),
          },
          {
            title: "Amount",
            field: "amount",
            render: (rowData) => formatCurrency(rowData.amount),
          },
          {
            title: "Commission",
            field: "commission",
          },
          {
            title: "Incentives",
            field: "incentives",
          },
          {
            title: "City",
            field: "city",
            hidden: true,
            export: true,
          },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          {
            title: "Joining Date",
            field: "joiningDate",
            hidden: true,
            export: true,
            render: (rowData) => moment(rowData.joiningDate).format("llll"),
          },
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.status}
                />
              </>
            ),
          },

          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        actions={
          [
            // {
            //   tooltip: "Send notification to all selected users",
            //   icon: "send",
            //   onClick: (evt, data) => setSelectedUsers(data),
            // },
            // {
            //   tooltip: "Block all selected users",
            //   icon: "block",
            //   // onClick: (evt, data) => setSelectedUsers(data),
            // },
            // {
            //   tooltip: "Unblock all selected users",
            //   icon: "done",
            //   // onClick: (evt, data) => setSelectedUsers(data),
            // },
          ]
        }
        detailPanel={({ rowData }) => {
          return (
            <div
              style={{
                padding: "20px",
                margin: "auto",
                backgroundColor: "#eef5f9",
              }}
            >
              <Card
                sx={{
                  minWidth: 500,
                  maxWidth: 550,
                  transition: "0.3s",
                  margin: "auto",
                  padding: "2vh 2vw",
                  borderRadius: "10px",
                  // fontFamily: italic,
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    align="left"
                  >
                    Email:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {rowData?.email}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    DOB:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dateOfBirth}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    City:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.city}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Joining Date:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.joiningDate}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Trips:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.trips}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
        editable={{
          onRowUpdate: (newData, oldData) => {},
          onRowDelete: (oldData) => {},
        }}
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

export default DriverPayment;
