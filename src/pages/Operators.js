import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  DocumentScanner,
  SupervisorAccount,
  TwoWheeler,
} from "@mui/icons-material";
import {
  Avatar,
  //   Card,
  //   CardContent,
  styled,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Switch,
  Badge,
} from "@mui/material";
import {
  OperatorDocumentsDrawer,
  ReferralDrawer,
  VehicleInfoDrawer,
} from "components";
import { SendNotification } from "components/dialog";
import { BASE_URL } from "configs";
import { useOperators } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Operators = () => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "red",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { operators, setRealtime } = useOperators();
  console.log(operators);

  const handleBlockAll = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: user,
          isBlocked: true,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Operators has been blocked",
            icon: "success",
          })
        : Swal.fire({
            title: "Error",
            text: res?.message,
            icon: "error",
          });
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  const handleUnblockAll = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: user,
          isBlocked: false,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Operators has been unblocked",
            icon: "success",
          })
        : Swal.fire({
            title: "Error",
            text: res?.message,
            icon: "error",
          });
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  const blockOperator = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: [user],
          isBlocked: true,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Operator has been blocked",
            icon: "success",
          })
        : Swal.fire({
            title: "Error",
            text: res?.message,
            icon: "error",
          });
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  const unblockOperator = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: [user],
          isBlocked: false,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Operator has been unblocked",
            icon: "success",
          })
        : Swal.fire({
            title: "Error",
            text: res?.message,
            icon: "error",
          });
    } catch (error) {
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
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
          selection: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        isLoading={operators === null || isLoading}
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
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                {/* <Button
                  sx={{ padding: "4px 5px", textTransform: "none" }}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  {row?.status}
                </Button> */}
                <Tooltip
                  placement="top"
                  title={row?.isBlocked ? "Unblock Operator" : "Block Operator"}
                >
                  <IOSSwitch
                    size="small"
                    checked={row?.isBlocked === true ? true : false}
                    onChange={
                      row?.isBlocked === true
                        ? () => unblockOperator(row?._id)
                        : () => blockOperator(row?._id)
                    }
                  />
                </Tooltip>
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
                  <Tooltip title="View Drivers">
                    <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "#f50057",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/operator-driver/${row._id}`)}
                    >
                      <SupervisorAccount />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="View Vehicles">
                    <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "blueViolet",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      // onClick={() => setOpenVehicleInfoDrawer(row)}
                      onClick={() =>
                        navigate(`/operator-vehicle-list/${row._id}`)
                      }
                    >
                      <TwoWheeler />
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
            tooltip: "Send notification to selected operator",
            icon: "send",
            onClick: (evt, data) =>
              data?.length > 1
                ? Swal.fire({
                    text: "Please select only one operator to send notification",
                    icon: "warning",
                    confirmButtonText: "Ok",
                  })
                : setSelectedUsers(data[0]?._id),
          },
          {
            tooltip: "Block selected operators",
            icon: "block",
            onClick: (evt, data) => handleBlockAll(data.map((d) => d._id)),
          },
          {
            tooltip: "Unblock selected operators",
            icon: "done",
            onClick: (evt, data) => handleUnblockAll(data.map((d) => d._id)),
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

export default Operators;
