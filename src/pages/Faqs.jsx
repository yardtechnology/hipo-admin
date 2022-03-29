import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";

const Faqs = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "2vh" }}>
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Faqs"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Faqs"),
            },
          ],
        }}
        title={"Manage Faqs"}
        data={[
          {
            sl: 1,
            typeImage: "",
            categoryName: "Auto",
            topics: "The all too familiar auto rides Pocket Friendly",
            status: "On",
            topicTitle: "Auto Rides Pocket Friendly",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          // {
          //   title: "Category Image",
          //   field: "typeImageUrl",
          //   render: ({ typeImageUrl }) => (
          //     <Avatar
          //       variant="rounded"
          //       sx={{ width: "12vh", height: "12vh" }}
          //     />
          //   ),
          //   searchable: true,
          // },
          // {
          //   title: "Category Name",
          //   field: "categoryName",
          //   searchable: true,
          // },
          {
            title: "Topic Title",
            field: "topicTitle",
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
        detailPanel={({ rowData }) => {
          return (
            <>
              <div style={{ marginTop: "2vh" }}>
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
                          ExportPdf(cols, datas, "Vehicles"),
                      },
                      {
                        label: "Export CSV",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "Vehicles"),
                      },
                    ],
                  }}
                  title={`Topics of ${rowData?.topicTitle}`}
                  data={[
                    {
                      sl: 1,
                      typeImage: "",
                      featureName: "Auto",
                      costPerKm: 7,
                      status: "On",
                      topics: "The all too familiar auto rides Pocket Friendly",
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
                      title: "Topics",
                      field: "topics",
                      searchable: true,
                    },

                    {
                      title: "Timestamp",
                      // width: "70%",
                      field: "timestamp",
                      editable: "never",
                      render: ({ timestamp }) =>
                        moment(timestamp).format("lll"),
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
                    return (
                      <>
                        <div style={{ marginTop: "2vh" }}>
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
                                    ExportPdf(cols, datas, "Vehicles"),
                                },
                                {
                                  label: "Export CSV",
                                  exportFunc: (cols, datas) =>
                                    ExportCsv(cols, datas, "Vehicles"),
                                },
                              ],
                            }}
                            title={"Sub Topics"}
                            data={[
                              {
                                sl: 1,
                                typeImage: "",
                                featureName: "Auto",
                                costPerKm: 7,
                                status: "On",
                                questions:
                                  "The all too familiar auto rides Pocket Friendly",
                                answers:
                                  "The all too familiar auto rides Pocket Friendly",
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
                                title: "Questions",
                                field: "questions",
                                searchable: true,
                              },
                              {
                                title: "Answers",
                                field: "answers",
                                searchable: true,
                              },
                              {
                                title: "Timestamp",
                                // width: "70%",
                                field: "timestamp",
                                editable: "never",
                                render: ({ timestamp }) =>
                                  moment(timestamp).format("lll"),
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
                        </div>
                      </>
                    );
                  }}
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
              </div>
            </>
          );
        }}
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
    </div>
  );
};

export default Faqs;
