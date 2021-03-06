import { DriveEta, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Drawer,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { RC } from "assets";
import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const VehicleInfoDrawer = ({ open, setOpenVehicleInfoDrawer }) => {
  const { isMounted } = useIsMounted();
  const [vehicleInfo, setVehicleInfo] = useState({});
  useEffect(() => {
    if (!isMounted.current) return;
    const fetchVehicleInfo = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/driver/vehicles/${open?._id}`,
          {
            method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setVehicleInfo(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleInfo();
  }, [isMounted, open]);
  console.log(vehicleInfo);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenVehicleInfoDrawer(false)}
      >
        <Container
          style={{
            width: "45vw",
            marginTop: "12vh",
          }}
        >
          <Typography
            align="left"
            color="Highlight"
            sx={{
              fontWeight: "bold",
              paddingLeft: "1.10vw",
              marginBottom: "1vh",
            }}
            variant="h5"
          >
            Vehicles Info
          </Typography>
          <div>
            <Accordion sx={{ marginTop: "2vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: "0px", margin: "0vh" }}
              >
                <ListItem sx={{ paddingTop: "0px", marginTop: "0vh" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#1877f2" }}>
                      <DriveEta />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="MICRO" secondary="Hyundai i20" />
                </ListItem>{" "}
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography>Vehicle No - OD 02 DM 5555</Typography>
                <Typography>Has Insurance - Yes</Typography>
                <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                  {" "}
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.1)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingLeft: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "6vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />{" "}
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.2)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingRight: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "5vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </Grid>
                </Grid>
                <Typography
                  component={"h6"}
                  variant="h6"
                  sx={{ marginTop: "2vh", color: "GrayText" }}
                >
                  RC Info
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {" "}
                  OD-STRDASEEFHH124444ASWFVGG
                </Typography>

                <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                  {" "}
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.1)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingLeft: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "6vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />{" "}
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.2)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingRight: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "5vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: "2vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: "0px", margin: "0vh" }}
              >
                <ListItem sx={{ paddingTop: "0px", marginTop: "0vh" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#1877f2" }}>
                      <DriveEta />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="SUV" secondary="Hyundai i20" />
                </ListItem>{" "}
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography>Vehicle No - OD 02 DM 5555</Typography>
                <Typography>Has Insurance - Yes</Typography>
                <Typography
                  component={"h6"}
                  variant="h5"
                  sx={{ marginTop: "2vh", color: "GrayText" }}
                >
                  RC Info
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {" "}
                  OD-STRDASEEFHH124444ASWFVGG
                </Typography>

                <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                  {" "}
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.1)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingLeft: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "6vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />{" "}
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(3.2)",
                        transition: "transform 0.5s",
                        zIndex: "1",
                        paddingRight: "6vw",
                        backdropFilter: "blur(5px)",
                        paddingTop: "5vh",
                      },
                    }}
                  >
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* <Typography
              align=" center"
              color="slategray"
              variant="h6"
              sx={{ marginTop: "2vh" }}
            >
              House No - Mmjdsrhet Sri Satya Sai Enclave,Lane-175, Khandagiri
              ,Bhubaneswar
            </Typography> */}
        </Container>
      </Drawer>
    </>
  );
};

export default VehicleInfoDrawer;
