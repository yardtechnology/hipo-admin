import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { BASE_URL } from "configs";
import { useRentalPackages } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const SetRentalPackage = () => {
  const { packages, setRealtime } = useRentalPackages();
  const [loading, setLoading] = useState(false);
  const handleBulkDelete = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/rental-package/all`, {
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
      console.log(res);
      response.status === 200
        ? Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Package Deleted Successfully",
          })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      console.log(res.error.message);
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
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Supports"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Supports"),
            },
          ],
        }}
        title={"Set Rental Package"}
        // data={
        //   async (query) => {
        //     const data = await fetchSupports(query?.pageSize, query?.page);
        //     console.log(data);
        //     return data === null
        //       ? []
        //       : data?.map((supports) => ({
        //           ...supports,
        //           // createdAt: moment(supports.createdAt).format("DD-MM-YYYY"),
        //           // updatedAt: moment(supports.updatedAt).format("DD-MM-YYYY"),
        //         }));
        //   }

        // }
        data={
          packages === null
            ? []
            : packages?.map((rentalPackage, i) => ({
                ...rentalPackage,
                sl: i + 1,
                distanceInKm: rentalPackage?.distance / 1000,
                durationInMin: rentalPackage?.duration / 60,
                // createdAt: moment(supports.createdAt).format("DD-MM-YYYY"),
                // updatedAt: moment(supports.updatedAt).format("DD-MM-YYYY"),
              }))
        }
        isLoading={loading === true || packages === null}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },

          {
            title: "Distance(KM)",
            field: "distanceInKm",
            type: "numeric",
            render: (rowData) => {
              return rowData.distance / 1000;
            },
            searchable: true,
          },
          {
            title: "Duration(Min)",
            type: "numeric",
            field: "durationInMin",
            render: (rowData) => {
              return rowData.duration / 60;
            },
            searchable: true,
          },

          {
            title: "Timestamp",
            searchable: true,
            field: "timestamp",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            editable: "never",
            export: false,
          },

          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            export: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
        ]}
        editable={{
          onRowAdd: async (newData) => {
            console.log(newData);
            try {
              setLoading(true);
              const response = await fetch(`${BASE_URL}/rental-package`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  distance: newData?.distanceInKm * 1000,
                  duration: newData.durationInMin * 60,
                }),
              });
              const res = await response.json();
              console.log(res);
              response.status === 200
                ? Swal.fire({
                    icon: "success",
                    title: "Added!",
                    text: "Package Added Successfully",
                  })
                : Swal.fire({ icon: "error", text: "Something Went Wrong" });
              console.log(res.error.message);
            } catch (error) {
              console.log(error);
              setLoading(false);
            } finally {
              setRealtime((prev) => !prev);
              setLoading(false);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            console.log(newData);
            try {
              setLoading(true);
              const response = await fetch(
                `${BASE_URL}/rental-package/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: JSON.stringify({
                    distance: newData?.distanceInKm * 1000,
                    duration: newData.durationInMin * 60,
                  }),
                }
              );
              const res = await response.json();
              console.log(res);
              response.status === 200
                ? Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Package Updated Successfully",
                  })
                : Swal.fire({ icon: "error", text: "Something Went Wrong" });
              console.log(res.error.message);
            } catch (error) {
              console.log(error);
              setLoading(false);
            } finally {
              setRealtime((prev) => !prev);
              setLoading(false);
            }
          },

          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(
                `${BASE_URL}/rental-package/${oldData?._id}`,
                {
                  method: "DELETE",

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res.message })
                : Swal.fire({ icon: "error", text: res.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        actions={[
          {
            tooltip: "Delete selected supports",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(
                data.map((data) => data?._id),
                setRealtime((prev) => !prev)
              ),
          },
        ]}
      />
    </>
  );
};

export default SetRentalPackage;
