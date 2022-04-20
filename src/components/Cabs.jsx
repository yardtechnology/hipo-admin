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
        const response = await fetch(`${BASE_URL}/city/cabs/${city?.name}`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        console.log(arr);
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
          selection: "true",
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
                // vehicleCategory: cab?.vehicleCategory?.name,
                currentTimestamp: moment(cab.createdAt).format("DD-MM-YYYY"),
                vehicleCategoryName: cab?.vehicleCategory?.name,
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },

          {
            title: "Vehicle category",
            field: "vehicleCategoryName",
            // field: "vehicleCategory",
            render: (rowData) => {
              return rowData?.vehicleCategory?.name;
            },

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
          },
          {
            title: "Price Per Min",
            field: "perMinute",
            type: "numeric",
            searchable: true,
            render: ({ perMinute }) => formatCurrency(perMinute),
          },
          {
            title: "Base Fare",
            field: "baseFare",
            type: "numeric",
            searchable: true,
            render: ({ baseFare }) => formatCurrency(baseFare),
          },
          {
            title: "Allowance",
            field: "allowance",
            type: "numeric",
            searchable: true,
            render: ({ allowance }) => formatCurrency(allowance),
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
              console.log(data);
              const response = await fetch(`${BASE_URL}/cab`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  vehicleCategory: data?.vehicleCategory,
                  perKilometer: data?.perKilometer,
                  perMinute: data?.perMinute,
                  baseFare: data?.baseFare,
                  allowance: data?.allowance,
                  city: city?._id,
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
              console.log(newData);
              const response = await fetch(`${BASE_URL}/cab/${oldData?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  vehicleCategory: newData?.vehicleCategory,
                  perKilometer: newData?.perKilometer,
                  perMinute: newData?.perMinute,
                  baseFare: newData?.baseFare,
                  allowance: newData?.allowance,
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
