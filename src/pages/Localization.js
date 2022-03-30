import MaterialTable from "@material-table/core";
import { Switch } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";

const Localization = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <>
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
        title={"Localization"}
        data={[
          {
            sl: 1,
            city: "Bhubaneswar",
            country: "India",
            range: 25,
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
            title: "City",
            field: "city",

            searchable: true,
          },
          {
            title: "Country",
            field: "country",
            searchable: true,
          },
          {
            title: "Zip Code",
            field: "zipCode",
            type: "numeric",
            searchable: true,
          },
          {
            title: "Range",
            field: "range",
            type: "numeric",
            render: ({ range }) => `${range} Km`,
            searchable: true,
            // type: "numeric",
          },
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Switch
                // size="small"
                // variant="outlined"
                // color="secondary"
                // label={row?.status}
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
        ]}
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Turn On for Selected Cities",
            icon: "toggle_on",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Turn Off for Selected Cities",
            icon: "toggle_off",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
        ]}
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
    </>
  );
};

export default Localization;
