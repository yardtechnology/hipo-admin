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
