import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Avatar } from "@mui/material";
import { PhotoUpload } from "components/core";
import { useService } from "hooks";
import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const ManageServices = () => {
  const { services, setRealtime } = useService();
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/service/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          ids: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();

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
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          addRowPosition: "first",
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Services"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Services"),
            },
          ],
        }}
        title={"Services"}
        data={
          services === null
            ? []
            : services?.map((service, i) => ({
                ...service,
                sl: i + 1,
                currentTimestamp: moment(service?.timestamp).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
          {
            title: "Service Name",
            field: "serviceName",
            searchable: true,
          },
          {
            export: false,
            title: "Icon",
            field: "iconUrl",
            render: ({ iconUrl }) => (
              <Avatar sx={{ height: 60, width: 60 }} src={iconUrl} />
            ),
            editComponent: ({ value, onChange }) => {
              return (
                <>
                  <PhotoUpload value={value} onChange={onChange} />
                </>
              );
            },
          },
          {
            export: false,
            title: "Image",
            field: "imageUrl",
            render: ({ imageUrl }) => (
              <Avatar
                variant="square"
                src={imageUrl}
                sx={{ height: 70, width: 120 }}
              />
            ),
            editComponent: ({ value, onChange }) => {
              return (
                <>
                  <PhotoUpload value={value} onChange={onChange} />
                </>
              );
            },
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
        actions={[
          {
            tooltip: "Delete all selected Services",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
          },
        ]}
        editable={{
          onRowAdd: async (data) => {
            const formdata = new FormData();
            formdata.append("serviceName", data?.serviceName);
            formdata.append("icon", data?.iconUrl?.target?.files[0]);
            formdata.append("image", data?.imageUrl?.target?.files[0]);
            try {
              const result = await fetch(`${BASE_URL}/service/create`, {
                method: "POST",
                body: formdata,
              });
              const res = await result.json();

              res?.status === 200
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
            const formdata = new FormData();
            oldData?.iconUrl !== newData.iconUrl &&
              formdata.append("icon", newData?.iconUrl?.target?.files[0]);
            oldData?.imageUrl !== newData.imageUrl &&
              formdata.append("image", newData?.imageUrl?.target?.files[0]);
            formdata.append("serviceId", oldData?._id);
            formdata.append("serviceName", newData?.serviceName);
            try {
              const result = await fetch(`${BASE_URL}/service/update`, {
                method: "PUT",
                body: formdata,
              });
              const res = await result.json();

              res?.status === 200
                ? Swal.fire({ icon: "success", text: res?.success?.message })
                : Swal.fire({ icon: "error", text: res.error.message });
            } catch (error) {
              console.log(error);
              Swal.fire({ icon: "error", text: error.message });
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/service/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  ids: [oldData?._id],
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();

              res?.status === 200
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
        isLoading={services === null}
      />
    </div>
  );
};

export default ManageServices;
