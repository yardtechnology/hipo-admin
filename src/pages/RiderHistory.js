import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PictureAsPdf } from "@mui/icons-material";
import { Breadcrumbs, IconButton, Tooltip, Typography } from "@mui/material";
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
        title="Rider History"
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
        data={[{ riderName: "Alexa" }]}
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
            field: "riderName",
          },
          {
            title: "Driver Name",
            field: "Driver Name",
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
