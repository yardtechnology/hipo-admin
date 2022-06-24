import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Cancel,
  DirectionsCar,
  Done,
  Money,
  MoreVert,
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Card as DashboardCard } from "components/dashboard";
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DriverStatements = () => {
  const { driverId, driverName } = useParams();
  const { isMounted } = useIsMounted();
  const [statement, setStatement] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(
          `${BASE_URL}/driver/ride-earning/${driverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        // const sortArr = arr?.data?.sort(
        //   (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        // );
        setStatement(arr?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, driverId]);
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/drivers/all-drivers">
          All Drivers
        </Link>
        <Typography color="text.primary">Driver Statements</Typography>
      </Breadcrumbs>{" "}
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
        {driverName && `Statements of ${driverName}`}
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "5vh" }}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            ICON={<MoreVert sx={{ color: "snow" }} />}
            title={formatCurrency(statement?.metaData?.revenue) || "00"}
            subtitle="Revenue"
            icon={<Money className="iconColor" />}
            // iconAction={<MoreVert sx={{ color: "snow" }} />}
            menuName={"total revenue"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            ICON={<MoreVert sx={{ color: "snow" }} />}
            title={statement?.metaData?.completed_ride || "00"}
            subtitle="Completed Rides"
            icon={<Done className="iconColor" />}
            iconAction={"/rides/completed-rides"}
            menuName={"view Completed Rides"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            ICON={<MoreVert sx={{ color: "snow" }} />}
            title={statement?.metaData?.total_ride || "00"}
            subtitle="Total Rides"
            icon={<DirectionsCar className="iconColor" />}
            iconAction={"/vehicles"}
            menuName={"view Total Rides"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            ICON={<MoreVert sx={{ color: "snow" }} />}
            title={statement?.metaData?.cancelled_ride || "00"}
            subtitle="Cancelled Rides"
            icon={<Cancel className="iconColor" />}
            iconAction={<MoreVert sx={{ color: "snow" }} />}
            menuName={"View Cancelled Rides"}
          />
        </Grid>
      </Grid>
      <MaterialTable
        title="Driver Statement"
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          detailPanelColumnAlignment: "right",
          // pageSize: "3",
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Driver Staterments"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Driver Statements"),
            },
          ],
          actionsColumnIndex: -1,
          search: true,
          selection: true,
          exportAllData: true,
          sorting: true,
        }}
        data={
          statement?.rides === null
            ? []
            : statement?.rides
                ?.sort(
                  (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                )
                ?.map((item, i) => ({
                  ...item,
                  sl: i + 1,
                }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
            width: "2%",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Ride Id",
            tooltip: "Ride Id",
            field: "rideId",
            hidden: true,
            export: true,
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

          // {
          //   title: "Picked Up",
          //   field: "pickedUp",
          // },
          // {
          //   title: "Dropped",
          //   field: "dropped",
          // },
          {
            title: "Date On",
            field: "dateOn",
            render: (rowData) => moment(rowData.createdAt).format("LL"),
          },
          {
            title: "Payment Mode",
            field: "paymentMethod",
          },
          // {
          //   title: "Collected",
          //   field: "collected",
          //   render: (rowData) => formatCurrency(rowData?.collected),
          // },
          {
            title: "Earned",
            field: "earned",
            render: (rowData) => formatCurrency(rowData?.amount),
          },
        ]}
        // actions={[
        //   {
        //     icon: () => <Visibility style={{ color: "#1991eb" }} />,
        //     tooltip: "View All Rides ",
        //     position: "toolbar",
        //     // onClick: () => {
        //     //   history.push("/users");
        //     // },
        //   },
        // ]}
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
                  <Typography
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
                      {rowData?._id}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    align="left"
                  >
                    Pickup Time:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {rowData.pickupTime
                        ? moment(rowData?.pickupTime).format("llll")
                        : "Not Provided"}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    align="left"
                  >
                    Drop Time:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {rowData?.dropTime
                        ? moment(rowData?.dropTime).format("llll")
                        : "Not Provided"}
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
    </>
  );
};

export default DriverStatements;
