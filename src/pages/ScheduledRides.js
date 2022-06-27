import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import {
  Typography,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from "@mui/material";
import { AssignmentInd, DriveEta } from "@mui/icons-material";
import moment from "moment";
import { useScheduledRides } from "hooks";
import { AssignScheduleDriverDrawer, AssignVehicleDrawer } from "components";
import { useState } from "react";

const ScheduledRides = () => {
  const { scheduledRides, setRealtime } = useScheduledRides();
  // console.log(scheduledRides);
  const [openAssignDriverDrawer, setOpenAssignDriverDrawer] = useState(false);
  const [openAssignVehicleDrawer, setOpenAssignVehicleDrawer] = useState(false);
  return (
    <>
      <AssignVehicleDrawer
        open={openAssignVehicleDrawer}
        setOpenAssignDriverDrawer={setOpenAssignVehicleDrawer}
        setRealtime={setRealtime}
      />
      <AssignScheduleDriverDrawer
        open={openAssignDriverDrawer}
        setOpenAssignDriverDrawer={setOpenAssignDriverDrawer}
        setRealtime={setRealtime}
      />
      <MaterialTable
        title="Scheduled Rides"
        options={{
          exportAllData: true,
          search: true,
          detailPanelColumnAlignment: "right",
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Scheduled Rides"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Active Rides"),
            },
          ],
          pageSize: 10,
          actionsColumnIndex: -1,
          sorting: true,
        }}
        data={
          scheduledRides === null
            ? []
            : scheduledRides?.map((driver, i) => ({
                ...driver,
                sl: i + 1,
                profile: driver?.rider?.displayName,
                driverProfile: driver?.driver?.displayName,
                vehicleType: driver?.cab?.vehicleCategory?.name,
                cityName: driver?.city?.name,
                pick: moment(driver?.pickupTime).format("hh:mm A"),
                rideId: driver?._id,
                pickAddress: driver?.pickupLocation?.address,
                dropAddress: driver?.dropLocation?.address,
                currentTimestamp: moment(driver?.createdAt).format("ll"),
              }))
        }
        isLoading={scheduledRides === null}
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
            field: "rideId",
            export: true,
            hidden: true,
          },

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
          // {
          //   title: "Driver Profile",
          //   tooltip: "driverProfile",
          //   searchable: true,
          //   field: "firstName",
          //   render: ({ driver }) => (
          //     <>
          //       <ListItem sx={{ paddingLeft: "0px" }}>
          //         <ListItemAvatar>
          //           <Avatar
          //             alt={driver?.displayName}
          //             src={driver?.photoURL}
          //             variant="circular"
          //           />
          //         </ListItemAvatar>
          //         <ListItemText
          //           primary={
          //             <Typography component="span" variant="body2">
          //               {driver?.displayName || "Not Provided"}
          //             </Typography>
          //           }
          //           secondary={driver?.phoneNumber}
          //         ></ListItemText>
          //       </ListItem>
          //     </>
          //   ),
          // },
          {
            title: "Vehicle Type",
            field: "vehicleType",
            emptyValue: "--",
            searchable: true,
            // width: "5%",
          },
          {
            title: "Ride Type",
            field: "rideType",
            emptyValue: "--",
            searchable: true,

            // width: "5%",
          },
          // {
          //   title: "Vehicle Type",
          //   field: "vehicleType",
          //   emptyValue: "--",
          //   searchable: true,
          //   // width: "5%",
          // },
          {
            title: "Pick Time",
            field: "pick",
            emptyValue: "--",
            searchable: true,

            // hidden: true,
            export: true,
            render: (rowData) => moment(rowData.pickupTime).format("llll"),
          },
          {
            title: "Timestamp",
            field: "currentTimestamp",
            emptyValue: "--",
            searchable: true,
            export: true,
            render: (rowData) => moment(rowData.createdAt).format("llll"),
          },
          {
            title: "Actions",
            render: (rowData) => (
              <div className="d-flex">
                <Tooltip title="Assign Driver">
                  <Avatar
                    onClick={() => {
                      setOpenAssignDriverDrawer(rowData);
                    }}
                    variant="rounded"
                    sx={{
                      mr: ".4vw",
                      backgroundColor: "#3f51b5",
                      cursor: "pointer",
                    }}
                  >
                    <AssignmentInd />
                  </Avatar>
                </Tooltip>
                {rowData?.rideType === "RENTAL_RIDE" &&
                rowData?.rentalType === "SELF_DRIVE" ? (
                  <Tooltip title="Assign Vehicle">
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: "teal",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOpenAssignVehicleDrawer(rowData);
                      }}
                    >
                      <DriveEta />
                    </Avatar>
                  </Tooltip>
                ) : (
                  ""
                )}
              </div>
            ),
          },
          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          //   hidden: true,
          //   export: true,
          // },
          {
            title: "Pick/Drop Address",
            field: "address",
            hidden: true,
            export: true,
            searchable: true,
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
                      {rowData?.rideId}
                    </span>
                  </Typography>
                  {rowData?.rideType === "OUTSTATION_RIDE" && (
                    <Typography variant="body1" gutterBottom align="left">
                      Outstation Type:{" "}
                      <span
                        style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                      >
                        {` ${
                          rowData?.outstationType
                            ? rowData?.outstationType
                            : "Not Provided"
                        }`}
                      </span>
                    </Typography>
                  )}
                  {rowData?.rideType === "RENTAL_RIDE" && (
                    <Typography variant="body1" gutterBottom align="left">
                      Package:{" "}
                      <span
                        style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                      >
                        {` ${
                          rowData?.rentalPackage?.duration
                            ? +rowData?.rentalPackage?.duration / 3600
                            : 0
                        }Hrs ${
                          rowData?.rentalPackage?.distance
                            ? +rowData?.rentalPackage?.distance / 1000
                            : 0
                        }Km `}
                      </span>
                    </Typography>
                  )}
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

export default ScheduledRides;
