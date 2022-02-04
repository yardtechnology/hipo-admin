import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { BASE_URL } from "configs";
import { useCrowd } from "hooks";
import moment from "moment";
import Swal from "sweetalert2";
const ManageCrowd = () => {
  const { crowd, setRealtime } = useCrowd();
  console.log(crowd);
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/crowd/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          crowdIds: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: res?.success?.message })
        : Swal.fire({ icon: "error", text: res.error.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  return (
    <div style={{ marginTop: "2vh" }}>
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
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Manage Crowd"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Manage Crowd"),
            },
          ],
        }}
        title={"Crowd"}
        data={
          crowd === null
            ? []
            : crowd?.map((crowd, i) => ({
                ...crowd,
                sl: i + 1,
                currentTimestamp: moment(crowd?.timestamp).format("lll"),
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
            title: "Min",
            field: "min",
            type: "numeric",
            width: "40%",
            searchable: true,
          },
          {
            title: "Max",
            searchable: true,
            field: "max",
            type: "numeric",
            width: "40%",
          },
          {
            title: "Timestamp",
            searchable: true,
            field: "timestamp",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
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
          onRowAdd: async (data) => {
            try {
              const result = await fetch(`${BASE_URL}/crowd/create`, {
                method: "POST",
                body: JSON.stringify({
                  min: data?.min,
                  max: data?.max,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res.success.message })
                : Swal.fire({ icon: "error", text: res.error.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/crowd/update`, {
                method: "PUT",
                body: JSON.stringify({
                  crowdId: oldData._id,
                  min: newData?.min,
                  max: newData?.max,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res?.success?.message })
                : Swal.fire({ icon: "error", text: res.error.message });
            } catch (error) {
              console.log(error);
              Swal.fire({ icon: "error", text: error.message });
            } finally {
              setRealtime((prev) => !prev);
            }
            console.log(newData);
          },
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/crowd/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  crowdIds: [oldData?._id],
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res?.success?.message })
                : Swal.fire({ icon: "error", text: res.error.message });
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
            tooltip: "Delete all",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
          },
        ]}
        isLoading={crowd === null}
      />
    </div>
  );
};

export default ManageCrowd;
