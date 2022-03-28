import MaterialTable from "@material-table/core";
import {
  Avatar,
  Card,
  CardContent,
  // Chip,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { formatCurrency } from "@ashirbad/js-core";
import { Delete, DocumentScanner, Edit } from "@mui/icons-material";
// import { formatCurrency } from "@ashirbad/js-core";

const Vehicles = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          detailPanelColumnAlignment: "right",
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
        title={"Vehicles"}
        data={[
          {
            sl: 1,
            typeImage: "",
            vehicleName: "Hyundai i20",
            typeName: "SUV",
            costPerKm: 7,
            ownerName: "Alexa Smith",
            seatingCapacity: 5,
            status: "On",
            purchaseOn: moment(new Date().toString()).format("LL"),
            fuel: "Gasoline",
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
            title: "Image",
            field: "typeImageUrl",
            render: ({ typeImageUrl }) => (
              <Avatar
                variant="rounded"
                sx={{ width: "12vh", height: "12vh" }}
              />
            ),
            searchable: true,
          },
          {
            title: "Name",
            field: "vehicleName",
            searchable: true,
          },
          {
            title: "Type",
            field: "typeName",
            searchable: true,
          },
          {
            title: "Owner",
            field: "ownerName",
            searchable: true,
          },
          {
            title: "Cost Per Km",
            field: "costPerKm",
            type: "numeric",
            // render: ({ costPerKm }) => formatCurrency(costPerKm),
            searchable: true,
            hidden: true,
            export: "true",
          },
          {
            title: "Seating Capacity",
            field: "seatingCapacity",
            searchable: true,
            type: "numeric",
            hidden: true,
            export: true,
          },
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Switch defaultChecked />
                {/* <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.status}
                  sx={{ padding: "4px" }}
                /> */}
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
            width: "18%",
            headerStyle: {
              textAlign: "center",
            },
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  <Tooltip title="View Documents">
                    <Avatar
                      variant="rounded"
                      // onClick={() => setOpenDocumentDrawer(row)}
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "lawngreen",
                        cursor: "pointer",
                      }}
                    >
                      <DocumentScanner sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Edit Driver Basic Details">
                    <Avatar
                      variant="rounded"
                      // onClick={() => setOpenEditDriverDrawer(row)}
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "gray",
                        cursor: "pointer",
                      }}
                    >
                      <Edit sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Delete Driver">
                    <Avatar
                      variant="rounded"
                      // onClick={() => setOpenDocumentDrawer(row)}
                      sx={{
                        padding: "0px !important",
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                    >
                      <Delete sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                </div>
              </>
            ),
          },
        ]}
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Turn On",
            icon: "toggle_on",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Turn Off",
            icon: "toggle_off",
            // onClick: (evt, data) => setSelectedUsers(data),
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
                    Cost Per KM:{" "}
                    <span
                      style={{
                        color: "rgb(30, 136, 229)",
                        fontSize: "15px",
                      }}
                    >
                      {formatCurrency(rowData?.costPerKm)}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Seating Capacity:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.seatingCapacity}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Purchase On:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.purchaseOn}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom align="left">
                    Fuel:{" "}
                    <span
                      style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
                    >
                      {rowData?.fuel}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}

        // actions={[
        //   {
        //     tooltip: "Delete all selected Days",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?.day)),
        //   },
        // ]}
        // isLoading={days === null}
      />
    </div>
  );
};

export default Vehicles;
