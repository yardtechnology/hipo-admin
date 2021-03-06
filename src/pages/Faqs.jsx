import { getArrFromObj } from "@ashirbad/js-core";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { AddQADrawer, EditQADrawer, ViewQADrawer } from "components";
import { PhotoUpload } from "components/core";
import { BASE_URL } from "configs";
import { useFaqs } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";

const Faqs = () => {
  const [openViewQADrawer, setOpenViewQADrawer] = useState(false);
  const [openAddQADrawer, setOpenAddQADrawer] = useState(false);
  const [openEditQADrawer, setOpenEditQADrawer] = useState(false);
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { faqs, setRealtime } = useFaqs();
  // console.log(faqs);
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`${BASE_URL}/supports/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await response.json();

      res?.status === 200
        ? Swal.fire({ text: res.message, icon: "success" })
        : Swal.fire({ text: res.message, icon: "error" });
      setRealtime((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ViewQADrawer
        open={openViewQADrawer}
        setRealtime={setRealtime}
        setOpenQADrawer={setOpenViewQADrawer}
      />
      <AddQADrawer
        open={openAddQADrawer}
        setOpenAddQADrawer={setOpenAddQADrawer}
        setRealtime={setRealtime}
      />
      <EditQADrawer
        setRealtime={setRealtime}
        open={openEditQADrawer}
        setOpenEditQADrawer={setOpenEditQADrawer}
      />
      <MaterialTable
        options={{
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
        data={
          faqs === null
            ? []
            : faqs?.map((faq, i) => ({
                ...faq,
                sl: i + 1,
                iconUrl: faq?.icon?.url,
                currentTimestamp: moment(faq?.createdAt).format("LL"),
                setRealtime,
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
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
            field: "title",
            searchable: true,
            validate: (rowData) => {
              if (
                rowData?.title?.length <= 0 ||
                rowData?.title?.length === undefined
              ) {
                return "Required";
              }
            },

            // validate: (rowData) =>
            //   rowData.title > 0 ? true : "Title is required",
            // rowData?.title > 0 ? true : "Topic Title Required",
          },
          {
            title: "Icon",
            field: "iconUrl",
            searchable: true,
            export: false,
            render: ({ icon }) => (
              <Avatar sx={{ width: "12vh", height: "12vh" }} src={icon?.url} />
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
            title: "User Type",
            field: "role",
            lookup: {
              USER: "USER",
              DRIVER: "DRIVER",
              OPERATOR: "OPERATOR",
            },
            searchable: true,
          },

          {
            title: "Timestamp",
            // width: "70%",
            field: "timeStamp",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: true,
            searchable: true,
            // hidden: true,
          },
        ]}
        detailPanel={({ rowData }) => {
          // const ID = rowData?.id;
          const Topics = getArrFromObj(rowData?.topics).sort((a, b) =>
            a.timestamp > b.timestamp ? 1 : -1
          );
          return (
            <>
              <div style={{ marginTop: "2vh" }}>
                <MaterialTable
                  options={{
                    addRowPosition: "first",
                    detailPanelColumnAlignment: "right",
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    exportAllData: true,
                    exportMenu: [
                      {
                        label: "Export PDF",
                        exportFunc: (cols, datas) =>
                          ExportPdf(cols, datas, "Topics"),
                      },
                      {
                        label: "Export CSV",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "Topics"),
                      },
                    ],
                  }}
                  title={`Topics of ${rowData?.title}`}
                  data={Topics?.map((topic, i) => ({
                    ...topic,
                    sl: i + 1,
                    timeStamp: moment(topic?.createdAt).format("LLL"),
                  }))}
                  columns={[
                    {
                      title: "#",
                      field: "sl",
                      editable: "never",
                      width: "2%",
                    },

                    {
                      title: "Topics",
                      field: "title",
                      searchable: true,
                      validate: (rowData) => {
                        if (
                          rowData?.title?.length <= 0 ||
                          rowData?.title?.length === undefined
                        ) {
                          return "Required";
                        }
                      },
                    },
                    {
                      title: "Ride Type",
                      field: "rideStatus",
                      lookup: {
                        ALL_TYPE: "ALL TYPE",
                        COMPLETED: "COMPLETED",
                        CANCELLED: "CANCELLED",
                      },
                      emptyValue: "ALL TYPE",
                    },
                    {
                      title: "Timestamp",
                      // width: "70%",
                      field: "timeStamp",
                      editable: "never",
                      render: ({ createdAt }) =>
                        moment(createdAt).format("lll"),
                      export: true,
                      searchable: true,
                      // hidden: true,
                    },
                  ]}
                  detailPanel={({ rowData }) => {
                    const SUBTOPICS = rowData?.subtopics?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    return (
                      <>
                        <div style={{ marginTop: "2vh" }}>
                          <MaterialTable
                            options={{
                              addRowPosition: "first",
                              detailPanelColumnAlignment: "right",
                              actionsColumnIndex: -1,
                              pageSize: 10,
                              exportAllData: true,
                              exportMenu: [
                                {
                                  label: "Export PDF",
                                  exportFunc: (cols, datas) =>
                                    ExportPdf(cols, datas, "Sub Topics"),
                                },
                                {
                                  label: "Export CSV",
                                  exportFunc: (cols, datas) =>
                                    ExportCsv(cols, datas, "Sub Topics"),
                                },
                              ],
                            }}
                            title={`Sub Topics Of ${rowData?.title} `}
                            data={SUBTOPICS?.map((subtopic, i) => ({
                              ...subtopic,
                              sl: i + 1,
                              answers: subtopic?.answers?.answer,
                              currentTimestamp: moment(
                                SUBTOPICS?.createdAt
                              ).format("LL"),
                            }))}
                            columns={[
                              {
                                title: "#",
                                field: "sl",
                                editable: "never",
                                width: "10%",
                              },

                              {
                                title: "Questions",
                                field: "title",
                                searchable: true,
                              },
                              {
                                title: "Answers",
                                field: "answer",
                                render: ({ answer }) =>
                                  answer?.length >= 60
                                    ? answer.slice(0, 60) + "......"
                                    : answer,
                                searchable: true,
                              },
                              {
                                title: "Timestamp",
                                // width: "70%",
                                field: "timestamp",
                                editable: "never",
                                render: ({ createdAt }) =>
                                  moment(createdAt).format("lll"),
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
                                          onClick={() => handleDelete(row._id)}
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
                                onClick: () => setOpenAddQADrawer(rowData),
                                // handleBulkDelete(
                                //   data.map((data) => data?.day)
                                // ),
                              },
                            ]}
                            isLoading={SUBTOPICS === null}
                          />
                        </div>
                      </>
                    );
                  }}
                  editable={{
                    onRowAdd: async (data) => {
                      try {
                        const response = await fetch(`${BASE_URL}/support`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                              "SAL"
                            )}`,
                          },
                          body: JSON.stringify({
                            title: data.title,
                            role: rowData?.role,
                            type: "TOPIC",
                            rideStatus: data?.rideStatus,
                          }),
                        });
                        const res = await response.json();

                        const topicResponse = await fetch(
                          `${BASE_URL}/support/${rowData?._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                            body: JSON.stringify({
                              topics: res?.data?._id,
                            }),
                          }
                        );
                        const topicRes = await topicResponse.json();
                        // console.log(topicRes);
                        topicRes?.status === 200
                          ? Swal.fire({ text: res.message, icon: "success" })
                          : Swal.fire({ text: res.message, icon: "error" });
                      } catch (err) {
                        Swal.fire({ text: err.message, icon: "error" });
                        console.log(err);
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                    },
                    onRowUpdate: async (newData, oldData) => {
                      try {
                        const topicResponse = await fetch(
                          `${BASE_URL}/support/${oldData?._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                            body: JSON.stringify({
                              title: newData?.title,
                              rideStatus: newData?.rideStatus,
                            }),
                          }
                        );
                        const topicRes = await topicResponse.json();
                        // console.log(topicRes);
                        topicRes?.status === 200
                          ? Swal.fire({
                              text: topicRes.message,
                              icon: "success",
                            })
                          : Swal.fire({
                              text: topicRes.message,
                              icon: "error",
                            });
                      } catch (err) {
                        Swal.fire({ text: err.message, icon: "error" });
                        console.log(err);
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                    },
                    onRowDelete: async (oldData) => {
                      try {
                        const response = await fetch(
                          `${BASE_URL}/supports/${oldData?._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "SAL"
                              )}`,
                            },
                          }
                        );
                        const res = await response.json();
                        //
                        res?.status === 200
                          ? Swal.fire({ text: res.message, icon: "success" })
                          : Swal.fire({ text: res.message, icon: "error" });
                      } catch (err) {
                        Swal.fire({ text: err.message, icon: "error" });
                        console.log(err);
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                    },
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
          onRowAdd: async (data) => {
            const formdata = new FormData();
            formdata.append("title", data.title);
            formdata.append("role", data.role);
            formdata.append("type", "SUPPORT");
            formdata.append("icon", data?.iconUrl?.target?.files[0]);
            try {
              const response = await fetch(`${BASE_URL}/support`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: formdata,
              });
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowUpdate: async (newData, oldData) => {
            const formdata = new FormData();
            formdata.append("title", newData?.title);
            formdata.append("role", newData?.role);
            formdata.append("type", "SUPPORT");
            formdata.append("icon", newData?.iconUrl?.target?.files[0]);
            try {
              const response = await fetch(
                `${BASE_URL}/support/${oldData?._id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                  body: formdata,
                }
              );
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(
                `${BASE_URL}/supports/${oldData?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await response.json();
              res?.status === 200
                ? Swal.fire({ text: res?.message, icon: "success" })
                : Swal.fire({ text: res?.message, icon: "error" });
            } catch (err) {
              Swal.fire({ text: err?.message, icon: "error" });
              console.log(err);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
      />
    </>
  );
};

export default Faqs;
