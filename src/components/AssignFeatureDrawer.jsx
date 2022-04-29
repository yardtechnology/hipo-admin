import { Done } from "@mui/icons-material";
import { Avatar, Chip, Container, Drawer, Typography } from "@mui/material";
import { BASE_URL } from "configs";
import { useFeaturesList } from "hooks";
const AssignFeatureDrawer = ({
  open,
  setOpenAssignFeatureDrawer,
  setRealtime,
}) => {
  // console.log(open)
  const { features } = useFeaturesList();
  // const { setRealtime } = useVehicleCategory();
  const addFeature = async (item) => {
    try {
      const updatedFeatures = open?.features
        ? [...new Set([item._id, ...open?.features])]
        : [item?._id];
      const response = await fetch(`${BASE_URL}/vehicle-category/${open._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          features: updatedFeatures,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setOpenAssignFeatureDrawer({
        ...open,
        features: updatedFeatures,
      });
      // setOpenAssignFeatureDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFeature = async (item) => {
    try {
      const updatedFeatures = open?.features?.filter(
        (feature) => feature !== item?._id
      );
      const removedFeatures = open?.features?.find(
        (feature) => feature === item?._id
      );
      const response = await fetch(`${BASE_URL}/features/remove/${open._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          features: removedFeatures,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setOpenAssignFeatureDrawer({
        ...open,
        features: updatedFeatures,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open?._id}
        onClose={() => setOpenAssignFeatureDrawer(false)}
      >
        <Container
          style={{
            width: "40vw",
            marginTop: "12vh",
          }}
        >
          <Typography
            align="left"
            color="Highlight"
            sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
            variant="h5"
          >
            Assign Features{" "}
          </Typography>
          <div>
            {/* <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "" }}> */}
            {/* <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
              </ListItemAvatar> */}
            {/* <ListItemText
                primary={open?.title}
                secondary={open?.answer}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "1.5vw",
                  color: "#1877f2",
                }}
                secondaryTypographyProps={{
                  fontSize: "1.3vw",
                  marginTop: "1vh",
                }}
              /> */}
            {/* </ListItem> */}
            {features === null
              ? []
              : features?.map((feature) => {
                  const hasFeature = open?.features
                    ? open?.features?.includes(feature?._id)
                    : false;
                  return (
                    <div className="inline-block my-1 mr-1" key={feature?.key}>
                      <Chip
                        sx={{ mr: 1, mt: 1.5 }}
                        label={feature?.name}
                        color="primary"
                        variant={hasFeature ? "default" : "outlined"}
                        onClick={() => addFeature(feature)}
                        deleteIcon={!hasFeature && <Done />}
                        avatar={
                          <Avatar
                            src={feature?.icon?.url}
                            sx={{ background: "transparent" }}
                          />
                        }
                        onDelete={() =>
                          !hasFeature
                            ? addFeature(feature)
                            : removeFeature(feature)
                        }
                      />
                    </div>
                  );
                })}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default AssignFeatureDrawer;
