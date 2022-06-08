import MaterialTable from "@material-table/core";
import { History, LocationCity, PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { AddressDrawer, ReferralDrawer } from "components";
import { SendNotification } from "components/dialog";
import { IOSSwitch } from "components/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useRiders } from "hooks";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
import { MUIOptions } from "helpers";

const Riders = () => {
  const tableRef = React.createRef();
  const { riders, fetchRiders, realtime, setRealtime } = useRiders();
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
    }
  };
  useEffect(() => {
    console.log({ realtime });
    tableRef?.current && tableRef.current.onQueryChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realtime]);
  const [txt, setTxt] = useState("");
  return (
    <>
      <MaterialTable
        onSearchChange={(search) => setTxt(search)}
        title="Riders"
        tableRef={tableRef}
        options={MUIOptions("Riders")}
        totalCount={30}
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
            data: riders?.data
              ?.filter((_) =>
                _?.displayName
                  ? true
                  : _.displayName?.toLowerCase()?.includes(txt?.toLowerCase())
              )
              ?.map((rider, index) => ({
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
        ]}
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
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
        isLoading={riders === null || isLoading}
      />
      <AddressDrawer
        open={openAddressDrawer}
        setOpenAddressDrawer={setOpenAddressDrawer}
      />
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default Riders;
