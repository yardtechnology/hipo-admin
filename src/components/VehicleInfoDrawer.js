import { ExpandMore } from "@mui/icons-material";
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
const VehicleInfoDrawer = ({ open, setOpenVehicleInfoDrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

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
            {" "}
            <Accordion sx={{ marginTop: "2vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: "0px", margin: "0vh" }}
              >
                <ListItem sx={{ paddingTop: "0px", marginTop: "0vh" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Car" secondary="Hyundai i20" />
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
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(3.2)",
                          zIndex: "1",
                          paddingLeft: "6vw",
                        },
                      }}
                    />{" "}
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    {" "}
                    <Avatar
                      alt="Remy Sharp"
                      src={RC}
                      variant="square"
                      sx={{
                        width: "auto",
                        height: "auto",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(3.2)",
                          zIndex: "1",
                          paddingRight: "6vw",
                          backdropFilter: "blur(5px)",
                        },
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
