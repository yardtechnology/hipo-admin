import { Done } from "@mui/icons-material";
import { Chip, Container, Drawer, Typography } from "@mui/material";
import { BASE_URL } from "configs";
const AssignTypeDrawer = ({ open, setOpenAssignTypeDrawer, setRealtime }) => {
  console.log(open);
  const RideTypes = ["DAILY_RIDE", "OUTSTATION_RIDE", "RENTAL_RIDE"];

  const addRideType = async (item) => {
    try {
      const updatedRideTypes = open?.types
        ? [...new Set([item, ...open?.types])]
        : [item];
      const response = await fetch(`${BASE_URL}/vehicle-category/${open._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          types: updatedRideTypes,
        }),
      });
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setOpenAssignTypeDrawer({
        ...open,
        types: updatedRideTypes,
      });
      // setOpenAssignTypeDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };
  const removeRideType = async (item) => {
    console.log(item);
    try {
      const updatedRideTypes = open?.Types?.filter(
        (rideType) => rideType !== item
      );
      const removedRideTypes = open?.types?.find(
        (rideType) => rideType === item
      );
      const response = await fetch(
        `${BASE_URL}/vehicle-category/remove/types/${open._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
          body: JSON.stringify({
            types: removedRideTypes,
          }),
        }
      );
      console.log(removedRideTypes);
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      setOpenAssignTypeDrawer({
        ...open,
        types: updatedRideTypes,
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
        onClose={() => setOpenAssignTypeDrawer(false)}
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
            Assign Ride Types
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
            {/* {features === null
              ? []
              : features?.map((feature) => {
                  const hasFeature = open?.features
                    ? open?.features?.includes(feature?._id)
                    : false;
                  console.log(open?.features);
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
                })} */}
            {RideTypes.map((rideType) => {
              const hasRideType = open?.types
                ? open?.types?.includes(rideType)
                : false;
              return (
                <div className="inline-block my-1 mr-1" key={rideType}>
                  <Chip
                    sx={{ mr: 1, mt: 1.5 }}
                    label={rideType}
                    color="primary"
                    variant={hasRideType ? "default" : "outlined"}
                    onClick={() => addRideType(rideType)}
                    deleteIcon={!hasRideType && <Done />}
                    onDelete={() =>
                      !hasRideType
                        ? addRideType(rideType)
                        : removeRideType(rideType)
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

export default AssignTypeDrawer;
