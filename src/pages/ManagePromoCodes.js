import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { usePromoCodes } from "hooks";
import moment from "moment";
import Swal from "sweetalert2";

const ManagePromoCodes = () => {
  const { promoCodes, setRealtime } = usePromoCodes();
  console.log(promoCodes);
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/promo-code/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          promoCodeIds: data,
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
    <>
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
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Promo Codes"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Promo Codes"),
            },
          ],
        }}
        title={"Promo Codes"}
        data={
          promoCodes === null
            ? []
            : promoCodes?.map((promoCode, i) => ({
                ...promoCode,
                sl: i + 1,
                End: moment(promoCode?.endingDate).format("lll"),
                Start: moment(promoCode?.startingDate).format("lll"),
                currentTimestamp: moment(promoCode?.timestamp).format("lll"),
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
            title: "Secret Code",
            field: "secretString",
            searchable: true,
          },
          {
            title: "Discount",
            field: "percentage",
            type: "numeric",
            width: "10%",
            searchable: true,
            cellStyle: { textAlign: "center" },
          },
          {
            title: "Start",
            field: "startingDate",
            type: "date",
            searchable: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "End",
            type: "date",
            field: "endingDate",
            hidden: true,
            searchable: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "Start",
            field: "Start",
            searchable: true,
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "End",
            field: "End",
            searchable: true,
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("ll"),
          },
          {
            title: "Max Cashback",
            field: "maxCashBack",
            searchable: true,
            type: "numeric",
            cellStyle: { textAlign: "center" },
          },
          {
            title: "Max Use",
            field: "numberOfTimeUsed",
            type: "numeric",
            cellStyle: { textAlign: "center" },
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
              const result = await fetch(`${BASE_URL}/promo-code/create`, {
                method: "POST",
                body: JSON.stringify({
                  numberOfTimeUsed: data?.numberOfTimeUsed,
                  secretString: data?.secretString,
                  percentage: data?.percentage,
                  startingDate: data?.startingDate,
                  endingDate: data?.endingDate,
                  maxCashBack: data?.maxCashBack,
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
            console.log(data);
          },
          onRowUpdate: async (newData, oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/promo-code/update`, {
                method: "PUT",
                body: JSON.stringify({
                  promoCodeId: oldData._id,
                  numberOfTimeUsed: newData?.numberOfTimeUsed,
                  secretString: newData?.secretString,
                  percentage: newData?.percentage,
                  startingDate: newData?.startingDate,
                  endingDate: newData?.endingDate,
                  maxCashBack: newData?.maxCashBack,
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
              console.log(error);
              Swal.fire({ icon: "error", text: error.message });
            } finally {
              setRealtime((prev) => !prev);
            }
            console.log(newData);
          },
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/promo-code/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  promoCodeIds: [oldData?._id],
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
            tooltip: "Delete selected promocodes",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
          },
        ]}
        isLoading={promoCodes === null}
      />
    </>
  );
};

export default ManagePromoCodes;
