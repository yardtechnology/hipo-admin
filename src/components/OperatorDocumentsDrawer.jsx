import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  CardContent,
  Container,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
const OperatorDocumentsDrawer = ({ open, setOpenDocumentsDrawer }) => {
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
            Documents
          </Typography>
          <div>
            {" "}
            <Accordion sx={{ marginTop: "3vh" }}>
              <AccordionSummary
                expandIcon={
                  <>
                    <ExpandMore />
                  </>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: "0vh" }}
              >
                <Typography
                  component={"h6"}
                  variant="h6"
                  sx={{ color: "GrayText" }}
                >
                  {" "}
                  Aadhaar Card Info
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  marginTop: "0vh",
                  paddingTop: "0vh",
                  marginBottom: "2vh",
                }}
              >
                <CardContent>
                  <>
                    <Typography sx={{ fontWeight: "bold", marginTop: "2vh" }}>
                      {open?.aadharCard?.number}
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: "2vh" }}>
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
                        <Avatar
                          alt=""
                          src={open?.aadharCard?.front?.url}
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
                          alt=""
                          src={open?.aadharCard?.back?.url}
                          variant="square"
                          sx={{
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                </CardContent>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: "3vh" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ margin: "0vh" }}
              >
                <Typography
                  component={"h6"}
                  variant="h6"
                  sx={{ color: "GrayText" }}
                >
                  Bank Account Info
                </Typography>
              </AccordionSummary>
              {/* <AccordionDetails sx={{ marginTop: "0vh", paddingTop: "0vh" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Account Holder Name - Alexa Aryan
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Bank Name - State Bank Of India
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  IFSC code - UTIB0000001
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Account Number - 123456789
                </Typography>
              </AccordionDetails> */}
              <AccordionDetails
                sx={{
                  marginTop: "0vh",
                  paddingTop: "0vh",
                  marginBottom: "2vh",
                }}
              >
                <CardContent>
                  <>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        marginTop: "2vh",
                        marginBottom: "1vh",
                      }}
                    >
                      {`Account Holder Name - ${open?.bankDetails?.accountHolderName}`}
                    </Typography>
                    {open?.bankDetails?.bankName ? (
                      <Typography
                        sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                      >
                        {`Bank Name - ${open?.bankDetails?.bankName}`}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Typography
                      sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                    >
                      {`IFSC code - ${open?.bankDetails?.ifscCode}`}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                    >
                      {`Account Number - ${open?.bankDetails?.accountNumber}`}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                    >
                      {`Account Type - ${open?.bankDetails?.bankType}`}
                    </Typography>
                  </>
                  {/* {value === 1 && <Notification />} */}
                </CardContent>
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

export default OperatorDocumentsDrawer;
