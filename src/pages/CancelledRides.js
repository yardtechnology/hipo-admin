import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Typography,
  ListItem,
  ListItemText,
  CardContent,
  Card,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useCancelledRides } from "hooks";
const CancelledRides = () => {
  const { cancelledRides } = useCancelledRides();
  console.log(cancelledRides);
  return (
    <>
      <MaterialTable
        title="Cancelled Rides"
        options={{
          exportAllData: true,
          search: true,
          detailPanelColumnAlignment: "right",
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Ride History"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Ride History"),
            },
          ],
          pageSize: 10,
          actionsColumnIndex: -1,
          selection: true,
          sorting: true,
        }}
        data={
          cancelledRides === null
            ? []
            : cancelledRides?.map((ride, i) => ({
                ...ride,
                sl: i + 1,
                vehicle: ride?.cab?.vehicleCategory?.name,
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          // {
          //   title: "Ride Id",
          //   field: "rideId",
          //   export: true,
          //   // hidden: true,
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
          },
          {
            title: "Vehicle",
            field: "vehicle",
            searchable: true,
            emptyValue: "--",
          },

          {
            title: "Pick/Drop Address",
            field: "address",
            hidden: true,
            export: true,
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
                  <Typography variant="body1" gutterBottom align="left">
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickupLocation?.address
                        ? rowData?.pickupLocation?.address
                        : "--"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropLocation?.address
                        ? rowData?.dropLocation?.address
                        : "--"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Cancelled By:
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      --
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Cancellation Reason:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      Expected shorter waiting time
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

export default CancelledRides;
