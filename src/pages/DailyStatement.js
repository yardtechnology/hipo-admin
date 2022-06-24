import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@ashirbad/js-core";
import InvoiceDrawer from "components/InvoiceDrawer";
import { useState } from "react";
import { PictureAsPdf } from "@mui/icons-material";
import { StatementInvoice } from "components/dialog";
import { useDailyRide } from "hooks";
import { BASE_URL } from "configs";

const DailyStatement = () => {
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  const [openStatementInvoice, setOpenStatementInvoice] = useState(false);
  const { fetchRides, rides } = useDailyRide();
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
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div>
      <InvoiceDrawer
        rideDetails={openInvoiceDrawer}
        setOpenInvoiceDrawer={setOpenInvoiceDrawer}
      />

      <MaterialTable
        options={{
          whiteSpace: "nowrap",
          selection: "true",
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 20,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Daily Statement"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Daily Statement"),
            },
          ],
        }}
        title={"Daily Ride Statement"}
        // data={[
        //   {
        //     sl: 1,
        //     city: "Bhubaneswar",
        //     noOfRides: "4",
        //     period: "Monthly",
        //     country: "India",
        //     role: "Driver",
        //     rideId: "1234567890",
        //     incentiveAmount: 200,
        //     earned: formatCurrency(200),
        //     range: "",
        //     zipCode: 751030,
        //     status: "Completed",
        //     pick: "Acharya vihar,Bhubaneswar",
        //     drop: "Niladri vihar ,Bhubaneswar",
        //   },
        // ]}
        data={async (query) => {
          const data = await fetchRides(
            query?.pageSize,
            query?.page,
            query?.totalCount
          );
          return {
            data:
              query?.search?.length > 0
                ? data?.data
                    ?.map((rating, i) => ({
                      ...rating,
                      sl: query.page * query.pageSize + i + 1,
                      currentTimestamp: moment(rating.createdAt).format("LL"),
                      rideId: rating?.ride?._id,
                      driverImg: rating?.driver?.photoURL,
                      driverName: rating?.driver?.displayName,
                      driverEmail: rating?.driver?.email,
                      driverPhone: rating?.driver?.phoneNumber,
                      riderImg: rating?.rider?.photoURL,
                      riderName: rating?.rider?.displayName,
                      riderEmail: rating?.rider?.email,
                      riderPhone: rating?.rider?.phoneNumber,
                      pickup_time: moment(rating?.pickupTime).format("LLL"),
                      drop_time: moment(rating?.dropTime).format("LLL"),
                      pickupAddress: rating?.pickupLocation?.address,
                      dropAddress: rating?.dropLocation?.address,
                    }))
                    ?.filter(
                      (rating) =>
                        rating?.rideId
                          ?.toLowerCase()
                          ?.includes(query?.search?.toLowerCase()) ||
                        rating?.pickupAddress
                          ?.toLowerCase()
                          .includes(query?.search?.toLowerCase()) ||
                        rating?.dropAddress
                          ?.toLowerCase()
                          ?.includes(query?.search?.toLowerCase()) ||
                        rating?.pickup_time
                          ?.toLowerCase()
                          ?.includes(query?.search?.toLowerCase()) ||
                        rating?.drop_time
                          ?.toLowerCase()
                          ?.includes(query?.search?.toLowerCase()) ||
                        rating?.status
                          ?.toLowerCase()
                          ?.includes(query?.search?.toLowerCase()) ||
                        rating?.paymentMethod
                          ?.toLowerCase()
                          .includes(query?.search?.toLowerCase())
                    )
                : data?.data?.map((rating, i) => ({
                    ...rating,
                    sl: query.page * query.pageSize + i + 1,
                    currentTimestamp: moment(rating.createdAt).format("LL"),
                    rideId: rating?._id,
                    driverImg: rating?.driver?.photoURL,
                    driverName: rating?.driver?.displayName,
                    driverEmail: rating?.driver?.email,
                    driverPhone: rating?.driver?.phoneNumber,
                    riderImg: rating?.rider?.photoURL,
                    riderName: rating?.rider?.displayName,
                    riderEmail: rating?.rider?.email,
                    riderPhone: rating?.rider?.phoneNumber,
                    pickup_time: moment(rating?.pickupTime).format("LLL"),
                    drop_time: moment(rating?.dropTime).format("LLL"),
                    pickupAddress: rating?.pickupLocation?.address,
                    dropAddress: rating?.dropLocation?.address,
                  })),
            page: query?.page,
            totalCount: data?.totalCount,
          };
        }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Ride Id",
            field: "rideId",

            searchFable: true,
          },
          {
            title: "Amount",
            field: "amount",
            render: (rowData) => {
              return formatCurrency(rowData?.amount);
            },
            searchable: true,
          },
          {
            title: "Payment Method",
            field: "paymentMethod",
            searchable: true,
          },
          {
            title: "Pickup Time",
            field: "pickup_time",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Drop Time",
            field: "drop_time",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Pickup Address",
            field: "pickupAddress",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Drop Address",
            field: "dropAddress",
            searchable: true,
            hidden: true,
            export: true,
          },

          // {
          //   title: "Status",
          //   field: "status",
          //   render: (row) => (
          //     <>
          //       <Chip
          //         size="small"
          //         variant="outlined"
          //         color="secondary"
          //         label={row?.status}
          //       />
          //     </>
          //   ),
          // },
          {
            title: "Timestamp",
            // width: "70%",
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
            searchable: true,
            // hidden: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
          {
            title: "Actions",
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  {" "}
                  {/* <Tooltip title="View Details"> */}
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
                  {/* <IconButton
                      onClick={() => setOpenStatementInvoice(row)}
                      sx={{ mr: 1, cursor: "pointer" }}
                    >
                      {" "}
                      <Visibility sx={{ color: "#1877f2" }} />
                    </IconButton> */}
                  {/* </Avatar> */}
                  {/* </Tooltip> */}
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
        actions={
          [
            // {
            //   tooltip: "Send notification to all selected users",
            //   icon: "send",
            //   onClick: (evt, data) => setSelectedUsers(data),
            // },
            //   {
            //     tooltip: "Turn On for Selected Cities",
            //     icon: "toggle_on",
            //     // onClick: (evt, data) => setSelectedUsers(data),
            //   },
          ]
        }
        // editable={{
        //   //   onRowAdd: async (data) => {},
        //   //   onRowUpdate: async (newData, oldData) => {},
        //   onRowDelete: async (oldData) => {},
        // }}
        // actions={[
        //   {
        //     tooltip: "Delete all selected Days",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?.day)),
        //   },
        // ]}
        isLoading={rides === null}
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
                  {/* <Typography
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
                  </Typography> */}
                  <Typography variant="body1" gutterBottom align="left">
                    Pickup Time:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickupTime
                        ? moment(rowData?.pickupTime).format("lll")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Time:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropTime
                        ? moment(rowData?.dropTime).format("lll")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pickupLocation?.address}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.dropLocation?.address}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
      />
      <StatementInvoice
        selectedDetails={openStatementInvoice}
        handleClose={() => setOpenStatementInvoice([])}
      />
    </div>
  );
};

export default DailyStatement;
