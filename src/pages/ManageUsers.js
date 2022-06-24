import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Visibility } from "@mui/icons-material";
// import { Block, Check } from "@mui/icons-material";

import {
  Avatar,
  Button,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { SendNotification, Details } from "components/dialog";
import { BASE_URL } from "configs";
import { useUsers } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const ManageUsers = () => {
  const { users, setRealtime } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState({});
  const userBlock = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/user/account-status`, {
        method: "POST",
        body: JSON.stringify({
          id: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      res.status === 200
        ? Swal.fire({ icon: "success", text: res?.success?.message })
        : Swal.fire({ icon: "error", text: res?.error?.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          selection: true,
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Customers"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Customers"),
            },
          ],
        }}
        title={"Users"}
        data={
          users === null
            ? []
            : users.map((user, i) => ({
                ...user,
                sl: i + 1,
                currentTimestamp: moment(user?.timestamp).format("lll"),
              }))
        }
        columns={[
          { field: "sl", title: "#", width: 10 },
          // { title: "Name", field: "name" },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "30%",
            field: "firstName",
            render: ({
              profileImageUrl,
              firstName,
              lastName,
              email,
              phoneNumber,
            }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={profileImageUrl} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {firstName + " " + lastName || "Not Provided"}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={
                      <Typography
                        sx={{}}
                        component="details"
                        variant="subtitle2"
                      >
                        {email || "Not Provided"} <br />
                        {phoneNumber || "Not Provided"}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Name",
            field: "",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Phone",
            searchable: true,
            hidden: true,
            export: true,
            field: "phoneNumber",
          },
          {
            title: "Location",
            searchable: true,
            field: "location",
            width: "10%",
          },
          // { title: "Country", searchable: true, field: "country" },
          { title: "Gender", searchable: true, field: "gender", width: "10%" },
          { title: "Role", searchable: true, field: "role", width: "10%" },
          {
            title: "Exp",
            searchable: true,
            field: "yearsOfExperience",
            width: "10%",
            type: "numeric",
          },
          {
            title: "Status",
            searchable: true,
            field: "status",

            // render: (row) => (
            //   <>
            //     {row.status ? (
            //       <Button size="small" variant="contained" color="secondary">
            //         Blocked
            //       </Button>
            //     ) : (
            //       <Button size="small" variant="contained" color="Primary">
            //         UnBlocked
            //       </Button>
            //     )}
            //   </>
            // ),
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
          //   title: "Block",
          //   searchable: true,
          //   field: "status",

          //   // render: (row) => (
          //   //   <>
          //   //     {row.status ? (
          //   //       <Button size="small" variant="contained" color="secondary">
          //   //         Blocked
          //   //       </Button>
          //   //     ) : (
          //   //       <Button size="small" variant="contained" color="Primary">
          //   //         UnBlocked
          //   //       </Button>
          //   //     )}
          //   //   </>
          //   // ),
          //   render: (row) => (
          //     <>
          //       <Button
          //         size="small"
          //         variant="contained"
          //         color="secondary"
          //         startIcon={<Block />}
          //       >
          //         block
          //       </Button>
          //     </>
          //   ),
          // },
          {
            export: false,
            // title: "Details",
            tooltip: "view Details",
            width: "5%",
            render: (row) =>
              row.role === "artist" ? (
                <Tooltip title="View Details">
                  <IconButton onClick={() => setSelectedDetails(row)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
              ) : row?.role === "manager" ? (
                <IconButton onClick={() => setSelectedDetails(row)}>
                  <Visibility />
                </IconButton>
              ) : (
                ""
              ),
          },
          {
            title: "Manage",
            searchable: true,
            field: "status",
            width: "10%",
            render: (row) => (
              <>
                {row?.status === "active" ? (
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none", padding: "4px 6px" }}
                    color="secondary"
                    onClick={() => userBlock(row._id)}
                  >
                    Unblocked
                  </Button>
                ) : row?.status === "blocked" ? (
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none", padding: "4px 6px" }}
                    color="error"
                    onClick={() => userBlock(row._id)}
                  >
                    Blocked
                  </Button>
                ) : row?.status === "pending" ? (
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none", padding: "5px 7px" }}
                    color="info"
                    onClick={() => userBlock(row._id)}
                  >
                    Approve
                  </Button>
                ) : (
                  ""
                )}
              </>
            ),
            // render: (row) => (
            //   <>
            //     {
            //       <Chip
            //         size="small"
            //         variant="filled"
            //         color="secondary"
            //         label={row?.status}
            //       />
            //     }
            //   </>
            // ),
          },
          {
            title: "Timestamp",
            searchable: true,
            field: "timestamp",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
            export: false,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            export: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
          // { title: "Updated At", field: "updated_at" },
        ]}
        actions={[
          {
            tooltip: "Send notification to all selected users",
            icon: "send",
            onClick: (evt, data) => setSelectedUsers(data),
          },
          // {
          //   icon: () => <Block />,
          //   tooltip: "Block All",
          //   // onClick: (evt, data) => handleBulkBlock(data),
          // },
          // {
          //   icon: () => <Check />,
          //   tooltip: "Unblock All",
          //   // onClick: (evt, data) => handleBulkUnblock(data),
          // },
        ]}
        editable={{
          // onRowAdd: () => {},
          // onRowUpdate: () => {},
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(
                `${BASE_URL}/user/accounts-delete/${oldData._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const res = await result.json();

              result.status === 200
                ? Swal.fire({
                    icon: "success",
                    text: res.success.message,
                  })
                : Swal.fire({
                    icon: "error",
                    text: res.error.message,
                  });
            } catch (error) {
              Swal.fire({
                icon: "error",
                text: error.message,
              });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        isLoading={users === null}
      />
      <Details
        selectedDetails={selectedDetails}
        handleClose={() => setSelectedDetails({})}
      />
      <SendNotification
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </div>
  );
};

export default ManageUsers;
