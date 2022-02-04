import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
const ManageGenre = () => {
  const DEMO_DATA = [
    { id: 2, name: "Joe" },
    { id: 1, name: "Mary" },
  ];
  const DEMO_COLS = [
    { field: "id", title: "Id", width: 10 },
    { field: "name", title: "Name" },
    { field: "timestamp", title: "TimeStamp" },
  ];
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Customers"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Customers"),
            },
          ],
        }}
        title={"Genres"}
        data={DEMO_DATA}
        columns={DEMO_COLS}
        editable={{
          onRowAdd: () => {},
          onRowUpdate: () => {},
          onRowDelete: () => {},
        }}
      />
    </div>
  );
};

export default ManageGenre;
