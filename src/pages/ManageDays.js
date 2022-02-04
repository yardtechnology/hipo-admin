import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { useDays } from "hooks";
import moment from "moment";
import Swal from "sweetalert2";

const ManageDays = () => {
  const { days, setRealtime } = useDays();
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/day/delete`, {
        method: "PUT",
        body: JSON.stringify({
          numArray: data,
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
  };
  console.log(days);
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
                ExportPdf(cols, datas, "Manage Days"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Manage Days"),
            },
          ],
        }}
        title={"Days"}
        data={
          days === null
            ? []
            : days?.map((day, i) => ({
                ...day,
                sl: i + 1,
                currentTimestamp: moment(day?.timestamp).format("lll"),
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
            title: "Days",
            field: "day",
            type: "numeric",
            width: "10%",
            searchable: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "timestamp",
            editable: "never",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
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
              const result = await fetch(`${BASE_URL}/day/create`, {
                method: "POST",
                body: JSON.stringify({
                  num: data?.day,
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
          onRowUpdate: async (newData, oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/day/update`, {
                method: "PUT",
                body: JSON.stringify({
                  oldNum: oldData?.day,
                  newNum: newData?.day,
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
            console.log(oldData.day);
            try {
              const result = await fetch(`${BASE_URL}/day/delete`, {
                method: "PUT",
                body: JSON.stringify({
                  numArray: [oldData?.day],
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
        }}
        actions={[
          {
            tooltip: "Delete all selected Days",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?.day)),
          },
        ]}
        isLoading={days === null}
      />
    </div>
  );
};

export default ManageDays;
