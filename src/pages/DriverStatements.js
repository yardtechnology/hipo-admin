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
import moment from "moment";
import { Link } from "react-router-dom";

const DriverStatements = () => {
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
        Statements of Alexa
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "5vh" }}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={formatCurrency(555)}
            subtitle="Revenue"
            icon={<Money className="iconColor" />}
            // iconAction={<MoreVert sx={{ color: "snow" }} />}
            menuName={"total revenue"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={18}
            subtitle="Completed Rides"
            icon={<Done className="iconColor" />}
            iconAction={"/rides/completed-rides"}
            menuName={"view Completed Rides"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={21}
            subtitle="Total Rides"
            icon={<DirectionsCar className="iconColor" />}
            iconAction={"/vehicles"}
            menuName={"view Total Rides"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard
            title={"15"}
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
        data={[
          {
            bookingTime: new Date().toString(),
            pickAddress: "Sector-12, Noida",
            dropAddress: "Sector-15, Noida",
            invoiceNumber: "CRN-001121432546",
            displayName: "Aliva Priyadarshini",
            driverName: "Alexa",
            pick: new Date().toString(),
            dateOn: new Date().toString(),
            paymentMode: "Cash",
            collected: "555",
            earned: "575",
            drop: new Date().toString(),
            rideId: "12345",
            rideType: "Rental",
            rideAmount: 245,
            vehicleType: "Car",
            phoneNumber: "+91 7887643625",
            address: "Bbsr",
            trips: "15",
            status: "Initiated",
          },
        ]}
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
            render: (rowData) => moment(rowData.dateOn).format("LL"),
          },
          {
            title: "Payment Mode",
            field: "paymentMode",
          },
          {
            title: "Collected",
            field: "collected",
            render: (rowData) => formatCurrency(rowData?.collected),
          },
          {
            title: "Earned",
            field: "earned",
            render: (rowData) => formatCurrency(rowData?.earned),
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
                    Pickup Time:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {moment(rowData?.pick).format("llll")}
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
                      {moment(rowData?.drop).format("llll")}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickAddress}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropAddress}
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
