import MaterialTable from "@material-table/core";
import { Avatar } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import { formatCurrency } from "@ashirbad/js-core";
// import { formatCurrency } from "@ashirbad/js-core";

const Pricing = () => {
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
        title={"Pricing"}
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
            basePrice: 7,
            tax: 2,
            accessFee: 10,
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
            title: "Type",
            field: "typeName",
            searchable: true,
          },

          {
            title: "Cost Per Km",
            field: "basePrice",
            type: "numeric",
            render: ({ costPerKm }) => formatCurrency(costPerKm),
            searchable: true,
            // hidden: true,
            export: "true",
          },
          {
            title: "Tax",
            field: "tax",
            type: "numeric",
            render: ({ tax }) => formatCurrency(tax),
            searchable: true,
            // hidden: true,
            export: "true",
          },
          {
            title: "Access Fee",
            field: "accessFee",
            type: "numeric",
            render: ({ accessFee }) => formatCurrency(accessFee),
            searchable: true,
            // hidden: true,
            export: "true",
          },
          // {
          //   title: "Seating Capacity",
          //   field: "seatingCapacity",
          //   searchable: true,
          //   type: "numeric",
          //   hidden: true,
          //   export: true,
          // },
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
          //         sx={{ padding: "4px" }}
          //       />
          //     </>
          //   ),
          // },
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

export default Pricing;
