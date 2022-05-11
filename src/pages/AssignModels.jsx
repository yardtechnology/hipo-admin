import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { formatCurrency } from "@ashirbad/js-core";
import { BASE_URL } from "configs";
import { isValidOnlyAlphabates } from "helpers";
import { usePremium, useVehicleCategory } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const AssignModels = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { premiums, setRealtime } = usePremium();
  console.log(premiums);
  const { vehicleCategory } = useVehicleCategory();
  return (
    <>
      <MaterialTable
        options={{
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
        title={"Assign Models"}
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
            title: "Vehicle Make",
            field: "vehicleMake",
            required: true,
            editPlaceholder: "",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
            validate: ({ vehicleMake }) => {
              if (!vehicleMake) {
                return "Vehicle Make is required";
              }
              if (!isValidOnlyAlphabates(vehicleMake)) {
                return "Vehicle Make should be alphabates";
              }
              return true;
            },
            searchable: true,
          },
          {
            title: "Vehicle Model",
            field: "vehicleModel",
            headerStyle: {
              textAlign: "center",
            },
            searchable: true,
            validate: ({ vehicleModel }) => {
              if (!vehicleModel) {
                return "Vehicle Model is required";
              }
              if (!isValidOnlyAlphabates(vehicleModel)) {
                return "Vehicle Model should be alphabates";
              }
              return true;
            },
          },
          {
            title: "Vehicle Category",
            field: "vehicleCategory",
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
                ? Swal.fire({
                    text: "Premium added Successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/premium/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: JSON.stringify({
                    totalBooking: newData?.totalBooking,
                    benefit: newData?.benefit,
                    isActive: newData?.isActive,
                  }),
                }
              );
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Premium updated Successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/premium/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              console.log(res);
              res?.status === 200
                ? Swal.fire({
                    text: "Premium deleted Successfully",
                    icon: "success",
                  })
                : Swal.fire({ text: "Something went wrong", icon: "error" });
            } catch (error) {
              console.log(error);
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
    </>
  );
};

export default AssignModels;
