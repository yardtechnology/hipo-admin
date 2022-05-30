import styled from "@emotion/styled";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, DocumentScanner, History, Report } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { DocumentsDrawer, ReferralDrawer, VehicleInfoDrawer } from "components";
import { SendNotification } from "components/dialog";
import { BASE_URL } from "configs";
import { useDrivers, useIsMounted } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const OperatorDriver = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { operatorId } = useParams();
  console.log(operatorId);
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);
  // const { setRealtime } = useDrivers();
  const [driverList, setDriverList] = useState(null);
  const handleDeleteDriver = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        setIsLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/user/${id}`, {
            method: "DELETE",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          });
          const res = await response.json();
          console.log(res);
          res?.status === 200
            ? Swal.fire("Deleted!", "Driver has been deleted.", "success")
            : Swal.fire("Error!", "Something went wrong.", "error");
          setIsLoading(false);
          setRealtime((prev) => !prev);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(
          `${BASE_URL}/drivers/all?operatorId=${operatorId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
            // body: JSON.stringify({
            //   operatorId: operatorId,
            // }),
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setDriverList(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, operatorId, realtime]);
  console.log(driverList);
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
            text: "Drivers has been blocked",
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
            text: "Drivers has been unblocked",
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
  const blockDriver = async (user) => {
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
            text: "Driver has been blocked",
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
  const unblockDriver = async (user) => {
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
            text: "Driver has been unblocked",
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

  return (
    <>
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
        title="All Drivers"
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Drivers"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Drivers"),
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
          driverList === null
            ? []
            : driverList.map((driver, i) => ({
                ...driver,
                sl: i + 1,
                cityName: driver?.city?.name,
                currentTimestamp: moment(driver?.createdAt).format("ll"),
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
        isLoading={driverList === null || isLoading}
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
                        {displayName}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Phone",
            field: "phoneNumber",
            hidden: true,
            export: true,
          },
          {
            title: "Email",
            field: "email",
            hidden: true,
            export: true,
          },
          {
            title: "dateOfBirth",
            field: "dateOfBirth",
            hidden: true,
            export: true,
          },
          {
            title: "City",
            field: "cityName",
          },
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
            hidden: true,
            export: true,
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
                  title={row?.isBlocked ? "Unblock Driver" : "Block Driver"}
                >
                  <IOSSwitch
                    size="small"
                    checked={row?.isBlocked === true ? true : false}
                    onChange={
                      row?.isBlocked === true
                        ? () => unblockDriver(row?._id)
                        : () => blockDriver(row?._id)
                    }
                  />
                </Tooltip>
              </>
            ),
            // render: (row) => (
            //   <>
            //     <Chip
            //       size="small"
            //       variant="outlined"
            //       color="secondary"
            //       label={row?.status}
            //     />
            //   </>
            // ),
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
                  {/* <Tooltip title="View Vehicles">
                    <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "blueViolet",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/driver-vehicle-list/${row._id}`)
                      }
                      // onClick={() => setOpenVehicleInfoDrawer(row)}
                    >
                      <TwoWheeler />
                    </Avatar>
                  </Tooltip> */}
                  <Tooltip title="View Driver History">
                    <Avatar
                      variant="rounded"
                      onClick={() => navigate(`/driver-history/${row._id}`)}
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
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "lawngreen",
                        cursor: "pointer",
                      }}
                    >
                      <DocumentScanner sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Delete Driver">
                    <Avatar
                      variant="rounded"
                      onClick={() => handleDeleteDriver(row?._id)}
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

          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        actions={[
          {
            tooltip: "Send notification to all selected Drivers",
            icon: "send",
            onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Block all selected Drivers",
            icon: "block",
            onClick: (evt, data) => handleBlockAll(data.map((d) => d._id)),
          },
          {
            tooltip: "Unblock all selected Drivers",
            icon: "done",
            onClick: (evt, data) => handleUnblockAll(data.map((d) => d._id)),
          },
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
                  {/* <Typography variant="body1" gutterBottom align="left">
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
                  </Typography> */}
                  <Typography variant="body1" gutterBottom align="left">
                    Country:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.country?.name}
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
