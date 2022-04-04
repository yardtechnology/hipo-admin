import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { formatCurrency } from "@ashirbad/js-core";
import { Chip } from "@mui/material";
import { BASE_URL } from "configs";
import { usePremium } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const Premium = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { premiums, setRealtime } = usePremium();
  console.log(premiums);
  return (
    <>
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Premiums"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Premiums"),
            },
          ],
        }}
        title={"Manage Premiums"}
        data={
          premiums === null
            ? []
            : premiums?.map((premium, i) => ({
                ...premium,
                sl: i + 1,
                currentTimestamp: moment(premium.createdAt).format("LL"),
                active: premium?.isActive ? "Active" : "Inactive",
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          {
            title: "Total Bookings",
            field: "totalBooking",
            type: "numeric",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
            searchable: true,
          },

          {
            title: "Benefit",
            field: "benefit",
            render: ({ benefit }) => formatCurrency(benefit),
            type: "numeric",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
            searchable: true,
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
            field: "isActive",
            searchable: true,
            render: (row) => (
              <>
                <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.active}
                />
              </>
            ),
            lookup: {
              true: "Active",
              false: "Inactive",
            },
          },
          {
            title: "Status",
            field: "active",
            searchable: true,
            hidden: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "timestamp",
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
        ]}
        editable={{
          onRowAdd: async (data) => {
            console.log(data);
            // const { data } = await axios.post(`${BASE_URL}/coupons`, data);
            // console.log(data);
            try {
              const response = await fetch(`${BASE_URL}/premium`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  totalBooking: data?.totalBooking,
                  benefit: data?.benefit,
                  isActive: data?.isActive,
                }),
              });
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({ text: res.message, icon: "success" })
                : Swal.fire({ text: res.message, icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
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

export default Premium;
