import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PictureAsPdf } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const RiderHistory = () => {
  return (
    <>
      {" "}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/riders">
          Riders
        </Link>
        <Typography color="text.primary">Ride History</Typography>
      </Breadcrumbs>
      {/* <Typography
        component={"h6"}
        variant={"h6"}
        color="Highlight"
        sx={{ marginBottom: "2vh" }}
      >
        History Of Alexa
      </Typography> */}
      <MaterialTable
        title="Ride History"
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          exportAllData: true,
          search: true,
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
          pageSize: "10",
          actionsColumnIndex: -1,
          selection: true,
          sorting: true,
        }}
        data={[
          {
            displayName: "Mehmet",
            driverName: "Alexa",
            pick: "20/1/22 2.00 pm",
            drop: "20/1/22 2.00 pm",
            rideId: "12345",
            rideType: "Ride",
            phoneNumber: "777887643625",
            address: "Bbsr",
            trips: "15",
            profileImageUrl: "",
            status: "Unblocked",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
            width: "5%",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Ride Id",
            // tooltip: "rideId",
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
            field: "rideId",
          },

          {
            title: "Rider Name",
            field: "displayName",
          },
          {
            title: "Driver Name",
            field: "driverName",
          },
          {
            title: "Type",
            field: "rideType",
          },
          {
            title: "Pick Date/Time",
            field: "pick",
          },
          {
            title: "Drop Date/Time",
            field: "drop",
          },
          {
            title: "Pick/Drop Address",
            field: "address",
          },
          {
            title: "Status",
            field: "status",
            width: "5%",
            render: (row) => (
              <>
                <Button
                  sx={{ padding: "4px 5px", textTransform: "none" }}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  {row?.status}
                </Button>
              </>
            ),
          },
          // {
          //   title: "View Invoice",
          //   // field: "status",
          // },
          {
            title: "View Invoice",

            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  {" "}
                  <Tooltip title="View Invoice">
                    <IconButton>
                      {" "}
                      <PictureAsPdf sx={{ color: "#1877f2" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default RiderHistory;
