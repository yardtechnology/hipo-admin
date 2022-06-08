import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { History, LocationCity, PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Switch,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { AddressDrawer, ReferralDrawer } from "components";
import { SendNotification } from "components/dialog";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useRiders } from "hooks";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
const Riders = () => {
  const tableRef = React.createRef();
  const { riders, realtime, setRealtime, fetchRiders } = useRiders();
  // console.log(riders);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddressDrawer, setOpenAddressDrawer] = useState(false);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const navigate = useNavigate();
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
      // console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Users has been blocked",
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
      // tableRef.current && tableRef.current.onQueryChange();
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
      // console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "Users has been unblocked",
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
  const blockUser = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: [user?._id],
          isBlocked: !user.isBlocked,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      // console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "User has been blocked",
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
      fetchRiders();
      setRealtime((prev) => !prev);
      // tableRef.current && tableRef.current.onQueryChange();
    }
  };
  const unblockUser = async (user) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/all/status-change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          userIds: [user?._id],
          isBlocked: !user.isBlocked,
        }),
      });
      setIsLoading(false);
      const res = await response.json();
      // console.log(res);
      res.status === 200
        ? Swal.fire({
            title: "Success",
            text: "User has been unblocked",
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
      // tableRef.current.onQueryChange();
    }
  };
  return (
    <>
      <AddressDrawer
        open={openAddressDrawer}
        setOpenAddressDrawer={setOpenAddressDrawer}
      />
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <MaterialTable
        title="Riders"
        tableRef={tableRef}
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
        // data={
        //   riders === null
        //     ? []
        //     : riders?.map((rider, index) => ({
        //         ...rider,
        //         sl: index + 1,
        //         timeStamp: moment(rider?.createdAt).format("lll"),
        //         lastLogin: rider?.loginInfo?.createdAt,
        //         lastLoginInfo: moment(rider?.loginInfo?.createdAt).format(
        //           "MMMM Do YYYY, h:mm:ss a"
        //         ),
        //       }))
        // }
        data={async (query) => {
          const riders = await fetchRiders(
            query?.pageSize,
            query?.page,
            query?.totalCount,
            realtime
          );
          return {
            data: riders?.data?.map((rider, index) => ({
              ...rider,
              sl: index + 1,
              timeStamp: moment(rider?.createdAt).format("lll"),
              lastLogin: rider?.loginInfo?.createdAt,
              lastLoginInfo: moment(rider?.loginInfo?.createdAt).format(
                "MMMM Do YYYY, h:mm:ss a"
              ),
            })),
            page: query?.page,
            totalCount: riders?.totalCount,
          };
        }}
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
            field: "displayName",
            render: ({ photoURL, displayName, email, isOnline }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      color={isOnline ? "success" : "error"}
                      variant="dot"
                      invisible={!isOnline}
                    >
                      <Avatar
                        alt={displayName}
                        src={photoURL}
                        variant="circle"
                      />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={
                      <Typography sx={{}} component="h6" variant="subtitle2">
                        {email} <br />
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Email",
            field: "email",
            hidden: true,
            export: true,
            searchable: true,
          },
          {
            title: "Phone",
            field: "phoneNumber",
            searchable: true,
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
                <Tooltip title={row?.isBlocked ? "Unblock User" : "Block User"}>
                  <IOSSwitch
                    size="small"
                    checked={row?.isBlocked}
                    onChange={(e) => {
                      // console.log(e.target.checked);
                      if (e.target.checked) {
                        blockUser(row);
                      } else {
                        unblockUser(row);
                      }
                    }}
                  />
                </Tooltip>
              </>
            ),
            searchable: true,
          },
          {
            title: "Created At",
            field: "timeStamp",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            emptyValue: "--",
          },
          {
            title: "Last Login",
            field: "lastLoginInfo",
            render: ({ lastLogin }) =>
              lastLogin ? moment(lastLogin).fromNow() : "--",
            emptyValue: "--",
            searchable: true,
          },

          {
            export: false,
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
                      onClick={() => navigate(`/ride-history/${row._id}`)}
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
            onClick: (evt, data) => setSelectedUsers(data.map((d) => d._id)),
          },
          {
            tooltip: "Block all selected users",
            icon: "block",
            onClick: (evt, data) => handleBlockAll(data.map((d) => d._id)),
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Unblock all selected users",
            icon: "done",
            onClick: (evt, data) => handleUnblockAll(data.map((d) => d._id)),
            // onClick: (evt, data) => setSelectedUsers(data),
          },
        ]}
        isLoading={riders === null || isLoading}
      />
      <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default Riders;
