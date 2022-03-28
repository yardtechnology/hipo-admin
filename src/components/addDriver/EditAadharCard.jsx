import { CardActions, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AadharUpload } from "components/core";
import { useState } from "react";
import { BACK, FRONT } from "assets";

const EditAadharCard = ({ handleNext, handleBack }) => {
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();

  const handleAadharCardInfo = async (values, submitProps) => {
    try {
      //   setAadharCardInfo({ ...values, imgFile: value, imgFile1: value1 });
      console.log(values);
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      submitProps.setSubmitting(false);
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: "2vh 1.5vw 0vh 1.5vw ",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: "center" }}>
          <AadharUpload
            width={"100%"}
            value={value || FRONT}
            onChange={setValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AadharUpload
            width={"100%"}
            value={value1 || BACK}
            onChange={setValue1}
          />
        </Grid>
      </Grid>

      <CardActions style={{ justifyContent: "flex-end" }}>
        <LoadingButton
          sx={{ marginRight: "0.5rem !important" }}
          className=" btn-background"
          variant="contained"
          type="submit"
          disabled={!value || !value1}
          // loading={isSubmitting}
          loadingPosition="start"
          startIcon={<Done />}
          onClick={() => handleAadharCardInfo(value, value1)}
        >
          Save
        </LoadingButton>
      </CardActions>
    </>
  );
};

export default EditAadharCard;
