import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { getIn } from "formik";
export const getImageSize = (url) => {
  const img = document.createElement("img");
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () =>
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    img.onerror = reject;
  });
};
export const isValidOnlyAlphabates = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};
export const getStyles = (errors, fieldName) => {
  if (getIn(errors, fieldName)) {
    return {
      border: "1px solid red",
    };
  }
};
export const MUIOptions = (fileName = "exported-file", options = {}) => ({
  exportAllData: true,
  exportMenu: [
    {
      label: "Export PDF",
      exportFunc: (cols, datas) => ExportPdf(cols, datas, fileName),
    },
    {
      label: "Export CSV",
      exportFunc: (cols, datas) => ExportCsv(cols, datas, fileName),
    },
  ],
  pageSize: "10",
  actionsColumnIndex: -1,
  search: true,
  selection: true,
  sorting: true,
  ...options,
});
