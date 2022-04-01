import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { formatCurrency } from "@ashirbad/js-core";
import { Chip } from "@mui/material";
import { BASE_URL } from "configs";
import { useCoupons } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const Coupons = () => {
  const { coupons, setRealtime } = useCoupons();
  console.log(coupons);
  // const handleBulkDelete = async (data) => {};
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Coupons"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Coupons"),
            },
          ],
        }}
        title={"Manage Coupons"}
        data={
          coupons === null
            ? []
            : coupons?.map((coupon, i) => ({
                ...coupon,
                sl: i + 1,
                validFrom: moment(coupon?.startDate).format("LL"),
                validTo: moment(coupon.endDate).format("LL"),
                status: coupon?.isActive ? "Active" : "Inactive",
                Timestamp: moment(coupon?.createdAt).format("LL"),
                cashback: formatCurrency(coupon?.maxDiscount),
                Discount: `${coupon?.discount}%`,
              }))
          //   [
          //   {
          //     sl: 1,
          //     amount: "100",
          //     typeImage: "",
          //     couponCode: "45#APR",
          //     count: 5,
          //     usedCount: 2,
          //     costPerKm: 7,
          //     seatingCapacity: 5,
          //     status: "active",
          //     maxCashback: 85,
          //     discount: 15,
          //   },
          // ]
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Code",
            field: "code",
          },
          {
            title: "Valid From",
            field: "validFrom",
            type: "date",
            // render: ({ startDate }) => moment(startDate).format("ll"),
          },

          {
            title: "Valid Till",
            field: "validTo",
            type: "date",
            // render: ({ endDate }) => moment(endDate).format("ll"),
          },
          {
            title: "Max Cashback",
            field: "cashback",
            type: "numeric",
            export: true,
            searchable: true,
            hidden: true,
          },
          {
            title: "Discount",
            field: "Discount",
            type: "numeric",
            export: true,
            searchable: true,
            hidden: true,
          },
          {
            title: "Max Cashback",
            field: "maxDiscount",
            type: "numeric",
            render: ({ maxDiscount }) => formatCurrency(maxDiscount),
            export: false,
            searchable: true,
          },
          {
            title: "Discount",
            field: "discount",
            type: "numeric",
            render: ({ discount }) => `${discount}%`,
            export: false,
            searchable: true,
          },
          {
            title: "Max Uses",
            field: "maxUses",
            type: "numeric",
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
            lookup: {
              true: "Active",
              false: "Inactive",
            },
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
            field: "Timestamp",
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
              const response = await fetch(`${BASE_URL}/coupon`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  code: data?.code,
                  discount: data?.discount,
                  maxDiscount: data?.maxDiscount,
                  maxUses: data?.maxUses,
                  startDate: data?.validFrom,
                  endDate: data?.validTo,
                }),
              });
              const res = await response.json();
              console.log(res);
              res.status === 200
                ? Swal.fire({ text: res.message, icon: "success" })
                : Swal.fire({ text: res.message, icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            console.log(newData);
            // const { data } = await axios.put(`${BASE_URL}/coupons/${newData.id}`, newData);
            // console.log(data);
            try {
              const response = await fetch(
                `${BASE_URL}/coupon/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: JSON.stringify({
                    code: newData?.code,
                    discount: newData?.discount,
                    maxDiscount: newData?.maxDiscount,
                    maxUses: newData?.maxUses,
                    startDate: newData?.validFrom,
                    endDate: newData?.validTo,
                    isActive: newData?.isActive,
                  }),
                }
              );
              const res = await response.json();
              console.log(res);
              res.status === 200
                ? Swal.fire({ text: res.message, icon: "success" })
                : Swal.fire({ text: res.message, icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
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
        isLoading={coupons === null}
      />
    </>
  );
};

export default Coupons;
