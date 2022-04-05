import MaterialTable from "@material-table/core";
import { Avatar } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";

const VehicleCategories = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <>
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
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Vehicle Categories"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Vehicle Categories"),
            },
          ],
        }}
        title={"Manage Vehicle Categories"}
        data={[
          {
            sl: 1,
            typeImage: "",
            categoryName: "Auto",
            featureName: "Pocket Friendly",
            status: "On",
            description:
              "The all too familiar auto rides without the hassle of waiting and haggling for price",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          {
            title: "Category Image",
            field: "typeImageUrl",
            render: ({ typeImageUrl }) => (
              <Avatar
                variant="rounded"
                sx={{ width: "12vh", height: "12vh" }}
              />
            ),
            searchable: true,
          },
          {
            title: "Category Name",
            field: "categoryName",
            searchable: true,
          },
          {
            title: "Brief",
            field: "description",
            searchable: true,
            width: "40%",
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
          onRowAdd: async (data) => {},
          onRowUpdate: async (newData, oldData) => {},
          onRowDelete: async (oldData) => {},
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

export default VehicleCategories;
