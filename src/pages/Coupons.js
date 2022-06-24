import { formatCurrency } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { formatCurrency } from "@ashirbad/js-core";
import { Chip, TextField } from "@mui/material";
import { BASE_URL } from "configs";
import { useCoupons } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const Coupons = () => {
  const { coupons, setRealtime } = useCoupons();
  const [loading, setLoading] = useState(false);
  const handleBulkDelete = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/coupon/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          ids: data,
        }),
      });
      const res = await response.json();

      res?.status === 200
        ? Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Coupon Deleted Successfully",
          })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      setLoading(false);
      setRealtime((prev) => !prev);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
                valid_From: moment(coupon?.startDate).format("DD-MM-YYYY"),
                valid_Till: moment(coupon?.endDate).format("DD-MM-YYYY"),
                validFrom: coupon?.startDate,
                validTill: coupon?.endDate,
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
            validate: (value) => {
              if (
                value?.code?.length <= 0 ||
                value?.code?.length === undefined ||
                value?.code?.length === null ||
                value?.code?.length === "" ||
                value?.code?.length === " "
              ) {
                return "Required";
              }
              return true;
            },
          },
          {
            title: "Valid From",
            field: "valid_From",
            type: "date",
            emptyValue: "--",
            export: true,
            hidden: true,
          },
          {
            title: "Valid Till",
            field: "valid_Till",
            type: "date",
            emptyValue: "--",
            export: true,
            hidden: true,
          },
          {
            export: false,
            title: "Valid From",
            field: "validFrom",
            type: "date",
            emptyValue: "--",
            render: (rowData) => moment(rowData.validFrom).format("LL"),
            editComponent: ({ value, onChange, rowData }) => {
              return (
                <>
                  <TextField
                    id="date"
                    type="date"
                    value={value?.split("T")[0]}
                    onChange={(e) => onChange(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={value === "" || value === undefined ? true : false}
                    helperText={
                      value === "" || value === undefined ? "Required" : ""
                    }
                    // required={value === "" ? true : false}
                    // error={value === "" ? true : false}
                  />
                </>
              );
            },
            searchable: true,
          },
          {
            export: false,
            title: "Valid Till",
            field: "validTill",
            type: "date",
            emptyValue: "--",
            render: (rowData) => moment(rowData.validTill).format("LL"),

            // validate: (rowData) => {
            //   if (rowData.validFrom > rowData.validTo) {
            //     return "Please select valid to date";
            //   }
            // },
            editComponent: ({ value, onChange, rowData }) => {
              // console.log(value);
              return (
                <>
                  <TextField
                    id="date"
                    type="date"
                    value={value?.split("T")[0]}
                    onChange={(e) => onChange(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={
                      value === "" || value === undefined
                        ? true
                        : new Date(value) < new Date(rowData?.validFrom)
                        ? true
                        : `${new Date(value)} === ${new Date(
                            rowData?.validFrom
                          )}`
                        ? false
                        : false
                    }
                    helperText={
                      value === "" || value === undefined
                        ? "Required"
                        : new Date(value) < new Date(rowData?.validFrom)
                        ? "Valid Till should be greater than Valid From "
                        : ""
                    }
                  />
                </>
              );
            },
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
            emptyValue: "--",
            render: ({ maxDiscount }) => formatCurrency(maxDiscount),
            export: false,
            searchable: true,
          },
          {
            title: "Discount",
            field: "discount",
            type: "numeric",
            render: ({ discount }) => `${discount}%`,
            emptyValue: "--",
            validate: (rowData) => (rowData?.discount > 0 ? true : "Required"),

            export: false,
            searchable: true,
          },
          {
            title: "Max Uses",
            field: "maxUses",
            type: "numeric",
            emptyValue: "--",
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
            emptyValue: "--",

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
            title: "Status",
            field: "status",
            searchable: true,
            hidden: true,
            export: true,
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
                  endDate: data?.validTill,
                }),
              });
              const res = await response.json();

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
                    endDate: newData?.validTill,
                    isActive: newData?.isActive,
                  }),
                }
              );
              const res = await response.json();

              res.status === 200
                ? Swal.fire({ text: res.message, icon: "success" })
                : Swal.fire({ text: res.message, icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/coupon/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({ text: res.message, icon: "success" })
                : Swal.fire({ text: res.message, icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        actions={[
          {
            tooltip: "Delete selected coupon",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(
                data.map((data) => data?._id),
                setRealtime((prev) => !prev)
              ),
          },
        ]}
        isLoading={coupons === null || loading}
      />
    </>
  );
};

export default Coupons;
