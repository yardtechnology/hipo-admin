import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { useLanguage } from "hooks";
import moment from "moment";
import Swal from "sweetalert2";

const ManageLanguage = () => {
  const { languages, setRealtime } = useLanguage();
  console.log(languages);
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/language/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          language_idsOrId: data,
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
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          selection: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Languages"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Languages"),
            },
          ],
        }}
        title={"Languages"}
        data={
          languages === null
            ? []
            : languages?.map((language, i) => ({
                ...language,
                sl: i + 1,
                currentTimestamp: moment(language?.timestamp).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
          {
            title: "Language Name",
            field: "languageName",
            searchable: true,
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
              const result = await fetch(`${BASE_URL}/language/create`, {
                method: "POST",
                body: JSON.stringify({
                  languageName: data?.languageName,
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
              const result = await fetch(`${BASE_URL}/language/update`, {
                method: "PUT",
                body: JSON.stringify({
                  language_id: oldData._id,
                  languageName: newData?.languageName,
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
            console.log(oldData._id);
            try {
              const result = await fetch(`${BASE_URL}/language/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  language_idsOrId: [oldData?._id],
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
            tooltip: "Delete all selected Languages",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
          },
        ]}
        isLoading={languages === null}
      />
    </div>
  );
};

export default ManageLanguage;
