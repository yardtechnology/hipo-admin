import MaterialTable from "@material-table/core";
import {
  Money,
  MoreVert,
  People,
  DirectionsCar,
  Category,
  ToggleOn,
  Cancel,
  Visibility,
  Done,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Card as DashboardCard } from "components/dashboard";
import { useBookings } from "hooks";
import moment from "moment";
import GoogleMapReact from "google-map-react";
import Chart from "react-apexcharts";
const Dashboard = () => {
  const { bookings } = useBookings();
  console.log(bookings);
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  const BOOKINGS =
    bookings === null
      ? []
      : bookings?.filter((booking) => booking?.status === "confirm");
  console.log(BOOKINGS);
  const Revenue = BOOKINGS?.reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  const janRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jan 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jan 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(janRevenue);
  const febRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Feb 29,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Feb 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(febRevenue);
  const marRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Mar 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Mar 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(marRevenue);
  const aprRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Apr 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Apr 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(aprRevenue);
  const mayRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `May 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `May 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(mayRevenue);
  const junRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jun 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jun 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(junRevenue);
  const julRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jul 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jul 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(julRevenue);
  const augRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Aug 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Aug 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(augRevenue);
  const sepRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Sep 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Sep 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(sepRevenue);
  const octRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Oct 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Oct 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(octRevenue);
  const novRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Nov 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Nov 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(novRevenue);
  const decRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Dec 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Dec 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(decRevenue);
  console.log(Revenue);

  const areaOptions = {
    series: [
      {
        name: "Total Income",
        data: [
          // janRevenue,
          // febRevenue,
          // marRevenue,
          // aprRevenue,
          // mayRevenue,
          // junRevenue,
          // julRevenue,
          // augRevenue,
          // sepRevenue,
          // octRevenue,
          // novRevenue,
          // decRevenue,
          15, 20, 18, 45, 35, 25, 14, 75, 45, 55, 45, 15,
        ],
      },
    ],
    options: {
      // colors: ["#c91c83", "#b53682", "#a84c83"],
      // colors: ["#40559b", "#57679c", "#677299"],
      title: {
        text: "Monthly Total Income",
      },
      colors: ["#1877f2"],
      chart: {
        background: "#fff",
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,

          tools: {
            zoomin: false,
            zoomout: false,
          },
          export: {
            csv: {
              filename: "Total data",
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: "Total data",
            },
            png: {
              filename: "Total data",
            },
          },
          autoSelected: "zoom",
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

  return (
    <>
      {/* <Card>
        <CardHeader
          title="Hello, Super Admin!"
          subheader="Check the latest banking stats under this beautiful dashboard!"
        />
      </Card> */}

      <section className="" style={{ marginTop: "0vh" }}>
        <Typography
          component={"h6"}
          variant="h6"
          style={{
            backgroundColor: "",
            padding: "0vh 2vh 1vh 2vh",
            marginBottom: "2vh",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Taxi Live Location
        </Typography>
        <div style={{ height: "50vh", width: "100%", marginBottom: "2vh" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyC61d5ftTpAnHONe8k5tbo4mkSmzvDNO-4",
            }}
            defaultCenter={location}
            defaultZoom={15}
          >
            <AnyReactComponent
              lat={location.lat}
              lng={location.lng}
              text="My Location"
            />
          </GoogleMapReact>
        </div>

        <Box
          class="d-flex"
          sx={{
            lg: { flexDirection: "row" },
            md: { flexDirection: "column" },
            sm: { flexDirection: "column" },
            xs: { flexDirection: "column" },
          }}
        >
          <div style={{ flex: 1, paddingRight: 5 }}>
            <Typography
              component={"h6"}
              variant="h6"
              style={{
                backgroundColor: "",
                padding: "1vh 2vh",
                marginBottom: "2vh",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Site Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={15}
                  subtitle="Riders"
                  icon={<People className="iconColor" />}
                  iconAction={"/riders"}
                  menuName={"view riders"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={12}
                  subtitle="Drivers"
                  icon={<DirectionsCar className="iconColor" />}
                  iconAction={"/drivers/all-drivers"}
                  menuName={"view drivers"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={14}
                  subtitle="Vehicle Type"
                  icon={<Category className="iconColor" />}
                  iconAction={"/vehicles"}
                  menuName={"view Vehicle Type"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={"$ " + Revenue}
                  subtitle="Revenue"
                  icon={<Money className="iconColor" />}
                  iconAction={<MoreVert sx={{ color: "snow" }} />}
                  menuName={"total revenue"}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ flex: 1, paddingLeft: 15 }}>
            <Typography
              component={"h6"}
              variant="h6"
              style={{
                backgroundColor: "",
                padding: "1vh 2vh",
                marginBottom: "2vh",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Ride Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={16}
                  subtitle="Active Rides"
                  icon={<ToggleOn className="iconColor" />}
                  iconAction={"/rides/active-rides"}
                  menuName={"view Active Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={18}
                  subtitle="Completed Rides"
                  icon={<Done className="iconColor" />}
                  iconAction={"/rides/completed-rides"}
                  menuName={"view Completed Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={21}
                  subtitle="Total Rides"
                  icon={<DirectionsCar className="iconColor" />}
                  iconAction={"/vehicles"}
                  menuName={"view Total Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={"15"}
                  subtitle="Cancelled Rides"
                  icon={<Cancel className="iconColor" />}
                  iconAction={<MoreVert sx={{ color: "snow" }} />}
                  menuName={"View Cancelled Rides"}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
        <Grid container>
          {" "}
          <Grid item xs={12} sm={12} md={12} lg={11.9} sx={{ marginTop: 3.5 }}>
            <Typography
              component={"h6"}
              variant="h6"
              style={{
                backgroundColor: "",
                padding: "1vh 2vh",
                marginBottom: "2vh",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Chart Survey
            </Typography>
            {/* <Chart
              options={{
                ...chartOptions.options,
              }}
              series={chartOptions.series}
              type="line"
              height="300"
            /> */}
            <Chart
              options={{
                ...areaOptions.options,
              }}
              series={areaOptions.series}
              type="area"
              height="300"
            />
          </Grid>
          {/* <Typography
            component={"h6"}
            variant="h6"
            style={{
              backgroundColor: "rgb(18 19 20 / 29%)",
              padding: "1vh 2vh",
              marginBottom: "2vh",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Recent Rides
          </Typography> */}
          <Grid
            item
            lg={11.9}
            md={12}
            sm={12}
            xs={12}
            sx={{ marginTop: "5vh" }}
          >
            <MaterialTable
              title="Recent Rides"
              // onSelectionChange={(data) => {
              //   setSelectedUserFCMToken({
              //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
              //     fcmToken: data?.[0]?.fcmToken || null,
              //   });
              // }}
              options={{
                // pageSize: "3",
                paging: false,
                actionsColumnIndex: -1,
                search: false,
                // selection: true,
                sorting: true,
                headerStyle: {
                  backgroundColor: "rgba(239,239,247,.7)",
                  color: "#3b3e66",
                  fontSize: 16,
                  fontWeight: 560,
                  textAlign: "left",
                  "&:hover": {
                    color: "#ff4f00 !important",
                    cursor: "pointer",
                  },
                  whiteSpace: "nowrap",
                },
                rowStyle: {
                  backgroundColor: "#fffbf2",
                  color: "#3b3e66",
                  textAlign: "left",
                },
                cellStyle: {
                  textAlign: "left",
                },
              }}
              // data={}
              columns={[
                // {
                //   title: "Sl no",
                //   field: "sl",
                //   render: (newData) => newData.tableData.id + 1,
                //   editable: "never"
                // },
                // {
                //   title: "Name",
                //   field: "displayName",
                // },
                {
                  title: "Ride Id",
                  tooltip: "Ride Id",
                  // field: "displayName",
                  // render: ({ photoURL, displayName, email }) => (
                  //   <>
                  //     <ListItem>
                  //       <ListItemAvatar>
                  //         {" "}
                  //         <Avatar src={photoURL} alt={displayName} />
                  //       </ListItemAvatar>
                  //       <ListItemText
                  //         primary={
                  //           <Typography component="span" variant="body2">
                  //             {displayName || "Not Provided"}
                  //           </Typography>
                  //         }
                  //         secondary={email}
                  //       ></ListItemText>
                  //     </ListItem>
                  //   </>
                  // ),
                },

                {
                  title: "Rider Name",
                  field: "phoneNumber",
                },
                {
                  title: "Driver Name",
                  field: "Driver Name",
                },
                {
                  title: "Pick Date/Time",
                  field: "pick",
                },
                {
                  title: "Drop Date/Time",
                  field: "drop",
                },
              ]}
              actions={[
                {
                  icon: () => <Visibility style={{ color: "#1991eb" }} />,
                  tooltip: "View All Rides ",
                  position: "toolbar",
                  // onClick: () => {
                  //   history.push("/users");
                  // },
                },
              ]}
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Dashboard;
