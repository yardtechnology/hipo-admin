import MaterialTable from "@material-table/core";
// import { Switch } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
import { useCities } from "hooks";
import { Cabs } from "components";
const Localization = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { cities, setRealtime } = useCities();
  return (
    <>
      <MaterialTable
        options={{
          whiteSpace: "nowrap",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Localization"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Localization"),
            },
          ],
        }}
        title={"Localization"}
        // data={[
        //   {
        //     sl: 1,
        //     city: "Bhubaneswar",
        //     country: "India",
        //     range: 25,
        //     zipCode: 751030,
        //     status: "On",
        //   },
        // ]}
        data={
          cities === null
            ? []
            : cities?.map((item, index) => ({
                ...item,
                sl: index + 1,
                currentTimestamp: moment(item?.createdAt).format("DD-MM-YYYY"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "City",
            field: "name",
            searchable: true,
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
          },
          {
            title: "Latitude",
            field: "latitude",
            searchable: true,
            validate: (rowData) => (rowData?.latitude > 0 ? true : "Required"),
            // validate: (value) => {
            //   if (
            //     value?.latitude?.length <= 0 ||
            //     value?.latitude?.length === undefined
            //   ) {
            //     return "Required";
            //   }
            //   return false;
            // },
          },
          {
            title: "Longitude",
            field: "longitude",
            searchable: true,
            validate: (rowData) => (rowData?.longitude > 0 ? true : "Required"),
          },
          // {
          //   title: "Country",
          //   field: "country",
          //   searchable: true,
          // },
          // {
          //   title: "Zip Code",
          //   field: "zipCode",
          //   type: "numeric",
          //   searchable: true,
          // },
          {
            title: "Range",
            field: "range",
            type: "numeric",
            render: ({ range }) => `${range} Km`,
            searchable: true,
            validate: (rowData) => (rowData?.range > 0 ? true : "Required"),
            // type: "numeric",
          },
          {
            title: "Status",
            field: "isOperational",
            searchable: true,
            lookup: {
              true: "Active",
              false: "Inactive",
            },
            validate: (rowData) => (rowData?.isOperational ? true : "Required"),
            // render: (row) => (
            //   <>
            //     <Switch
            //     // size="small"
            //     // variant="outlined"
            //     // color="secondary"
            //     // label={row?.status}
            //     />
            //   </>
            // ),
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
            field: "currentTimestamp",
            editable: "never",
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
        ]}
        detailPanel={({ rowData }) => {
          return <Cabs city={rowData} />;
        }}
        editable={{
          onRowAdd: async (data) => {
            try {
              const response = await fetch(`${BASE_URL}/city`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  name: data?.name,
                  latitude: data?.latitude,
                  longitude: data?.longitude,
                  range: data?.range,
                  isOperational: data?.isOperational,
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
              const response = await fetch(`${BASE_URL}/city/${oldData?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  name: newData?.name,
                  latitude: newData?.latitude,
                  longitude: newData?.longitude,
                  range: newData?.range,
                  isOperational: newData?.isOperational,
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
              const response = await fetch(`${BASE_URL}/city/${oldData?._id}`, {
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
    </>
  );
};

export default Localization;
