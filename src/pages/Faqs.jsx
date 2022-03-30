import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { AddQADrawer, EditQADrawer, ViewQADrawer } from "components";
// import { BASE_URL } from "configs";
import moment from "moment";
import { useState } from "react";

const Faqs = () => {
  const [openViewQADrawer, setOpenViewQADrawer] = useState(false);
  const [openAddQADrawer, setOpenAddQADrawer] = useState(false);
  const [openEditQADrawer, setOpenEditQADrawer] = useState(false);
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <div style={{ marginTop: "2vh" }}>
      <ViewQADrawer
        open={openViewQADrawer}
        setOpenQADrawer={setOpenViewQADrawer}
      />
      <AddQADrawer
        open={openAddQADrawer}
        setOpenAddQADrawer={setOpenAddQADrawer}
      />
      <EditQADrawer
        open={openEditQADrawer}
        setOpenEditQADrawer={setOpenEditQADrawer}
      />
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
            topics: "Rental",
            status: "On",
            topicTitle: "All about HIPO services",
            userType: "Rider",
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
            title: "User Type",
            field: "userType",
            lookup: {
              Rider: "Rider",
              Driver: "Driver",
              Operator: "Operator",
            },
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
                      topics: "Rental",
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
                            title={`Sub Topics Of ${rowData?.topics} `}
                            data={[
                              {
                                sl: 1,
                                typeImage: "",
                                featureName: "Auto",
                                costPerKm: 7,
                                status: "On",
                                questions: "What is HIPO Rental?",
                                answers:
                                  "Whether you are heading out for multiple client meetings, planning a city trip for relatives, or just stepping out for a shopping trip across the city , HIPO Rental can be your trusted ride partner.  ",
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
                                render: ({ answers }) =>
                                  answers?.length >= 60
                                    ? answers.slice(0, 60) + "......"
                                    : answers,
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
                              {
                                title: "Actions",
                                width: "18%",
                                headerStyle: {
                                  textAlign: "center",
                                },
                                // field: "pick",
                                render: (row) => (
                                  <>
                                    <div className="d-flex">
                                      <Tooltip title="View Questions & Answers">
                                        <Avatar
                                          variant="rounded"
                                          onClick={() =>
                                            setOpenViewQADrawer(row)
                                          }
                                          sx={{
                                            mr: ".4vw",
                                            padding: "0px !important",
                                            backgroundColor: "lawngreen",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <Visibility
                                            sx={{ padding: "0px !important" }}
                                          />
                                        </Avatar>
                                      </Tooltip>
                                      <Tooltip title="Edit Questions & Answers">
                                        <Avatar
                                          variant="rounded"
                                          onClick={() =>
                                            setOpenEditQADrawer(row)
                                          }
                                          sx={{
                                            mr: ".4vw",
                                            padding: "0px !important",
                                            backgroundColor: "gray",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <Edit
                                            sx={{ padding: "0px !important" }}
                                          />
                                        </Avatar>
                                      </Tooltip>
                                      <Tooltip title="Delete Questions & Answers">
                                        <Avatar
                                          variant="rounded"
                                          // onClick={() => setOpenDocumentDrawer(row)}
                                          sx={{
                                            padding: "0px !important",
                                            backgroundColor: "red",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <Delete
                                            sx={{ padding: "0px !important" }}
                                          />
                                        </Avatar>
                                      </Tooltip>
                                    </div>
                                  </>
                                ),
                              },
                            ]}
                            // editable={{
                            //   onRowAdd: async (data) => {},
                            //   // onRowUpdate: async (newData, oldData) => {},
                            //   // onRowDelete: async (oldData) => {},
                            // }}
                            actions={[
                              // {
                              //   tooltip: "Delete all selected Days",
                              //   icon: "delete",
                              //   onClick: (evt, data) =>
                              //     handleBulkDelete(data.map((data) => data?.day)),
                              // },
                              {
                                tooltip: "Add Questions & Answers",
                                icon: "add",
                                isFreeAction: true,
                                onClick: (evt, data) =>
                                  setOpenAddQADrawer(true),
                                // handleBulkDelete(
                                //   data.map((data) => data?.day)
                                // ),
                              },
                            ]}
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
