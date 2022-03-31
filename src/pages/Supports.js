import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Reply } from "@mui/icons-material";
import {
  //   Avatar,
  Card,
  CardContent,
  IconButton,
  ListItem,
  //   ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { SendReply } from "components/dialog";
import moment from "moment";
import { useState } from "react";
const Supports = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);
  const handleBulkDelete = async (data) => {};
  return (
    <>
      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Supports"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Supports"),
            },
          ],
        }}
        title={"Supports"}
        data={[
          {
            userType: "Driver",
            displayName: "Aliva Priyadarshini",
            phoneNumber: "7787654545",
            message: "Hi, I am looking for a ride from Kolkata to Delhi",
            sl: 1,
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "35%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber, email }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  {/* <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={displayName}
                    // secondary={email}
                    secondary={email}
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
            title: "User Type",
            field: "userType",
          },
          {
            title: "Message",
            field: "message",
            searchable: true,
            render: ({ message }) =>
              message?.length > 10 ? message?.slice(0, 7) + "..." : message,
            export: false,
          },
          {
            title: "Message",
            field: "message",
            searchable: true,
            hidden: true,
            export: true,
          },

          {
            title: "Timestamp",
            searchable: true,
            field: "timestamp",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
            export: false,
          },
          {
            export: false,
            title: "Reply",
            render: (row) => (
              <IconButton onClick={() => setSelectedUsers(row)}>
                <Reply />
              </IconButton>
            ),
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
        ]}
        editable={{
          onRowDelete: async (oldData) => {},
        }}
        actions={[
          {
            tooltip: "Delete all selected users",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
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
                  minWidth: 275,
                  maxWidth: 700,
                  transition: "0.3s",
                  margin: "auto",
                  borderRadius: "10px",
                  fontWeight: "bolder",
                  wordWrap: "break-word",
                  padding: "20px",
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent>
                  <h2 style={{ marginBottom: "5px", color: "#c91c83" }}>
                    Message
                  </h2>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "#40559b",
                      wordWrap: "break-word",
                    }}
                  >
                    {rowData.message}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
        // isLoading={supports === null}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </>
  );
};

export default Supports;
