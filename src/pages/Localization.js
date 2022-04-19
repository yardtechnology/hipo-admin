import MaterialTable from "@material-table/core";
// import { Switch } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
import { useCities } from "hooks";
import { getArrFromObj } from "@ashirbad/js-core";
const Localization = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const { cities, setRealtime } = useCities();
  console.log(cities);
  return (
    <>
      <MaterialTable
        options={{
          whiteSpace: "nowrap",
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Vehicles"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Vehicles"),
            },
          ],
        }}
        title={"Localization"}
        // data={[
        //   {
        //     sl: 1,
        //     city: "Bhubaneswar",
        //     country: "India",
        //     range: 25,
        //     zipCode: 751030,
        //     status: "On",
        //   },
        // ]}
        data={
          cities === null
            ? []
            : cities?.map((item, index) => ({
                ...item,
                sl: index + 1,
                currentTimestamp: moment(item?.createdAt).format("DD-MM-YYYY"),
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
            title: "City",
            field: "name",

            searchable: true,
          },
          {
            title: "Latitude",
            field: "latitude",
            searchable: true,
          },
          {
            title: "Longitude",
            field: "longitude",
            searchable: true,
          },
          // {
          //   title: "Country",
          //   field: "country",
          //   searchable: true,
          // },
          // {
          //   title: "Zip Code",
          //   field: "zipCode",
          //   type: "numeric",
          //   searchable: true,
          // },
          {
            title: "Range",
            field: "range",
            type: "numeric",
            render: ({ range }) => `${range} Km`,
            searchable: true,
            // type: "numeric",
          },
          {
            title: "Status",
            field: "isOperational",
            searchable: true,
            lookup: {
              true: "Active",
              false: "Inactive",
            },
            // render: (row) => (
            //   <>
            //     <Switch
            //     // size="small"
            //     // variant="outlined"
            //     // color="secondary"
            //     // label={row?.status}
            //     />
            //   </>
            // ),
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
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
        actions={[
          // {
          //   tooltip: "Send notification to all selected users",
          //   icon: "send",
          //   onClick: (evt, data) => setSelectedUsers(data),
          // },
          {
            tooltip: "Turn On for Selected Cities",
            icon: "toggle_on",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
          {
            tooltip: "Turn Off for Selected Cities",
            icon: "toggle_off",
            // onClick: (evt, data) => setSelectedUsers(data),
          },
        ]}
        detailPanel={({ rowData }) => {
          console.log(rowData);
          // const ID = rowData?.id;
          const Topics = getArrFromObj(rowData?.topics);
          console.log("topics", Topics);
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
                          ExportPdf(cols, datas, "Topics"),
                      },
                      {
                        label: "Export CSV",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "Topics"),
                      },
                    ],
                  }}
                  title={`Cabs of ${rowData?.name}`}
                  data={Topics}
                  columns={[
                    {
                      title: "#",
                      field: "sl",
                      editable: "never",
                      width: "10%",
                    },

                    {
                      title: "Topics",
                      field: "title",
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
                          }),
                        });
                        const res = await response.json();
                        console.log(res);
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
                        console.log(topicRes);
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
                            }),
                          }
                        );
                        const topicRes = await topicResponse.json();
                        console.log(topicRes);
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
          onRowAdd: async (data) => {
            try {
              const response = await fetch(`${BASE_URL}/city`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  name: data?.name,
                  latitude: data?.latitude,
                  longitude: data?.longitude,
                  range: data?.range,
                  isOperational: data?.isOperational,
                }),
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
            try {
              const response = await fetch(`${BASE_URL}/city/${oldData?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
                body: JSON.stringify({
                  name: newData?.name,
                  latitude: newData?.latitude,
                  longitude: newData?.longitude,
                  range: newData?.range,
                  isOperational: newData?.isOperational,
                }),
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
          onRowDelete: async (oldData) => {
            try {
              const response = await fetch(`${BASE_URL}/city/${oldData?._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                },
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

export default Localization;
