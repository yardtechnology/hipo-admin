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
import { BASE_URL } from "configs";
import { useRatings } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import Swal from "sweetalert2";
const RidersRating = () => {
  const tableRef = React.createRef();
  const [loading, setLoading] = useState(false);
  const { ratings, setRealtime, fetchRatings } = useRatings();

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleBulkDelete = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/rating/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          ids: data,
        }),
      });
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Rating Deleted Successfully",
          })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      console.log(res.error.message);
      setLoading(false);
      setRealtime((prev) => !prev);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div style={{ marginTop: "" }}>
      <MaterialTable
        options={{
          selection: "true",
          detailPanelColumnAlignment: "right",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Riders Rating"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Riders Rating"),
            },
          ],
        }}
        title={"Riders Rating"}
        // data={async (query) => {
        //   const data = await fetchRatings(
        //     query?.pageSize,
        //     query?.page,
        //     query?.totalCount
        //   );
        //   console.log(data);
        //   return data === null
        //     ? []
        //     : data?.map((rating, i) => ({
        //         ...rating,
        //         sl: i + 1,
        //         currentTimestamp: moment(rating.createdAt).format("LL"),
        //         rideId: rating?.ride?._id,
        //         driverImg: rating?.driver?.photoURL,

        //         driverName: rating?.driver?.displayName,
        //         driverEmail: rating?.driver?.email,
        //         driverPhone: rating?.driver?.phoneNumber,
        //         riderImg: rating?.rider?.photoURL,
        //         riderName: rating?.rider?.displayName,
        //         riderEmail: rating?.rider?.email,
        //         riderPhone: rating?.rider?.phoneNumber,
        //       }));
        // }}
        // data={(query) =>
        //   new Promise((resolve, reject) => {
        //     let url = `${BASE_URL}/ratings/all?`;
        //     url += "limit=" + query.pageSize;
        //     url += "&skip=" + query.page * query.pageSize;
        //     fetch(url, {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        //       },
        //     })
        //       .then((response) => response.json())
        //       .then((result) => {
        //         console.log(result);
        //         resolve({
        //           data: result?.data?.map((rating, i) => ({
        //             ...rating,
        //             sl: query.page * query.pageSize + i + 1,
        //             currentTimestamp: moment(rating.createdAt).format("LL"),
        //             rideId: rating?.ride?._id,
        //             driverImg: rating?.driver?.photoURL,
        //             driverName: rating?.driver?.displayName,
        //             driverEmail: rating?.driver?.email,
        //             driverPhone: rating?.driver?.phoneNumber,
        //             riderImg: rating?.rider?.photoURL,
        //             riderName: rating?.rider?.displayName,
        //             riderEmail: rating?.rider?.email,
        //             riderPhone: rating?.rider?.phoneNumber,
        //           })),
        //           page: query?.page,
        //           totalCount: 12,
        //         });
        //       });
        //   })
        // }
        data={async (query) => {
          const data = await fetchRatings(
            query?.pageSize,
            query?.page,
            query?.totalCount
          );
          // console.log(data);
          return {
            data:
              query?.search?.length > 0
                ? data?.data === undefined
                  ? []
                  : data?.data
                      ?.map((rating, i) => ({
                        ...rating,
                        sl: query.page * query.pageSize + i + 1,
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
                      ?.filter(
                        (rating) =>
                          rating?.driverName
                            ?.toLowerCase()
                            ?.includes(query?.search?.toLowerCase()) ||
                          rating?.riderName
                            ?.toLowerCase()
                            ?.includes(query?.search?.toLowerCase()) ||
                          rating?.rideId
                            ?.toLowerCase()
                            ?.includes(query?.search?.toLowerCase()) ||
                          rating?.riderPhone
                            ?.toString()
                            ?.includes(query?.search?.toString()) ||
                          rating?.driverPhone
                            ?.toString()
                            ?.includes(query?.search?.toString()) ||
                          rating?.driverEmail
                            ?.toLowerCase()

                            ?.includes(query?.search?.toLowerCase()) ||
                          rating?.riderEmail
                            ?.toLowerCase()
                            ?.includes(query?.search?.toLowerCase()) ||
                          rating?.driverRating
                            .toString()
                            ?.includes(query?.search?.toString())
                      )
                : data?.data === undefined
                ? []
                : data?.data?.map((rating, i) => ({
                    ...rating,
                    sl: query.page * query.pageSize + i + 1,
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
                  })),
            page: query?.page,
            totalCount: data?.totalCount,
          };
        }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          // {
          //   title: "Ride Id",
          //   field: "rideId",
          //   export: true,
          //   searchable: true,
          //   width: "15%",
          // },
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
            field: "createdAt",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
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
          onRowDelete: async (oldData) => {
            try {
              const res = await fetch(`${BASE_URL}/rating/${oldData?._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
              });
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Rating Deleted Successfully",
                    icon: "success",
                  })
                : Swal.fire({
                    text: res?.message,
                    icon: "error",
                  });
            } catch (err) {
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        actions={[
          {
            tooltip: "Delete selected riders",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(
                data.map((data) => data?._id),
                setRealtime((prev) => !prev)
              ),
          },
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
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
        isLoading={ratings === null || loading}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </div>
  );
};

export default RidersRating;
