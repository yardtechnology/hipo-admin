import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { RC } from "assets";
const DocumentsDrawer = ({ open, setOpenDocumentsDrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenDocumentsDrawer(false)}
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
            Driver Documents
          </Typography>
          <div>
            {" "}
            <Accordion sx={{ marginTop: "3vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: "0vh" }}
              >
                <Typography
                  component={"h6"}
                  variant="h5"
                  sx={{ color: "GrayText" }}
                >
                  {" "}
                  Aadhaar Card Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  5555 7654 5425 5555
                </Typography>

                <Grid container spacing={1} sx={{ marginTop: "2vh" }}>
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
            </Accordion>{" "}
            <Accordion sx={{ marginTop: "3vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: "0vh" }}
              >
                <Typography
                  component={"h6"}
                  variant="h5"
                  sx={{ color: "GrayText" }}
                >
                  {" "}
                  Driving License Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  5555 7654 5425 5555
                </Typography>

                <Grid container spacing={1} sx={{ marginTop: "2vh" }}>
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
            </Accordion>{" "}
            <Accordion sx={{ marginTop: "3vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: "0vh" }}
              >
                <Typography
                  component={"h6"}
                  variant="h5"
                  sx={{ color: "GrayText" }}
                >
                  {" "}
                  Bank Account Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Account Holder Name - Alexa Aryan
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  IFSC code - UTIB0000001
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Account Number - 123456789
                </Typography>
              </AccordionDetails>
            </Accordion>{" "}
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

export default DocumentsDrawer;
