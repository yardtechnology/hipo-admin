import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PictureAsPdf, Visibility } from "@mui/icons-material";
import {
  Button,
  Tooltip,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { formatCurrency } from "@ashirbad/js-core";
import { useState } from "react";
import { InvoiceDrawer } from "components";
import { useCompletedRides } from "hooks";
const CompletedRides = () => {
  const { completedRides } = useCompletedRides();
  console.log(completedRides);
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);

  return (
    <>
      <InvoiceDrawer
        rideDetails={openInvoiceDrawer}
        setOpenInvoiceDrawer={setOpenInvoiceDrawer}
      />{" "}
      <MaterialTable
        title="Completed Rides"
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
        data={[
          {
            bookingTime: new Date().toString(),
            pickAddress: "Sector-12, Noida",
            dropAddress: "Sector-15, Noida",
            invoiceNumber: "CRN-001121432546",
            displayName: "Aliva Priyadarshini",
            driverName: "Alexa",
            pick: new Date().toString(),
            drop: new Date().toString(),
            rideId: "12345",
            rideType: "Rental",
            rideAmount: 245,
            vehicleType: "Car",
            phoneNumber: "+91 7887643625",
            address: "Bbsr",
            trips: "15",
            status: "Completed",
            distance: "15km",
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
            field: "rideId",
            export: true,
            hidden: true,
          },

          {
            title: "Rider Profile",
            tooltip: "Profile",
            searchable: true,
            width: "25%",
            field: "firstName",
            render: ({ photoURL, displayName, email, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName || "Not Provided"}
                      </Typography>
                    }
                    secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Driver Profile",
            tooltip: "Profile",
            searchable: true,
            width: "25%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName || "Not Provided"}
                      </Typography>
                    }
                    secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Ride Type",
            field: "rideType",
          },
          {
            title: "Vehicle",
            field: "vehicleType",
          },
          {
            title: "Pick Date/Time",
            field: "pick",
            hidden: true,
            export: true,
          },
          {
            title: "Drop Date/Time",
            field: "drop",
            hidden: true,
            export: true,
          },
          {
            title: "Pick/Drop Address",
            field: "address",
            hidden: true,
            export: true,
          },
          {
            title: "Status",
            field: "status",
            // width: "5%",
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
                {/* <Button
                  sx={{ padding: "4px 5px", textTransform: "none" }}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  initiated
                </Button>
                <Button
                  sx={{ padding: "4px 5px", textTransform: "none" }}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  ongoing
                </Button> */}
              </>
            ),
          },
          {
            title: "Distance",
            field: "distance",
            // render: (row) => formatCurrency(row.rideAmount),
          },
          {
            title: "Fare",
            field: "rideAmount",
            render: (row) => formatCurrency(row.rideAmount),
          },

          {
            title: "Actions",
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  {" "}
                  <Tooltip title="View Details">
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
                    <IconButton
                      onClick={() => setOpenInvoiceDrawer(row)}
                      sx={{ mr: 1, cursor: "pointer" }}
                    >
                      {" "}
                      <Visibility sx={{ color: "#1877f2" }} />
                    </IconButton>
                    {/* </Avatar> */}
                  </Tooltip>
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
                    <IconButton onClick={() => setOpenInvoiceDrawer(row)}>
                      <PictureAsPdf sx={{ color: "#1877f2" }} />
                    </IconButton>

                    {/* </Avatar> */}
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

export default CompletedRides;
