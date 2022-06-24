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
import { Box } from "@mui/system";
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const AssignScheduleDriverDrawer = ({
  open,
  setOpenAssignDriverDrawer,
  setRealtime,
}) => {
  const { isMounted } = useIsMounted();
  const [drivers, setDrivers] = useState([]);
  // const { setRealtime } = useVehicleCategory();
  useEffect(() => {
    const fetchCabs = async () => {
      if (!isMounted.current) return;
      try {
        const response = await fetch(
          `${BASE_URL}/driver-type/${open?.cab?.vehicleCategory?._id}`,
          {
            // method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        // console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setDrivers(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCabs();
  }, [isMounted, open]);

  const addDriver = async (item) => {
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
            driver: updatedDrivers,
          }),
        }
      );
      const res = await response.json();
      setRealtime((prev) => !prev);
      res?.status === 200
        ? Swal.fire("Success", "Driver Assigned", "success")
        : Swal.fire("Error", "Driver not assigned", "error");
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
          {drivers?.length > 0 ? (
            <>
              <Typography
                align="left"
                color="Highlight"
                sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
                variant="h5"
              >
                Assign Driver
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
                {drivers === null
                  ? []
                  : drivers?.map((driver) => {
                      const hasDriver = open?.driver
                        ? open?.driver?._id === driver?._id
                        : false;
                      return (
                        <div className="" key={driver?.key}>
                          <List>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar
                                  alt=""
                                  src={driver?.photoURL || ""}
                                  sx={{ background: "transparent" }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={driver?.displayName}
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
                                    !hasDriver ? addDriver(driver) : ""
                                  }
                                >
                                  {!hasDriver ? <Done /> : ""}
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </div>
                      );
                    })}
              </div>
            </>
          ) : (
            <Box>
              <div
                style={{
                  display: "block",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <IconButton color="primary">
                  <DriveEta />
                </IconButton>
              </div>
              <Typography
                align="center"
                color="Highlight"
                sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
                variant="h5"
              >
                No Drivers Available
              </Typography>
            </Box>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default AssignScheduleDriverDrawer;
