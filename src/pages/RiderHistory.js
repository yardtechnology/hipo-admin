import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PictureAsPdf, Visibility } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Tooltip,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "@ashirbad/js-core";
import { useEffect, useState } from "react";
import { InvoiceDrawer } from "components";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";
const RiderHistory = () => {
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  const { riderId } = useParams();
  // console.log(riderId);
  const { isMounted } = useIsMounted();
  const [history, setHistory] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(`${BASE_URL}/rides/all/${riderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        // console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setHistory(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, riderId]);
  const downloadPdf = async (data) => {
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

  // console.log(history);
  return (
    <>
      <InvoiceDrawer
        Details={openInvoiceDrawer}
        setOpenInvoiceDrawer={setOpenInvoiceDrawer}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "1vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/riders">
          Riders
        </Link>
        <Typography color="text.primary">Ride History</Typography>
      </Breadcrumbs>
      <MaterialTable
        title="History Of Rider"
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
        isLoading={history === null}
        data={
          history === null
            ? []
            : history?.map((item, i) => ({
                ...item,
                sl: i + 1,
                displayName: item?.rider?.displayName,
                phoneNumber: item?.rider?.phoneNumber,
                rideAmount: item?.billing?.totalFare,
                pickupLatitude: item?.pickupLocation?.lat,
                pickupLongitude: item?.pickupLocation?.lng,
                dropLatitude: item?.dropLocation?.lat,
                dropLongitude: item?.dropLocation?.lng,
                driverDisplayName: item?.driver?.displayName,
                driverPhoneNumber: item?.driver?.phoneNumber,
                vehicle: item?.driver?.vehicle?.vehicleType?.name,
              }))
          //   [
          //   {
          //     bookingTime: new Date().toString(),
          //     pickAddress: "Sector-12, Noida",
          //     dropAddress: "Sector-15, Noida",
          //     invoiceNumber: "CRN-001121432546",
          //     displayName: "Aliva Priyadarshini",
          //     driverName: "Alexa",
          //     pick: new Date().toString(),
          //     drop: new Date().toString(),
          //     distance: "10km",
          //     rideId: "12345",
          //     rideType: "Rental",
          //     rideAmount: 245,
          //     vehicleType: "Car",
          //     phoneNumber: "+91 7887643625",
          //     address: "Bbsr",
          //     trips: "15",
          //     status: "Completed",
          //   },
          // ]
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
            title: "Rider Profile",
            tooltip: "Profile",
            searchable: true,
            field: "displayName" || "phoneNumber",
            render: ({ photoURL, displayName, email, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName}
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
            emptyValue: "N/A",
            width: "22%",
            field: "driverPhoneNumber",
            render: ({ photoURL, driverDisplayName, driverPhoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {driverDisplayName || "Not Provided"}
                      </Typography>
                    }
                    secondary={driverPhoneNumber}
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
            field: "vehicle",
            emptyValue: "--",
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
                  color="info"
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
            field: "totalDistance",
            emptyValue: "--",
            render: ({ totalDistance }) => `${totalDistance} km`,
          },
          {
            title: "Fare",
            field: "rideAmount",
            emptyValue: "--",
            render: ({ billing }) => formatCurrency(billing?.totalFare),
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
        // detailPanel={[
        //   {
        //     tooltip: "Show more info",

        //     icon: "info",
        //     openIcon: "visibility",
        //     render: ({ rowData }) => (

        //     ),
        //   },
        // ]}
        // actions={[
        //   {
        //     icon: "visibility",
        //     tooltip: "View Invoice",
        //     onClick: (event, rowData) => {
        //       console.log("rowData", rowData);
        //     },
        //   },
        //   {
        //     icon: "picture_as_pdf",
        //     tooltip: "Dowload Invoice",
        //     onClick: (event, rowData) => {
        //       console.log("rowData", rowData);
        //     },
        //   },
        // ]}
        // detailPanel={({ rowData }) => {
        //   return (
        //     <div
        //       style={{
        //         padding: "20px",
        //         margin: "auto",
        //         backgroundColor: "#eef5f9",
        //       }}
        //     >
        //       <Card
        //         sx={{
        //           minWidth: 500,
        //           maxWidth: 550,
        //           transition: "0.3s",
        //           margin: "auto",
        //           padding: "2vh 2vw",
        //           borderRadius: "10px",
        //           // fontFamily: italic,
        //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        //           "&:hover": {
        //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        //           },
        //         }}
        //       >
        //         <CardContent>
        //           <Typography
        //             variant="body1"
        //             component="p"
        //             gutterBottom
        //             align="left"
        //           >
        //             Ride Id:{" "}
        //             <span
        //               style={{
        //                 color: "rgb(30, 136, 229)",
        //                 fontSize: "15px",
        //               }}
        //             >
        //               {rowData?.rideId}
        //             </span>
        //           </Typography>

        //           <Typography
        //             variant="body1"
        //             component="p"
        //             gutterBottom
        //             align="left"
        //           >
        //             Pick Date/Time:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.pick}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             Drop Date/Time:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.drop}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             Pick/Drop Address:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.address}
        //             </span>
        //           </Typography>
        //         </CardContent>
        //       </Card>
        //     </div>
        //   );
        // }}
      />
    </>
  );
};

export default RiderHistory;
