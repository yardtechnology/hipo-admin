import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { formatCurrency } from "@ashirbad/js-core";
import { Chip } from "@mui/material";
// import { BASE_URL } from "configs";
import moment from "moment";

const Coupons = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
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
        title={"Manage Coupons"}
        data={[
          {
            sl: 1,
            amount: "100",
            typeImage: "",
            couponCode: "45#APR",
            count: 5,
            usedCount: 2,
            costPerKm: 7,
            seatingCapacity: 5,
            status: "active",
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
            title: "Valid From",
            field: "validFrom",
            type: "datetime",
            render: ({ validFrom }) =>
              moment(validFrom).format(" Do MMM YYYY hh:mm A"),
          },

          {
            title: "Valid Till",
            field: "validTill",
            type: "datetime",
            render: ({ validTill }) =>
              moment(validTill).format(" Do MMM YYYY hh:mm A"),
          },
          {
            title: "Coupon Code",
            field: "couponCode",
          },
          {
            title: "Max Cashback",
            field: "maxCashback",
          },
          {
            title: "Discount In %",
            field: "discount",
          },
          // {
          //   title: "Amount",
          //   field: "amount",
          //   type: "numeric",
          //   render: ({ amount }) => formatCurrency(amount),
          // },
          // {
          //   title: "Count",
          //   field: "count",
          //   type: "numeric",
          // },
          // {
          //   title: "Used Count",
          //   field: "count",
          //   type: "numeric",
          // },
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

export default Coupons;
