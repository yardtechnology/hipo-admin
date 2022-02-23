import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { formatCurrency } from "@ashirbad/js-core";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DriverShare = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "2vh" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginBottom: "4vh", marginTop: "0vh" }}
      >
        <Link underline="hover" color="inherit" to="/">
          Incentives
        </Link>
        <Typography color="text.primary">Driver Incentives</Typography>
      </Breadcrumbs>
      <MaterialTable
        options={{
          whiteSpace: "nowrap",
          selection: "true",
          addRowPosition: "first",
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
        title={"Driver Incentives"}
        data={[
          {
            sl: 1,
            city: "Bhubaneswar",
            noOfRides: "4",
            period: "Monthly",
            country: "India",
            role: "Driver",
            incentiveAmount: 200,
            range: "",
            zipCode: 751030,
            status: "On",
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
            title: "No of Rides",
            field: "noOfRides",

            searchable: true,
          },
          {
            title: "Period",
            field: "period",
            searchable: true,
          },
          {
            title: "Role",
            field: "role",
            searchable: true,
          },
          {
            title: "Incentive Amount",
            field: "incentiveAmount",
            searchable: true,
            render: ({ incentiveAmount }) => formatCurrency(incentiveAmount),
            // type: "numeric",
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
        editable={{
          onRowAdd: async (data) => {},
          onRowUpdate: async (newData, oldData) => {},
          onRowDelete: async (oldData) => {},
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

export default DriverShare;
