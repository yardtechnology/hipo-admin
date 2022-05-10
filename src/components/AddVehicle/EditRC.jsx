import { CardActions, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { UPLOADRC } from "assets";
import { BASE_URL } from "configs";

const EditRC = ({ details, setRealtime, setOpenVehicleDocumentDrawer }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const handleEditRC = async () => {
    setLoading(true);
    var formData = new FormData();
    formData.append("rc", value?.target?.files[0]);
    try {
      //   setAadharCardInfo({ ...values, imgFile: value, imgFile1: value1 });
      const response = await fetch(
        `${BASE_URL}/update-vehicle?vehicleId=${details?._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
          body: formData,
        }
      );
      const res = await response.json();
      console.log(res);
      res?.status === 200
        ? Swal.fire("Success", "RC updated", "success")
        : Swal.fire("Error", "Something Went Wrong", "error");
    } catch (error) {
      console.log(error.message);
    } finally {
      setRealtime((prev) => !prev);
      setOpenVehicleDocumentDrawer(false);
      setLoading(false);
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: "2vh 1.2vw 0vh 1.2vw ",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            height={"100%"}
            value={value || details?.rc?.url || UPLOADRC}
            onChange={setValue}
          />
        </Grid>
      </Grid>

      <CardActions style={{ justifyContent: "flex-end" }}>
        <LoadingButton
          onClick={handleEditRC}
          className=" btn-background"
          variant="contained"
          type="submit"
          disabled={!value || loading}
          loading={loading}
          loadingPosition="start"
          startIcon={<Done />}
        >
          Save
        </LoadingButton>
      </CardActions>
    </>
  );
};

export default EditRC;
