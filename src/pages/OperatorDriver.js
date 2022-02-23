import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  DocumentScanner,
  History,
  PersonAdd,
  Report,
  TwoWheeler,
} from "@mui/icons-material";
import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { DocumentsDrawer, ReferralDrawer, VehicleInfoDrawer } from "components";
import { SendNotification } from "components/dialog";
import moment from "moment";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OperatorDriver = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);

  return (
    <>
      {" "}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/view-operators">
          Operators
        </Link>
        <Typography color="text.primary">Drivers</Typography>
      </Breadcrumbs>
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
        title="Operator Drivers"
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
            status: "Approved",
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
          // {
          //   title: "Phone",
          //   field: "phoneNumber",
          //   width: "5%",
          // },

          {
            title: "City",
            field: "city",
          },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          {
            title: "Joining Date",
            field: "joiningDate",
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
                  {" "}
                  <Tooltip title="View Vehicles">
                    <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "blueViolet",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenVehicleInfoDrawer(row)}
                    >
                      <TwoWheeler />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="View Driver History">
                    <Avatar
                      variant="rounded"
                      onClick={() => navigate("/driver-history")}
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "#1877f2",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                    >
                      <History sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="View Referrals">
                    <Avatar
                      variant="rounded"
                      onClick={() => setOpenReferralDrawer(row)}
                      sx={{
                        padding: "0px !important",
                        backgroundColor: "blue",
                        mr: ".4vw",

                        cursor: "pointer",
                      }}
                    >
                      <PersonAdd sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="View Statements">
                    <Avatar
                      variant="rounded"
                      onClick={() => navigate("/driver-statement")}
                      sx={{
                        padding: "0px !important",
                        backgroundColor: "indigo",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                    >
                      <Report sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
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
          {
            tooltip: "Send notification to all selected users",
            icon: "send",
            onClick: (evt, data) => setSelectedUsers(data),
          },
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
        ]}
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
      <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default OperatorDriver;
