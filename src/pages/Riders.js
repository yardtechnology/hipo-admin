import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { History, LocationCity, PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddressDrawer, ReferralDrawer } from "components";
import { SendNotification } from "components/dialog";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Riders = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openAddressDrawer, setOpenAddressDrawer] = useState(false);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);

  console.log(selectedUsers);
  const navigate = useNavigate();
  return (
    <>
      <AddressDrawer
        open={openAddressDrawer}
        setOpenAddressDrawer={setOpenAddressDrawer}
      />{" "}
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <MaterialTable
        title="Riders"
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        localization={{
          header: {
            actions: "",
          },
        }}
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
          pageSize: "10",
          actionsColumnIndex: -1,
          search: true,
          selection: true,
          sorting: true,
        }}
        data={[
          {
            displayName: "Mehmet",
            email: "Baran@gmail.com",
            phoneNumber: "777887643625",
            address: "Bbsr",
            trips: "15",
            profileImageUrl: "",
            status: "Unblocked",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            width: "2%",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "20%",
            field: "firstName",
            render: ({ photoURL, displayName, email }) => (
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
                    secondary={
                      <Typography sx={{}} component="h6" variant="subtitle2">
                        {email || "Not Provided"} <br />
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Phone",
            field: "phoneNumber",
            width: "5%",
          },
          // {
          //   title: "Address",
          //   field: "address",
          // },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          {
            title: "Status",
            field: "status",
            width: "5%",
            render: (row) => (
              <>
                <Button
                  sx={{ padding: "4px 5px", textTransform: "none" }}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  {row?.status}
                </Button>
              </>
            ),
          },
          {
            title: "Creation Time",
            field: "creationTime",
            width: "5%",
          },
          {
            title: "Last Login Time",
            field: "lastSignInTime",
          },

          {
            title: "Actions",
            width: "18%",
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  {" "}
                  <Tooltip title="Rider Address">
                    <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "blueViolet",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenAddressDrawer(row)}
                    >
                      <LocationCity />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="View Ride History">
                    <Avatar
                      variant="rounded"
                      onClick={() => navigate("/rider-history")}
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
                        cursor: "pointer",
                      }}
                    >
                      <PersonAdd sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                </div>
              </>
            ),
          },

          // {
          //   title: "",
          //   width: "2%",
          //   // field: "pick",
          //   render: (row) => (
          //     <Tooltip title="Block this Rider">
          //       <IconButton>
          //         <Block />
          //       </IconButton>
          //     </Tooltip>
          //   ),
          // },

          // {
          //   title: "",
          //   // field: "pick",
          //   render: (row) => (
          //     <Button
          //       variant="contained"
          //       size="small"
          //       sx={{ textTransform: "none", padding: "5px" }}
          //     >
          //       Block
          //     </Button>
          //   ),
          // },
          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        // editable={{
        //   onRowDelete: async (oldData) => {
        //     try {
        //     } catch (error) {}
        //   },
        // }}
        actions={[
          {
            tooltip: "Send notification to all selected users",
            icon: "send",
            onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Block all selected users",
            icon: "block",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Unblock all selected users",
            icon: "done",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
        ]}
      />
      <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default Riders;
