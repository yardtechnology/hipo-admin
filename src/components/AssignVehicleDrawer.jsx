import { Done, DriveEta } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Container,
  Drawer,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  List,
} from "@mui/material";
import { BASE_URL } from "configs";
import { useVehicles } from "hooks";
import Swal from "sweetalert2";
const AssignVehicleDrawer = ({
  open,
  setOpenAssignDriverDrawer,
  setRealtime,
}) => {
  const { vehicles } = useVehicles();
  // const { setRealtime } = useVehicleCategory();
  const addVehicle = async (item) => {
    try {
      const updatedDrivers = open?.drivers
        ? [...new Set([item._id, ...open?.drivers])]
        : [item?._id];
      const response = await fetch(
        `${BASE_URL}/assign-driver-vehicle/${open?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
          body: JSON.stringify({
            vehicle: updatedDrivers,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Vehicle Assigned", "success")
        : Swal.fire("Error", "Vehicle not assigned", "error");
      setOpenAssignDriverDrawer(false);

      // setOpenAssignDriverDrawer({
      //   ...open,
      //   drivers: updatedDrivers,
      // });
      // setOpenAssignFeatureDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open?._id}
        onClose={() => setOpenAssignDriverDrawer(false)}
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
            Assign Vehicle
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
            {vehicles === null
              ? []
              : vehicles?.map((vehicle) => {
                  const hasVehicle = open?.vehicle
                    ? open?.vehicle?._id === vehicle?._id
                    : false;
                  console.log("hasDriver", hasVehicle);
                  return (
                    <div className="" key={vehicle?.key}>
                      <List>
                        <ListItem
                          sx={{
                            paddingLeft: "1.4vw",
                            marginTop: "1vh",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={vehicle?.icon?.url}
                              sx={{ background: "blue" }}
                            >
                              <DriveEta />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${
                              vehicle?.make?.name ? vehicle?.make?.name : ""
                            } ${
                              vehicle?.model?.name ? vehicle?.model?.name : ""
                            }`}
                            secondary={
                              <>
                                <div>
                                  {vehicle?.model?.vehicleCategory?.name}
                                </div>
                                <div> {vehicle?.vehicleNumber}</div>
                              </>
                            }
                            primaryTypographyProps={{
                              fontWeight: "bold",
                              fontSize: "1.5vw",
                              color: "#1877f2",
                            }}
                            secondaryTypographyProps={{
                              fontSize: "1.3vw",
                              marginTop: "1vh",
                            }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() =>
                                !hasVehicle ? addVehicle(vehicle) : ""
                              }
                            >
                              {!hasVehicle ? <Done /> : ""}
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>

                      {/* <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              alt=""
                              src={vehicle?.photoURL || ""}
                              sx={{ background: "transparent" }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={vehicle?.displayName}
                            secondary={
                              <Typography>
                                {driver?.phoneNumber}
                                <br />
                                {driver?.email}
                              </Typography>
                            }
                            primaryTypographyProps={{
                              fontWeight: "bold",
                              fontSize: "1.5vw",
                              color: "#1877f2",
                            }}
                            secondaryTypographyProps={{
                              fontSize: "1.3vw",
                              marginTop: "1vh",
                            }}
                          />

                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                !hasVehicle ? addDriver(vehicle) : ""
                              }
                            >
                              {!hasVehicle ? <Done /> : ""}
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List> */}
                    </div>
                  );
                })}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default AssignVehicleDrawer;
