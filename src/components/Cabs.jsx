import React, { useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useIsMounted, useVehicleCategory } from "hooks";
import { formatCurrency } from "@ashirbad/js-core";
import moment from "moment";
import { BASE_URL } from "configs";
import Swal from "sweetalert2";
const Cabs = ({ city }) => {
  console.log(city);
  const { vehicleCategory } = useVehicleCategory();
  const { isMounted } = useIsMounted();
  const [cabs, setCabs] = React.useState(null);
  const [realtime, setRealtime] = React.useState(false);
  useEffect(() => {
    const fetchCabs = async () => {
      if (!isMounted.current) return;

      try {
        const response = await fetch(`${BASE_URL}/city/cabs/${city?._id}`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        // console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setCabs(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCabs();
  }, [realtime, city, isMounted]);
  console.log(cabs);

  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Cabs"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Cabs"),
            },
          ],
        }}
        title={`Cabs of ${city?.name}`}
        data={
          cabs === null
            ? []
            : cabs?.map((cab) => ({
                ...cab,
                sl: cabs.indexOf(cab) + 1,
                // vehicleCategory: cab?.vehicleCategory?.name,
                currentTimestamp: moment(cab.createdAt).format("DD-MM-YYYY"),
                vehicleCategoryName: cab?.vehicleCategory?.name,
                vehicleCategoryId: cab?.vehicleCategory?._id,
              }))
        }
        isLoading={cabs === null}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
          {
            title: "Vehicle category",
            field: "vehicleCategoryName",
            export: true,
            hidden: true,

            // field: "vehicleCategory",

            // lookup: {
            //   ...vehicleCategory?.reduce((acc, item) => {
            //     acc[item?._id] = item?.name;
            //     return acc;
            //   }, {}),
            // },
            editComponent: (props) => {
              return (
                <select
                  value={props.value}
                  onChange={(e) => {
                    props.onChange(e.target.value);
                  }}
                >
                  <option>Select vehicle category</option>
                  {vehicleCategory?.map((item) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              );
            },
          },
          {
            title: "Vehicle category",
            field: "vehicleCategoryId",
            // field: "vehicleCategory",
            render: (rowData) => {
              return rowData?.vehicleCategory?.name;
            },
            export: false,

            // lookup: {
            //   ...vehicleCategory?.reduce((acc, item) => {
            //     acc[item?._id] = item?.name;
            //     return acc;
            //   }, {}),
            // },
            editComponent: (props) => {
              return (
                <select
                  value={props.value}
                  onChange={(e) => {
                    props.onChange(e.target.value);
                  }}
                >
                  <option>Select vehicle category</option>
                  {vehicleCategory?.map((item) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              );
            },
          },
          {
            title: "Price Per KM",
            field: "perKilometer",
            type: "numeric",
            searchable: true,
            render: ({ perKilometer }) => formatCurrency(perKilometer),
            validate: (rowData) =>
              rowData?.perKilometer > 0 ? true : "Required",
          },
          {
            title: "Outstation Price Per KM(Two Way)",
            field: "twoWayOutstationPerKilometer",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ twoWayOutstationPerKilometer }) =>
              formatCurrency(twoWayOutstationPerKilometer),
            // validate: (rowData) =>
            //   rowData?.twoWayOutstationPerKilometer > 0 ? true : "Required",
          },
          {
            title: "Outstation Price Per KM(One Way)",
            field: "oneWayOutstationPerKilometer",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ oneWayOutstationPerKilometer }) =>
              formatCurrency(oneWayOutstationPerKilometer),
            // validate: (rowData) =>
            //   rowData?.oneWayOutstationPerKilometer > 0 ? true : "Required",
          },
          {
            title: "With Driver Price Per KM",
            field: "withDriverPerKilometer",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ withDriverPerKilometer }) =>
              formatCurrency(withDriverPerKilometer),
            validate: (rowData) =>
              rowData?.withDriverPerKilometer > 0 ? true : "Required",
          },

          {
            title: "Price Per Min",
            field: "perMinute",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ perMinute }) => formatCurrency(perMinute),
            validate: (rowData) => (rowData?.perMinute > 0 ? true : "Required"),
          },
          {
            title: "Outstation Price Per Min(Two Way)",
            field: "twoWayOutstationPerMinute",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ twoWayOutstationPerMinute }) =>
              formatCurrency(twoWayOutstationPerMinute),
            // validate: (rowData) =>
            //   rowData?.twoWayOutstationPerMinute > 0 ? true : "Required",
          },
          {
            title: "Outstation Price Per Min(One Way)",
            field: "oneWayOutstationPerMinute",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ oneWayOutstationPerMinute }) =>
              formatCurrency(oneWayOutstationPerMinute),
            // validate: (rowData) =>
            //   rowData?.oneWayOutstationPerMinute > 0 ? true : "Required",
          },
          {
            title: "With Driver Price Per Min",
            field: "withDriverPerMinute",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ withDriverPerMinute }) =>
              formatCurrency(withDriverPerMinute),
            // validate: (rowData) =>
            //   rowData?.withDriverPerMinute > 0 ? true : "Required",
          },

          {
            title: "Base Fare",
            field: "baseFare",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ baseFare }) => formatCurrency(baseFare),
            validate: (rowData) => (rowData?.baseFare > 0 ? true : "Required"),
          },
          {
            title: "Outstation Base Fare(Two Way)",
            field: "twoWayOutstationBaseFare",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ twoWayOutstationBaseFare }) =>
              formatCurrency(twoWayOutstationBaseFare),
            // validate: (rowData) =>
            //   rowData?.twoWayOutstationBaseFare > 0 ? true : "Required",
          },
          {
            title: "Outstation Base Fare(One Way)",
            field: "oneWayOutstationBaseFare",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ oneWayOutstationBaseFare }) =>
              formatCurrency(oneWayOutstationBaseFare),
            // validate: (rowData) =>
            //   rowData?.oneWayOutstationBaseFare > 0 ? true : "Required",
          },
          {
            title: "With Driver Base Fare",
            field: "withDriverBaseFare",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ withDriverBaseFare }) =>
              formatCurrency(withDriverBaseFare),
            // validate: (rowData) =>
            //   rowData?.withDriverBaseFare > 0 ? true : "Required",
          },

          {
            title: "Allowance",
            field: "allowance",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ allowance }) => formatCurrency(allowance),
            validate: (rowData) => (rowData?.allowance > 0 ? true : "Required"),
          },
          {
            title: "Outstation Allowance(Two Way)",
            field: "twoWayOutstationAllowance",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ twoWayOutstationAllowance }) =>
              formatCurrency(twoWayOutstationAllowance),
            // validate: (rowData) =>
            //   rowData?.twoWayOutstationAllowance > 0 ? true : "Required",
          },
          {
            title: "Outstation Allowance(One Way)",
            field: "oneWayOutstationAllowance",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ oneWayOutstationAllowance }) =>
              formatCurrency(oneWayOutstationAllowance),
            // validate: (rowData) =>
            //   rowData?.oneWayOutstationAllowance > 0 ? true : "Required",
          },
          {
            title: "With Driver Allowance",
            field: "withDriverAllowance",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ withDriverAllowance }) =>
              formatCurrency(withDriverAllowance),
            // validate: (rowData) =>
            //   rowData?.withDriverAllowance > 0 ? true : "Required",
          },
          {
            title: "Rental Exceeded Price(KM)",
            field: "rentalExtraPerKilometer",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ rentalExtraPerKilometer }) =>
              formatCurrency(rentalExtraPerKilometer),
          },
          {
            title: "Rental Exceeded Price(Min)",
            field: "rentalExtraPerMinute",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ rentalExtraPerMinute }) =>
              formatCurrency(rentalExtraPerMinute),
          },

          {
            title: "Tax",
            field: "tax",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ tax }) => `${tax}%`,
            validate: (rowData) => (rowData?.tax > 0 ? true : "Required"),
          },
          {
            title: "Cancellation %",
            field: "cancellationPercentage",
            type: "numeric",
            emptyValue: 0,
            searchable: true,
            render: ({ cancellationPercentage }) =>
              `${cancellationPercentage}%`,
            validate: (rowData) =>
              rowData?.cancellationPercentage > 0 ? true : "Required",
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
            try {
              // console.log(data);
              const response = await fetch(`${BASE_URL}/cab`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  vehicleCategory: data?.vehicleCategoryId,
                  perKilometer: data?.perKilometer,
                  perMinute: data?.perMinute,
                  baseFare: data?.baseFare,
                  allowance: data?.allowance,
                  city: city?._id,
                  tax: data?.tax,
                  cancellationPercentage: data?.cancellationPercentage,
                  twoWayOutstationPerKilometer:
                    data?.twoWayOutstationPerKilometer,
                  oneWayOutstationPerKilometer:
                    data?.oneWayOutstationPerKilometer,
                  withDriverPerKilometer: data?.withDriverPerKilometer,

                  oneWayOutstationPerMinute: data?.oneWayOutstationPerMinute,
                  twoWayOutstationPerMinute: data?.twoWayOutstationPerMinute,
                  withDriverPerMinute: data?.withDriverPerMinute,
                  withDriverBaseFare: data?.withDriverBaseFare,
                  twoWayOutstationBaseFare: data?.twoWayOutstationBaseFare,
                  oneWayOutstationBaseFare: data?.oneWayOutstationBaseFare,
                  withDriverAllowance: data?.withDriverAllowance,
                  oneWayOutstationAllowance: data?.oneWayOutstationAllowance,
                  twoWayOutstationAllowance: data?.twoWayOutstationAllowance,
                  rentalExtraPerKilometer: data?.rentalExtraPerKilometer,
                  rentalExtraPerMinute: data?.rentalExtraPerMinute,
                }),
              });
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              // console.log(newData);
              const response = await fetch(`${BASE_URL}/cab/${oldData?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  vehicleCategory: newData?.vehicleCategoryId,
                  perKilometer: newData?.perKilometer,
                  perMinute: newData?.perMinute,
                  baseFare: newData?.baseFare,
                  allowance: newData?.allowance,
                  tax: newData?.tax,
                  cancellationPercentage: newData?.cancellationPercentage,
                  twoWayOutstationPerKilometer:
                    newData?.twoWayOutstationPerKilometer,
                  oneWayOutstationPerKilometer:
                    newData?.oneWayOutstationPerKilometer,
                  withDriverPerKilometer: newData?.withDriverPerKilometer,

                  oneWayOutstationPerMinute: newData?.oneWayOutstationPerMinute,
                  twoWayOutstationPerMinute: newData?.twoWayOutstationPerMinute,
                  withDriverPerMinute: newData?.withDriverPerMinute,
                  withDriverBaseFare: newData?.withDriverBaseFare,
                  twoWayOutstationBaseFare: newData?.twoWayOutstationBaseFare,
                  oneWayOutstationBaseFare: newData?.oneWayOutstationBaseFare,
                  withDriverAllowance: newData?.withDriverAllowance,
                  oneWayOutstationAllowance: newData?.oneWayOutstationAllowance,
                  twoWayOutstationAllowance: newData?.twoWayOutstationAllowance,
                  rentalExtraPerKilometer: newData?.rentalExtraPerKilometer,
                  rentalExtraPerMinute: newData?.rentalExtraPerMinute,
                }),
              });
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(`${BASE_URL}/cab/${oldData?._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
              });
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
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

export default Cabs;
