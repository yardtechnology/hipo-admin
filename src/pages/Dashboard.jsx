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
  DriveEta,
} from "@mui/icons-material";
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Card as DashboardCard } from "components/dashboard";
import {
  useActiveRides,
  useDashboardStatistics,
  useDriversNearby,
} from "hooks";
import moment from "moment";
import GoogleMapReact from "google-map-react";
import Chart from "react-apexcharts";
import { formatCurrency } from "@ashirbad/js-core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { activeRides } = useActiveRides();
  const { driversNearby } = useDriversNearby();
  console.log(driversNearby);
  const { adminData } = useDashboardStatistics();
  console.log(adminData?.monthlyTransaction?.timeLine);
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState({
    lat: 20.2682801,
    lng: 85.7769064,
  });
  //Get current location

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);
  console.log(currentLocation);
  const AnyReactComponent = ({ icon }) => <div>{icon}</div>;
  // const location = {
  //   address: "1600 Amphitheatre Parkway, Mountain View, california.",
  //   lat: 20.256266994936375,
  //   lng: 85.77953439361694,
  // };

  const areaOptions = {
    series: [
      {
        name: "Total Income",
        data: adminData?.monthlyTransaction?.amount,
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
        categories: adminData?.monthlyTransaction?.timeLine,
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
              key: "AIzaSyDYIlpw2g2dPkPaUhAu_CAakZzyJi-6w6s",
            }}
            defaultCenter={currentLocation}
            defaultZoom={13}
          >
            {driversNearby?.map((driver) => (
              <AnyReactComponent
                lat={driver?.currentLocation?.lat}
                lng={driver?.currentLocation?.lng}
                icon={<DriveEta sx={{ color: "Highlight" }} />}
              />
            ))}
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
                  title={adminData?.metaData?.user_data || "00"}
                  subtitle="Riders"
                  icon={<People className="iconColor" />}
                  iconAction={"/riders"}
                  menuName={"view riders"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={adminData?.metaData?.driver_data || "00"}
                  subtitle="Drivers"
                  icon={<DirectionsCar className="iconColor" />}
                  iconAction={"/drivers/all-drivers"}
                  menuName={"view drivers"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={adminData?.metaData?.operator_data || "00"}
                  subtitle="Operators"
                  icon={<Category className="iconColor" />}
                  iconAction={"/view-operators"}
                  menuName={"view Operators"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={formatCurrency(
                    adminData?.metaData?.online_transaction
                      ? adminData?.metaData?.online_transaction
                      : 0 + adminData?.metaData?.cash_transaction
                      ? adminData?.metaData?.cash_transaction
                      : 0 + adminData?.metaData?.wallet_transaction
                      ? adminData?.metaData?.wallet_transaction
                      : 0 || 0
                  )}
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
                  title={
                    adminData?.metaData?.on_the_way_rides
                      ? adminData?.metaData?.on_the_way_rides
                      : 0 + adminData?.metaData?.ongoing_rides
                      ? adminData?.metaData?.ongoing_rides
                      : 0 || "00"
                  }
                  subtitle="Active Rides"
                  icon={<ToggleOn className="iconColor" />}
                  iconAction={"/rides/active-rides"}
                  menuName={"view Active Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={adminData?.metaData?.pending_rides || "00"}
                  subtitle="Pending Rides"
                  icon={<Done className="iconColor" />}
                  iconAction={""}
                  menuName={"view Pending Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={
                    adminData?.metaData?.cancelled_rides
                      ? adminData?.metaData?.cancelled_rides
                      : 0 + adminData?.metaData?.on_the_way_rides
                      ? adminData?.metaData?.on_the_way_rides
                      : 0 + adminData?.metaData?.ongoing_rides
                      ? adminData?.metaData?.ongoing_rides
                      : 0 + adminData?.metaData?.pending_rides
                      ? adminData?.metaData?.pending_rides
                      : 0 || "00"
                  }
                  subtitle="Total Rides"
                  icon={<DirectionsCar className="iconColor" />}
                  iconAction={""}
                  menuName={"view Total Rides"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DashboardCard
                  title={adminData?.metaData?.cancelled_rides || "00"}
                  subtitle="Cancelled Rides"
                  icon={<Cancel className="iconColor" />}
                  iconAction={"/rides/cancelled-rides"}
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
              title={
                <Typography
                  component={"h6"}
                  variant="h6"
                  style={{
                    backgroundColor: "",
                    // padding: "1vh 2vh",
                    marginBottom: "2vh",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Recent Rides
                </Typography>
              }
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
                  paddingLeft: "4vh",
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
              data={
                activeRides === null
                  ? []
                  : activeRides.length <= 3
                  ? activeRides?.map((item, i) => ({
                      ...item,
                      sl: i + 1,
                      profile: item?.rider?.displayName,
                      driverProfile: item?.driver?.displayName,
                      vehicleType: item?.cab?.vehicleCategory?.name,
                      cityName: item?.city?.name,
                      pick: moment(item?.pickupTime).format("hh:mm A"),
                      rideId: item?._id,
                      pickAddress: item?.pickupLocation?.address,
                      dropAddress: item?.dropLocation?.address,
                      currentTimestamp: moment(item?.createdAt).format("ll"),
                    }))
                  : activeRides?.slice(0, 3).map((item, i) => ({
                      ...item,
                      sl: i + 1,
                      profile: item?.rider?.displayName,
                      driverProfile: item?.driver?.displayName,
                      vehicleType: item?.cab?.vehicleCategory?.name,
                      cityName: item?.city?.name,
                      pick: moment(item?.pickupTime).format("hh:mm A"),
                      rideId: item?._id,
                      pickAddress: item?.pickupLocation?.address,
                      dropAddress: item?.dropLocation?.address,
                      currentTimestamp: moment(item?.createdAt).format("ll"),
                    }))
              }
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
                  title: "Rider Profile",
                  tooltip: "Profile",
                  searchable: true,
                  field: "profile",
                  render: ({ rider }) => (
                    <>
                      <ListItem sx={{ paddingLeft: "0px" }}>
                        <ListItemAvatar>
                          <Avatar
                            alt={rider?.displayName}
                            src={rider?.photoURL}
                            variant="circular"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body2">
                              {rider?.displayName || "Not Provided"}
                            </Typography>
                          }
                          secondary={rider?.phoneNumber}
                        ></ListItemText>
                      </ListItem>
                    </>
                  ),
                },
                {
                  title: "Driver Profile",
                  tooltip: "driverProfile",
                  searchable: true,
                  field: "firstName",
                  render: ({ driver }) => (
                    <>
                      <ListItem sx={{ paddingLeft: "0px" }}>
                        <ListItemAvatar>
                          <Avatar
                            alt={driver?.displayName}
                            src={driver?.photoURL}
                            variant="circular"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body2">
                              {driver?.displayName || "Not Provided"}
                            </Typography>
                          }
                          secondary={driver?.phoneNumber}
                        ></ListItemText>
                      </ListItem>
                    </>
                  ),
                },
                {
                  title: "Ride Type",
                  field: "rideType",
                  emptyValue: "--",
                  searchable: true,

                  // width: "5%",
                },
                {
                  title: "Vehicle Type",
                  field: "vehicleType",
                  emptyValue: "--",
                  searchable: true,
                  // width: "5%",
                },
                {
                  title: "Pick Time",
                  field: "pick",
                  emptyValue: "--",
                  searchable: true,

                  // hidden: true,
                  export: true,
                  render: (rowData) =>
                    moment(rowData.pickupTime).format("llll"),
                },
              ]}
              actions={[
                {
                  icon: () => <Visibility style={{ color: "#1991eb" }} />,
                  tooltip: "View All Ongoing Rides ",
                  position: "toolbar",
                  onClick: (event, rowData) => {
                    navigate("/rides/active-rides");
                  },
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
