import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { useBookings } from "hooks";
import moment from "moment";
const Bookings = () => {
  const { bookings } = useBookings();
  console.log(bookings);

  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          // selection: "true",
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Bookings"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Bookings"),
            },
          ],
        }}
        title={"All Bookings"}
        data={
          bookings === null
            ? []
            : bookings?.map((booking, i) => ({
                ...booking,
                sl: i + 1,
                End: moment(booking?.eventDate?.end).format("lll"),
                Start: moment(booking?.eventDate?.start).format("lll"),
                startDate: booking?.eventDate?.start,
                endDate: booking?.eventDate?.end,
                currentTimestamp: moment(booking?.timestamp).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          {
            title: "City",
            field: "cityName",
            searchable: true,
          },
          {
            title: "Start Date",
            field: "startDate",
            render: ({ startDate }) => moment(startDate).format("lll"),
            searchable: true,
            export: false,
            // type: "",
          },
          {
            title: "End Date",
            field: "endDate",
            render: ({ endDate }) => moment(endDate).format("lll"),
            export: false,
            // type: "numeric",
          },
          {
            title: "Start",
            field: "Start",
            searchable: true,
            export: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "End",
            field: "End",
            export: true,
            searchable: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "Booking Price",
            field: "bookingPrice",
            searchable: true,
          },
          {
            title: "Status",
            field: "status",
            searchable: true,
            render: ({ status }) =>
              status === "confirm" ? (
                <Chip variant="filled" color="success" label={status}></Chip>
              ) : status === "pending" ? (
                <Chip variant="filled" color="warning" label={status}></Chip>
              ) : status === "cancel" ? (
                <Chip variant="filled" color="error" label={status}></Chip>
              ) : (
                <Chip variant="filled" color="primary" label={status}></Chip>
              ),
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
        ]}
        detailPanel={[
          {
            tooltip: "View Artist and User",
            icon: "local_activity",
            openIcon: "visibility",
            render: ({ rowData }) => (
              <>
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
                      maxWidth: 550,
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
                      <Grid container>
                        <Grid item lg={6}>
                          {" "}
                          <h2
                            style={{
                              marginBottom: "5px",
                              color: "#c91c83",
                              // textAlign: "center",
                            }}
                          >
                            Artist Information
                          </h2>
                          {/* <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#40559b",
                          wordWrap: "break-word",
                        }}
                      >
                        {rowData.message}
                      </Typography> */}
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                              justifyContent: "center",
                            }}
                          >
                            <ListItem alignItems="flex-start">
                              {/* <ListItemAvatar sx={{ textAlign: "center" }}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src="/static/images/avatar/1.jpg"
                                />
                              </ListItemAvatar> */}
                              <ListItemText
                                sx={{ textAlign: "" }}
                                primary={`${rowData.artist.firstName} ${rowData?.artist?.lastName}`}
                                secondary={
                                  <>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {rowData?.artist?.email}
                                      <br />
                                      {rowData?.artist?.phoneNumber}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item lg={6}>
                          {" "}
                          <h2 style={{ marginBottom: "5px", color: "#c91c83" }}>
                            User Information
                          </h2>
                          {/* <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#40559b",
                          wordWrap: "break-word",
                        }}
                      >
                        {rowData.message}
                      </Typography> */}
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <ListItem alignItems="flex-start">
                              {/* <ListItemAvatar>
                                <Avatar
                                  alt="Remy Sharp"
                                  src="/static/images/avatar/1.jpg"
                                />
                              </ListItemAvatar> */}
                              <ListItemText
                                primary={`${rowData?.user?.firstName} ${rowData?.user?.lastName}`}
                                secondary={
                                  <>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {rowData?.user?.email}
                                      <br />
                                      {rowData?.user?.phoneNumber}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
                {/* <MaterialTable
                  data={(rowData?.subcategories).map((subCategory, i) => ({
                    ...subCategory,
                    sl: i + 1,
                  }))}
                  title={`Sub Category of  ${rowData.title}`}
                  columns={[
                    {
                      title: "#",
                      field: "sl",
                      editable: "never",
                    },
                    {
                      title: "Sub Category ",
                      field: "title",
                    },

                    {
                      title: "TimeStamp",
                      field: "timestamp",
                      editable: "never",
                      render: ({ timestamp }) =>
                        moment(timestamp).format("lll"),
                    },
                  ]}
                  options={{
                    exportAllData: true,
                    detailPanelColumnAlignment: "right",
                    exportMenu: [
                      {
                        label: "Export Users Data In CSV",
                        exportFunc: (cols, data) =>
                          ExportCsv(cols, data, "Universities"),
                      },
                      {
                        label: "Export Users Data In PDF",
                        exportFunc: (cols, data) =>
                          ExportPdf(cols, data, "Universities"),
                      },
                    ],
                    // selection: true,
                    actionsColumnIndex: -1,
                  }}
                  editable={{
                    onRowAdd: async (data) => {
                      const CategoryID = rowData?._id;
                      const formdata = new FormData();
                      formdata.append("subCategory", data?.title);
                      formdata.append("icon", data?.iconUrl?.target?.files[0]);
                      formdata.append("categoryId", CategoryID);
                      try {
                        const result = await fetch(
                          `${BASE_URL}/sub-category/create`,
                          {
                            method: "POST",
                            body: formdata,
                          }
                        );
                        const res = await result.json();
                        console.log(res);
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
                        Swal.fire({ icon: "error", text: error.message });
                        console.log(error);
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                    },
                    onRowUpdate: async (newData, oldData) => {
                      const formdata = new FormData();
                      oldData?.iconUrl !== newData.iconUrl &&
                        formdata.append(
                          "icon",
                          newData?.iconUrl?.target?.files[0]
                        );
                      formdata.append("subcategoryId", oldData?._id);
                      formdata.append("newSubCategoryName", newData?.title);
                      try {
                        const result = await fetch(
                          `${BASE_URL}/sub-category/update`,
                          {
                            method: "PUT",
                            body: formdata,
                          }
                        );
                        const res = await result.json();
                        console.log(res);
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
                        console.log(error);
                        Swal.fire({ icon: "error", text: error.message });
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                      console.log(newData);
                    },
                    onRowDelete: async (oldData) => {
                      console.log(oldData._id);
                      try {
                        const result = await fetch(
                          `${BASE_URL}/sub-category/delete`,
                          {
                            method: "DELETE",
                            body: JSON.stringify({
                              id: [oldData?._id],
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const res = await result.json();
                        console.log(res);
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
                  style={{
                    boxShadow: "#6a1b9a3d 0px 8px 16px 0px",
                    borderRadius: "8px",
                  }}
                  isLoading={!rowData?.subcategories}
                /> */}
              </>
            ),
          },

          // {
          //   icon: "local_hotel",
          //   openIcon: "local_hotel",
          //   tooltip: "Property Rooms",
          //   render: (rowData) => <Rooms roomCategory={rowData} />,
          // },
        ]}
        // editable={{
        //   onRowAdd: async (data) => {
        //     try {
        //       const result = await fetch(`${BASE_URL}/crowd/create`, {
        //         method: "POST",
        //         body: JSON.stringify({
        //           min: data?.min,
        //           max: data?.max,
        //         }),
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        //       const res = await result.json();
        //       console.log(res);
        //       result.status === 200
        //         ? Swal.fire({ icon: "success", text: res.success.message })
        //         : Swal.fire({ icon: "error", text: res.error.message });
        //     } catch (error) {
        //       Swal.fire({ icon: "error", text: error.message });
        //       console.log(error);
        //     } finally {
        //       setRealtime((prev) => !prev);
        //     }
        //   },
        //   onRowUpdate: async (newData, oldData) => {
        //     try {
        //       const result = await fetch(`${BASE_URL}/crowd/update`, {
        //         method: "PUT",
        //         body: JSON.stringify({
        //           crowdId: oldData._id,
        //           min: newData?.min,
        //           max: newData?.max,
        //         }),
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        //       const res = await result.json();
        //       console.log(res);
        //       result.status === 200
        //         ? Swal.fire({ icon: "success", text: res?.success?.message })
        //         : Swal.fire({ icon: "error", text: res.error.message });
        //     } catch (error) {
        //       console.log(error);
        //       Swal.fire({ icon: "error", text: error.message });
        //     } finally {
        //       setRealtime((prev) => !prev);
        //     }
        //     console.log(newData);
        //   },
        //   onRowDelete: async (oldData) => {
        //     try {
        //       const result = await fetch(`${BASE_URL}/crowd/delete`, {
        //         method: "DELETE",
        //         body: JSON.stringify({
        //           crowdIds: [oldData?._id],
        //         }),
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        //       const res = await result.json();
        //       console.log(res);
        //       result.status === 200
        //         ? Swal.fire({ icon: "success", text: res?.success?.message })
        //         : Swal.fire({ icon: "error", text: res.error.message });
        //     } catch (error) {
        //       Swal.fire({ icon: "error", text: error.message });
        //       console.log(error);
        //     } finally {
        //       setRealtime((prev) => !prev);
        //     }
        //   },
        // }}
        // actions={[
        //   {
        //     tooltip: "Delete all",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?._id)),
        //   },
        // ]}
        isLoading={bookings === null}
      />
    </div>
  );
};

export default Bookings;
