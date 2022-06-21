import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@ashirbad/js-core";
import InvoiceDrawer from "components/InvoiceDrawer";
import { useEffect, useState } from "react";
import { Done, Money, PictureAsPdf } from "@mui/icons-material";
import { StatementInvoice } from "components/dialog";
import { useTotalRevenue } from "hooks";
import { BASE_URL } from "configs";
import { Card as DashboardCard } from "components/dashboard";
import React from "react";

import { DateRangePicker } from "materialui-daterange-picker";
const TotalRevenue = () => {
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  const [openStatementInvoice, setOpenStatementInvoice] = useState(false);
  const { fetchData, rideData } = useTotalRevenue();
  console.log(rideData);
  const downloadPdf = async (data) => {
    console.log(data);
    const response = await fetch(
      `${BASE_URL}/ride-invoice/download/${data?._id}`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      }
    );
    const blob = await response.blob();
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    window.open(url, "", "width=800,height=500").print();
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `${data?._id}.pdf`);
    // document.body.appendChild(link);
    // link.click();
  };
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({
    label: "Today",
    startDate: "Tue Jun 14 2022 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Tue Jun 14 2022 00:00:00 GMT+0530 (India Standard Time)",
  });

  const toggle = () => setOpen(!open);
  console.log(dateRange);
  useEffect(() => {
    fetchData(dateRange?.startDate, dateRange?.endDate);
  }, [fetchData, dateRange]);
  return (
    <div>
      <InvoiceDrawer
        rideDetails={openInvoiceDrawer}
        setOpenInvoiceDrawer={setOpenInvoiceDrawer}
      />
      {/* <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 1,
          mr: 1,
        }}
      >
        Today's Revenue
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 1,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Choose Date Range
      </Button>
      <div>
        <DateRangePicker
          wrapperClassName="date-range-picker-wrapper"
          closeOnClickOutside={true}
          open={open}
          toggle={toggle}
          onChange={(range) => setDateRange(range)}
          definedRanges={[
            // {
            //   label: "Today",
            //   startDate: new Date(),
            //   endDate: new Date(),
            // },
            {
              label: "Yesterday",
              startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
              endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
            {
              label: "Last 7 Days",
              startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
              endDate: new Date(),
            },
            {
              label: "Last 15 Days",
              startDate: new Date(
                new Date().setDate(new Date().getDate() - 15)
              ),
              endDate: new Date(),
            },
            {
              label: "Last 30 Days",
              startDate: new Date(
                new Date().setDate(new Date().getDate() - 30)
              ),
              endDate: new Date(),
            },
            {
              label: "This Month",
              startDate: new Date(new Date().setDate(1)),
              endDate: new Date(),
            },
            {
              label: "Last Month",
              startDate: new Date(new Date().setDate(1)),
              endDate: new Date(new Date().setDate(1)),
            },
            {
              label: "Last 365 Days",
              startDate: moment().subtract(365, "days").toDate(),
              endDate: moment().toDate(),
            },
          ]}
        />
      </div>
      <Grid container spacing={2} sx={{ marginBottom: "5vh" }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DashboardCard
            title={
              rideData?.metadata?.totalFare
                ? formatCurrency(rideData?.metadata?.totalFare)
                : "00"
            }
            subtitle="Revenue"
            icon={<Money className="iconColor" />}
            // iconAction={<MoreVert sx={{ color: "snow" }} />}
            menuName={"total revenue"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <DashboardCard
            title={
              rideData?.metadata?.totalCompletedRide ||
              // ? rideData?.metaData?.totalCompletedRide
              "00"
            }
            subtitle="Completed Rides"
            icon={<Done className="iconColor" />}
            iconAction={"/rides/completed-rides"}
            menuName={"view Completed Rides"}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={
              rideData?.metadata?.totalRide ||
              // ? rideData?.metadata?.totalRides
              "00"
            }
            subtitle="Total Rides"
            icon={<DirectionsCar className="iconColor" />}
            iconAction={"/vehicles"}
            menuName={"view Total Rides"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={
              // rideData?.metadata?.totalCancelledRides
              rideData?.metadata?.totalCancelledRide || "00"
            }
            subtitle="Cancelled Rides"
            icon={<Cancel className="iconColor" />}
            iconAction={<MoreVert sx={{ color: "snow" }} />}
            menuName={"View Cancelled Rides"}
          />
        </Grid> */}
      </Grid>

      <MaterialTable
        options={{
          whiteSpace: "nowrap",
          selection: "true",
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Daily Statement"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Daily Statement"),
            },
          ],
        }}
        title={"Ride Statement"}
        // data={[
        //   {
        //     sl: 1,
        //     city: "Bhubaneswar",
        //     noOfRides: "4",
        //     period: "Monthly",
        //     country: "India",
        //     role: "Driver",
        //     rideId: "1234567890",
        //     incentiveAmount: 200,
        //     earned: formatCurrency(200),
        //     range: "",
        //     zipCode: 751030,
        //     status: "Completed",
        //     pick: "Acharya vihar,Bhubaneswar",
        //     drop: "Niladri vihar ,Bhubaneswar",
        //   },
        // ]}
        data={
          rideData?.rideData === null
            ? []
            : rideData?.rideData?.map((ride, index) => {
                return {
                  ...ride,
                  sl: index + 1,
                  city: ride.city,
                  noOfRides: ride.noOfRides,
                  period: ride.period,
                  country: ride.country,
                  role: ride.role,
                  rideId: ride.rideId,
                  incentiveAmount: ride.incentiveAmount,
                  earned: formatCurrency(ride.incentiveAmount),
                  range: ride.range,
                  zipCode: ride.zipCode,
                  status: ride.status,
                  pick: ride.pick,
                  drop: ride.drop,
                };
              })
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

            searchFable: true,
          },
          {
            title: "Amount",
            field: "amount",
            render: (rowData) => {
              return formatCurrency(rowData?.amount);
            },
            searchable: true,
          },
          {
            title: "Payment Method",
            field: "paymentMethod",
            searchable: true,
          },
          {
            title: "Pickup Time",
            field: "pickup_time",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Drop Time",
            field: "drop_time",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Pickup Address",
            field: "pickupAddress",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Drop Address",
            field: "dropAddress",
            searchable: true,
            hidden: true,
            export: true,
          },

          // {
          //   title: "Status",
          //   field: "status",
          //   render: (row) => (
          //     <>
          //       <Chip
          //         size="small"
          //         variant="outlined"
          //         color="secondary"
          //         label={row?.status}
          //       />
          //     </>
          //   ),
          // },
          {
            title: "Timestamp",
            // width: "70%",
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
            searchable: true,
            // hidden: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
          {
            title: "Actions",
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  {" "}
                  {/* <Tooltip title="View Details"> */}
                  {/* <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "blueViolet",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                      // onClick={() => setOpenAddressDrawer(row)}
                    > */}
                  {/* <IconButton
                      onClick={() => setOpenStatementInvoice(row)}
                      sx={{ mr: 1, cursor: "pointer" }}
                    >
                      {" "}
                      <Visibility sx={{ color: "#1877f2" }} />
                    </IconButton> */}
                  {/* </Avatar> */}
                  {/* </Tooltip> */}
                  {row?.status === "COMPLETED" && (
                    <Tooltip title="Download Invoice">
                      {/* <Avatar
                      variant="rounded"
                      sx={{
                        padding: " 0px !important",
                        backgroundColor: "#1877f2",
                        mr: ".4vw",
                        cursor: "pointer",
                      }}
                    > */}
                      <IconButton onClick={() => downloadPdf(row)}>
                        <PictureAsPdf sx={{ color: "#1877f2" }} />
                      </IconButton>

                      {/* </Avatar> */}
                    </Tooltip>
                  )}
                </div>
              </>
            ),
          },
        ]}
        actions={
          [
            // {
            //   tooltip: "Send notification to all selected users",
            //   icon: "send",
            //   onClick: (evt, data) => setSelectedUsers(data),
            // },
            //   {
            //     tooltip: "Turn On for Selected Cities",
            //     icon: "toggle_on",
            //     // onClick: (evt, data) => setSelectedUsers(data),
            //   },
          ]
        }
        // editable={{
        //   //   onRowAdd: async (data) => {},
        //   //   onRowUpdate: async (newData, oldData) => {},
        //   onRowDelete: async (oldData) => {},
        // }}
        // actions={[
        //   {
        //     tooltip: "Delete all selected Days",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?.day)),
        //   },
        // ]}
        isLoading={rideData?.rideData === null}
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
                  {/* <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    align="left"
                  >
                    Ride Id:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {rowData?.rideId}
                    </span>
                  </Typography> */}
                  <Typography variant="body1" gutterBottom align="left">
                    Pickup Time:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickupTime
                        ? moment(rowData?.pickupTime).format("lll")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Time:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropTime
                        ? moment(rowData?.dropTime).format("lll")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickupLocation?.address}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropLocation?.address}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
      />
      <StatementInvoice
        selectedDetails={openStatementInvoice}
        handleClose={() => setOpenStatementInvoice([])}
      />
    </div>
  );
};

export default TotalRevenue;
