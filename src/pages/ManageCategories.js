import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useCategories } from "hooks";
import moment from "moment";
import { Avatar } from "@mui/material";
import Swal from "sweetalert2";
import { BASE_URL } from "configs";
import { PhotoUpload } from "components/core";

const ManageCategories = () => {
  const { categories, setRealtime } = useCategories();
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/genres/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          ids: data,
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
  const handleCategoriesDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/category/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          id: data,
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
  console.log(categories);
  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          selection: true,
          addRowPosition: "first",
          detailPanelColumnAlignment: "right",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Categories"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Categories"),
            },
          ],
        }}
        title={"Categories"}
        data={
          categories === null
            ? []
            : categories?.map((event, i) => ({
                ...event,
                sl: i + 1,
                currentTimestamp: moment(event?.timestamp).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
          {
            title: "Category Name",
            field: "title",
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
        editable={{
          onRowAdd: async (data) => {
            const formdata = new FormData();
            formdata.append("categoryName", data?.title);
            formdata.append("icon", data?.iconUrl?.target?.files[0]);
            formdata.append("image", data?.imageUrl?.target?.files[0]);

            try {
              const result = await fetch(`${BASE_URL}/category/create`, {
                method: "POST",
                body: formdata,
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
          onRowUpdate: async (newData, oldData) => {
            const formdata = new FormData();
            oldData?.iconUrl !== newData.iconUrl &&
              formdata.append("icon", newData?.iconUrl?.target?.files[0]);
            oldData?.imageUrl !== newData.imageUrl &&
              formdata.append("image", newData?.imageUrl?.target?.files[0]);
            formdata.append("categoryId", oldData?._id);
            formdata.append("categoryName", newData?.title);
            try {
              const result = await fetch(`${BASE_URL}/category/update`, {
                method: "PUT",
                body: formdata,
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
            console.log(oldData._id);
            try {
              const result = await fetch(`${BASE_URL}/category/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  id: [oldData?._id],
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({
                    icon: "success",
                    text: res.success.message,
                  })
                : Swal.fire({
                    icon: "error",
                    text: res.error.message,
                  });
            } catch (error) {
              Swal.fire({
                icon: "error",
                text: error.message,
              });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        actions={[
          {
            tooltip: "Delete all selected Categories",
            icon: "delete",
            onClick: (evt, data) =>
              handleCategoriesDelete(data.map((data) => data?._id)),
          },
        ]}
        detailPanel={[
          {
            tooltip: "View SubCategories",
            icon: "category",
            openIcon: "visibility",
            render: ({ rowData }) => (
              <>
                <MaterialTable
                  data={(rowData?.subcategories).map((subCategory, i) => ({
                    ...subCategory,
                    sl: i + 1,
                    currentTimestamp: moment(subCategory?.timestamp).format(
                      "lll"
                    ),
                  }))}
                  title={`Sub Category of  ${rowData.title}`}
                  columns={[
                    {
                      title: "#",
                      field: "sl",
                      editable: "never",
                    },
                    {
                      title: "Sub Category ",
                      field: "title",
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
                      title: "Timestamp",
                      searchable: true,
                      field: "timestamp",
                      render: ({ timestamp }) =>
                        moment(timestamp).format("lll"),
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
                  options={{
                    exportAllData: true,
                    detailPanelColumnAlignment: "right",
                    selection: true,
                    exportMenu: [
                      {
                        label: "Export Users Data In CSV",
                        exportFunc: (cols, data) =>
                          ExportCsv(cols, data, "SubCategories"),
                      },
                      {
                        label: "Export Users Data In PDF",
                        exportFunc: (cols, data) =>
                          ExportPdf(cols, data, "SubCategories"),
                      },
                    ],
                    // selection: true,
                    actionsColumnIndex: -1,
                  }}
                  detailPanel={[
                    {
                      tooltip: "View Genres",
                      icon: "theater_comedy",
                      openIcon: "visibility",
                      render: ({ rowData }) => (
                        <>
                          <MaterialTable
                            data={(rowData?.genres).map((genres, i) => ({
                              ...genres,
                              sl: i + 1,
                              currentTimestamp: moment(
                                genres?.timestamp
                              ).format("lll"),
                            }))}
                            title={`Genres of  ${rowData.title}`}
                            columns={[
                              {
                                title: "#",
                                field: "sl",
                                editable: "never",
                              },
                              {
                                title: "Genres",
                                field: "title",
                                searchable: true,
                              },
                              {
                                export: false,
                                title: "Icon",
                                field: "iconUrl",
                                render: ({ iconUrl }) => (
                                  <Avatar
                                    sx={{ height: 60, width: 60 }}
                                    src={iconUrl}
                                  />
                                ),
                                editComponent: ({ value, onChange }) => {
                                  return (
                                    <>
                                      <PhotoUpload
                                        value={value}
                                        onChange={onChange}
                                      />
                                    </>
                                  );
                                },
                              },

                              {
                                title: "Timestamp",
                                searchable: true,
                                field: "timestamp",
                                render: ({ timestamp }) =>
                                  moment(timestamp).format("lll"),
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
                            options={{
                              selection: true,
                              exportAllData: true,
                              detailPanelColumnAlignment: "right",
                              exportMenu: [
                                {
                                  label: "Export Users Data In CSV",
                                  exportFunc: (cols, data) =>
                                    ExportCsv(cols, data, "Genres"),
                                },
                                {
                                  label: "Export Users Data In PDF",
                                  exportFunc: (cols, data) =>
                                    ExportPdf(cols, data, "Genres"),
                                },
                              ],
                              // selection: true,
                              actionsColumnIndex: -1,
                            }}
                            actions={[
                              {
                                tooltip: "Delete all selected Genres",
                                icon: "delete",
                                onClick: (evt, data) =>
                                  handleBulkDelete(
                                    data.map((data) => data?._id)
                                  ),
                              },
                            ]}
                            editable={{
                              onRowAdd: async (data) => {
                                const SubCategoryID = rowData?._id;
                                const formdata = new FormData();
                                formdata.append("genresName", data?.title);
                                formdata.append(
                                  "icon",
                                  data?.iconUrl?.target?.files[0]
                                );
                                formdata.append("subCategoryId", SubCategoryID);
                                try {
                                  const result = await fetch(
                                    `${BASE_URL}/genres/create`,
                                    {
                                      method: "POST",
                                      body: formdata,
                                    }
                                  );
                                  const res = await result.json();
                                  console.log(res);
                                  result.status === 200
                                    ? Swal.fire({
                                        icon: "success",
                                        text: res.success.message,
                                      })
                                    : Swal.fire({
                                        icon: "error",
                                        text: res.error.message,
                                      });
                                } catch (error) {
                                  Swal.fire({
                                    icon: "error",
                                    text: error.message,
                                  });
                                  console.log(error);
                                } finally {
                                  setRealtime((prev) => !prev);
                                }
                              },
                              onRowUpdate: async (newData, oldData) => {
                                const formdata = new FormData();
                                oldData?.iconUrl !== newData.iconUrl &&
                                  formdata.append(
                                    "icon",
                                    newData?.iconUrl?.target?.files[0]
                                  );
                                formdata.append("genresId", oldData?._id);
                                formdata.append(
                                  "genresNewName",
                                  newData?.title
                                );
                                try {
                                  const result = await fetch(
                                    `${BASE_URL}/genres/update`,
                                    {
                                      method: "PUT",
                                      body: formdata,
                                    }
                                  );
                                  const res = await result.json();
                                  console.log(res);
                                  result.status === 200
                                    ? Swal.fire({
                                        icon: "success",
                                        text: res?.success?.message,
                                      })
                                    : Swal.fire({
                                        icon: "error",
                                        text: res.error.message,
                                      });
                                } catch (error) {
                                  console.log(error);
                                  Swal.fire({
                                    icon: "error",
                                    text: error.message,
                                  });
                                } finally {
                                  setRealtime((prev) => !prev);
                                }
                                console.log(newData);
                              },
                              onRowDelete: async (oldData) => {
                                console.log(oldData._id);
                                try {
                                  const result = await fetch(
                                    `${BASE_URL}/genres/delete`,
                                    {
                                      method: "DELETE",
                                      body: JSON.stringify({
                                        ids: [oldData?._id],
                                      }),
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                  const res = await result.json();
                                  console.log(res);
                                  result.status === 200
                                    ? Swal.fire({
                                        icon: "success",
                                        text: res.success.message,
                                      })
                                    : Swal.fire({
                                        icon: "error",
                                        text: res.error.message,
                                      });
                                } catch (error) {
                                  Swal.fire({
                                    icon: "error",
                                    text: error.message,
                                  });
                                  console.log(error);
                                } finally {
                                  setRealtime((prev) => !prev);
                                }
                              },
                            }}
                            style={{
                              boxShadow: "#6a1b9a3d 0px 8px 16px 0px",
                              borderRadius: "8px",
                            }}
                            isLoading={!rowData?.genres}
                          />
                        </>
                      ),
                    },

                    // {
                    //   icon: "local_hotel",
                    //   openIcon: "local_hotel",
                    //   tooltip: "Property Rooms",
                    //   render: (rowData) => <Rooms roomCategory={rowData} />,
                    // },
                  ]}
                  editable={{
                    onRowAdd: async (data) => {
                      const CategoryID = rowData?._id;
                      const formdata = new FormData();
                      formdata.append("subCategory", data?.title);
                      formdata.append("icon", data?.iconUrl?.target?.files[0]);
                      formdata.append("categoryId", CategoryID);
                      try {
                        const result = await fetch(
                          `${BASE_URL}/sub-category/create`,
                          {
                            method: "POST",
                            body: formdata,
                          }
                        );
                        const res = await result.json();
                        console.log(res);
                        result.status === 200
                          ? Swal.fire({
                              icon: "success",
                              text: res.success.message,
                            })
                          : Swal.fire({
                              icon: "error",
                              text: res.error.message,
                            });
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
                        formdata.append(
                          "icon",
                          newData?.iconUrl?.target?.files[0]
                        );
                      formdata.append("subcategoryId", oldData?._id);
                      formdata.append("newSubCategoryName", newData?.title);
                      try {
                        const result = await fetch(
                          `${BASE_URL}/sub-category/update`,
                          {
                            method: "PUT",
                            body: formdata,
                          }
                        );
                        const res = await result.json();
                        console.log(res);
                        result.status === 200
                          ? Swal.fire({
                              icon: "success",
                              text: res.success.message,
                            })
                          : Swal.fire({
                              icon: "error",
                              text: res.error.message,
                            });
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
                        const result = await fetch(
                          `${BASE_URL}/sub-category/delete`,
                          {
                            method: "DELETE",
                            body: JSON.stringify({
                              id: [oldData?._id],
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const res = await result.json();
                        console.log(res);
                        result.status === 200
                          ? Swal.fire({
                              icon: "success",
                              text: res.success.message,
                            })
                          : Swal.fire({
                              icon: "error",
                              text: res.error.message,
                            });
                      } catch (error) {
                        Swal.fire({
                          icon: "error",
                          text: error.message,
                        });
                        console.log(error);
                      } finally {
                        setRealtime((prev) => !prev);
                      }
                    },
                  }}
                  style={{
                    boxShadow: "#6a1b9a3d 0px 8px 16px 0px",
                    borderRadius: "8px",
                  }}
                  isLoading={!rowData?.subcategories}
                />
              </>
            ),
          },

          // {
          //   icon: "local_hotel",
          //   openIcon: "local_hotel",
          //   tooltip: "Property Rooms",
          //   render: (rowData) => <Rooms roomCategory={rowData} />,
          // },
        ]}
        isLoading={categories === null}
      />
    </div>
  );
};

export default ManageCategories;
