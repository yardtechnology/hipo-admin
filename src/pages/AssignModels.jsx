import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Models } from "components";
// import { formatCurrency } from "@ashirbad/js-core";
import { BASE_URL } from "configs";
import { useVehicleMaker } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const AssignModels = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { vehicleMaker, setRealtime } = useVehicleMaker();

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
          vehicleMaker === null
            ? []
            : vehicleMaker?.map((maker, i) => {
                return {
                  ...maker,
                  sl: i + 1,
                  // brandLogo: maker?.logo?.url,
                };
              })
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "5%",
          },

          {
            title: "Vehicle Make",
            field: "name",
            required: true,
            editPlaceholder: "",
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              textAlign: "center",
            },
            validate: (value) => {
              if (
                value?.name?.length <= 0 ||
                value?.name?.length === undefined ||
                value?.name?.length === null ||
                value?.name?.length === "" ||
                value?.name?.length === " "
              ) {
                return "Required";
              }
              return true;
            },
            // validate: ({ name }) => {
            //   if (!name) {
            //     return "Vehicle Make is required";
            //   }
            //   if (!isValidOnlyAlphabates(name)) {
            //     return "Vehicle Make should be alphabates";
            //   }
            //   return true;
            // },
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
        detailPanel={({ rowData }) => {
          return <Models rowData={rowData} setRealtime={setRealtime} />;
        }}
        editable={{
          onRowAdd: async (data) => {
            var formdata = new FormData();
            formdata.append("name", data?.name);
            // formdata.append("logo", data?.brandLogo.target.files[0]);
            try {
              const response = await fetch(`${BASE_URL}/vehicle-maker`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: formdata,
              });
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Maker added successfully",
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
            const formdata = new FormData();
            formdata.append("name", newData?.name);
            oldData?.brandLogo !== newData?.brandLogo &&
              formdata.append("logo", newData?.brandLogo.target.files[0]);
            try {
              const response = await fetch(
                `${BASE_URL}/vehicle-maker/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: formdata,
                }
              );
              const res = await response.json();

              res?.status === 200
                ? Swal.fire({
                    text: "Vehicle Maker updated Successfully",
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
                `${BASE_URL}/vehicle-maker/${oldData?._id}`,
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
                ? Swal.fire({
                    text: "Vehicle Maker deleted Successfully",
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
        isLoading={vehicleMaker?.length === 0 ? true : false}
      />
    </>
  );
};

export default AssignModels;
