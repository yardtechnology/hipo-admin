import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { SendReply } from "components/dialog";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
const RidersRating = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);

  const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/">
          Reviews & Ratings
        </Link>
        <Typography color="text.primary">Riders Rating</Typography>
      </Breadcrumbs>
      <MaterialTable
        options={{
          selection: "true",
          detailPanelColumnAlignment: "right",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "RidersRating"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "RidersRating"),
            },
          ],
        }}
        title={"Riders Rating"}
        data={[
          {
            displayName: "Aliva Priyadarshini",
            phoneNumber: "7787654545",
            comments: "very good service",
            sl: 1,
            ratings: 4.5,
            rideId: "#12345",
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
            title: "Ride Id",
            field: "rideId",
            export: true,
            searchable: true,
            width: "15%",
          },
          {
            title: "Riders Profile",
            tooltip: "Profile",
            searchable: true,
            width: "30%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={displayName}
                    // secondary={email}
                    secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Drivers Profile",
            tooltip: "Profile",
            searchable: true,
            width: "30%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={displayName}
                    // secondary={email}
                    secondary={phoneNumber}
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
            title: "Ratings",
            field: "ratings",
            type: "numeric",
            width: "2%",
            searchable: true,
          },
          //   {
          //     title: "Comments",
          //     field: "comments",
          //     searchable: true,
          //     render: ({ comments }) =>
          //       comments?.length > 10 ? comments?.slice(0, 7) + "..." : comments,
          //     export: false,
          //     width: "3%",
          //   },
          {
            title: "Comments",
            field: "comments",
            searchable: true,
            hidden: true,
            export: true,
          },

          {
            title: "Time",
            searchable: true,
            field: "timestamp",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
            export: false,
          },
          //   {
          //     export: false,
          //     title: "Reply",
          //     render: (row) => (
          //       <IconButton onClick={() => setSelectedUsers(row)}>
          //         <Reply />
          //       </IconButton>
          //     ),
          //   },
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
                    Comments
                  </h2>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "#40559b",
                      wordWrap: "break-word",
                    }}
                  >
                    {rowData?.comments}
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
    </div>
  );
};

export default RidersRating;
