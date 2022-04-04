import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { SendReply } from "components/dialog";
import { useRatings } from "hooks";
import moment from "moment";
import { useState } from "react";
const RidersRating = () => {
  const { ratings } = useRatings();
  console.log(ratings);

  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);

  const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "" }}>
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
                ExportPdf(cols, datas, "Drivers Rating"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Drivers Rating"),
            },
          ],
        }}
        title={"Riders Rating"}
        data={
          ratings === null
            ? []
            : ratings?.map((rating, i) => ({
                ...rating,
                sl: i + 1,
                currentTimestamp: moment(rating.createdAt).format("LL"),
                rideId: rating?.ride?._id,
                driverImg: rating?.driver?.photoURL,
                driverName: rating?.driver?.displayName,
                driverEmail: rating?.driver?.email,
                driverPhone: rating?.driver?.phoneNumber,
                riderImg: rating?.rider?.photoURL,
                riderName: rating?.rider?.displayName,
                riderEmail: rating?.rider?.email,
                riderPhone: rating?.rider?.phoneNumber,
              }))
        }
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
            field: "riderName",
            render: ({ riderName, riderEmail, riderPhone, riderImg }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={riderImg} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={riderName}
                    // secondary={email}
                    secondary={riderPhone}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Rider Phone",
            field: "riderPhone",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Drivers Profile",
            tooltip: "Profile",
            searchable: true,
            field: "driverName",
            render: ({ driverName, driverEmail, driverPhone, driverImg }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={driverImg} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={driverName}
                    // secondary={email}
                    secondary={driverPhone}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Driver Phone",
            field: "driverPhone",
            searchable: true,
            hidden: true,
            export: true,
          },

          // {
          //   title: "Phone",
          //   field: "phoneNumber",
          //   width: "5%",
          // },
          {
            title: "Ratings",
            field: "driverRating",
            type: "numeric",
            searchable: true,
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
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
            field: "riderReview",
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
                    {rowData?.riderReview}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
        isLoading={ratings === null}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </div>
  );
};

export default RidersRating;
