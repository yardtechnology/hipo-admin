import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PictureAsPdf, Visibility } from "@mui/icons-material";
import {
  Tooltip,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { formatCurrency } from "@ashirbad/js-core";
import { useState } from "react";
import { InvoiceDrawer } from "components";
import { useCompletedRides } from "hooks";
import moment from "moment";
import { BASE_URL } from "configs";
const CompletedRides = () => {
  const { completedRides } = useCompletedRides();
  console.log(completedRides);
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  console.log(openInvoiceDrawer);
  const downloadPdf = async (data) => {
    console.log(data);
    const response = await fetch(
      `${BASE_URL}/ride-invoice/download/${data?._id}`,
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      }
    );
    const blob = await response.blob();
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    window.open(url, "", "width=800,height=500").print();
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `${data?._id}.pdf`);
    // document.body.appendChild(link);
    // link.click();
  };

  return (
    <>
      <InvoiceDrawer
        Details={openInvoiceDrawer}
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
          sorting: true,
        }}
        data={
          completedRides === null
            ? []
            : completedRides?.map((ride, i) => ({
                ...ride,
                sl: i + 1,
                vehicleType: ride?.cab?.vehicleCategory?.name,
                rideAmount: ride?.billing?.totalFare,
              }))
        }
        isLoading={completedRides === null}
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
          },
          {
            title: "Vehicle Type",
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
          // {
          //   title: "Status",
          //   field: "status",
          //   // width: "5%",
          //   render: (row) => (
          //     <>
          //       <Button
          //         sx={{ padding: "4px 5px", textTransform: "none" }}
          //         size="small"
          //         variant="contained"
          //         color="success"
          //       >
          //         {row?.status}
          //       </Button>
          //       {/* <Button
          //         sx={{ padding: "4px 5px", textTransform: "none" }}
          //         size="small"
          //         variant="contained"
          //         color="primary"
          //       >
          //         initiated
          //       </Button>
          //       <Button
          //         sx={{ padding: "4px 5px", textTransform: "none" }}
          //         size="small"
          //         variant="contained"
          //         color="success"
          //       >
          //         ongoing
          //       </Button> */}
          //     </>
          //   ),
          // },
          {
            title: "Distance",
            field: "totalDistance",
            render: (row) => `${row?.totalDistance} KM`,
            emptyValue: "-",
            // render: (row) => formatCurrency(row.rideAmount),
          },
          {
            title: "Fare",
            field: "rideAmount",
            render: (row) => formatCurrency(row?.billing?.totalFare),
          },
          {
            title: "Timestamp",
            searchable: true,
            field: "createdAt",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
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
                  {row?.status === "COMPLETED" && (
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
                      <IconButton onClick={() => downloadPdf(row)}>
                        <PictureAsPdf sx={{ color: "#1877f2" }} />
                      </IconButton>

                      {/* </Avatar> */}
                    </Tooltip>
                  )}
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
