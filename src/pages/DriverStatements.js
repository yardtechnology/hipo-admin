import MaterialTable from "@material-table/core";
import {
  Cancel,
  DirectionsCar,
  Done,
  Money,
  MoreVert,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Card as DashboardCard } from "components/dashboard";

const DriverStatements = () => {
  return (
    <>
      {" "}
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
            title={"$ " + 555}
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
          {
            title: "Sl no",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
          },
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
            title: "Picked Up",
            field: "pickedUp",
          },
          {
            title: "Dropped",
            field: "dropped",
          },
          {
            title: "Date On",
            field: "dateOn",
          },
          {
            title: "Earned",
            field: "earned",
          },
          {
            title: "Status",
            field: "status",
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
      />
    </>
  );
};

export default DriverStatements;
