import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import {
  Breadcrumbs,
  Typography,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import { InvoiceDrawer } from "components";
import moment from "moment";
const ScheduledRides = () => {
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);

  return (
    <>
      <InvoiceDrawer
        rideDetails={openInvoiceDrawer}
        setOpenInvoiceDrawer={setOpenInvoiceDrawer}
      />{" "}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/riders">
          Rides
        </Link>
        <Typography color="text.primary">Scheduled Rides</Typography>
      </Breadcrumbs>
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
            status: "Initiated",
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
            width: "22%",
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
            width: "22%",
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
            // width: "5%",
          },
          {
            title: "Vehicle",
            field: "vehicleType",
            // width: "5%",
          },
          {
            title: "Pick Time",
            field: "pick",
            // hidden: true,
            export: true,
            render: (rowData) => moment(rowData?.pick).format("llll"),
            width: "25%",
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
                      {rowData?.rideId}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.address}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.address}
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
