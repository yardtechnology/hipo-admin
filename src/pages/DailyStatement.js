import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@ashirbad/js-core";
import InvoiceDrawer from "components/InvoiceDrawer";
import { useState } from "react";
import { PictureAsPdf, Visibility } from "@mui/icons-material";
import { StatementInvoice } from "components/dialog";

const DailyStatement = () => {
  const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
  const [openStatementInvoice, setOpenStatementInvoice] = useState(false);

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
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Vehicles"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Vehicles"),
            },
          ],
        }}
        title={"Daily Ride Statement"}
        data={[
          {
            sl: 1,
            city: "Bhubaneswar",
            noOfRides: "4",
            period: "Monthly",
            country: "India",
            role: "Driver",
            rideId: "1234567890",
            incentiveAmount: 200,
            earned: formatCurrency(200),
            range: "",
            zipCode: 751030,
            status: "Completed",
            pick: "Acharya vihar,Bhubaneswar",
            drop: "Niladri vihar ,Bhubaneswar",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          {
            title: "Ride Id",
            field: "rideId",

            searchable: true,
          },
          {
            title: "Earned",
            field: "earned",
            searchable: true,
          },
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.status}
                />
              </>
            ),
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "timestamp",
            editable: "never",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
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
                      onClick={() => setOpenStatementInvoice(row)}
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
        // isLoading={days === null}
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
                    Pick Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.pick}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Drop Address:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.drop}
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
