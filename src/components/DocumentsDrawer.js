import { Edit, ExpandMore, Visibility } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  CardContent,
  Container,
  Drawer,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  EditAadharCard,
  EditAccountInfo,
  EditDrivingLicense,
} from "./addDriver";
const DocumentsDrawer = ({ open, setOpenDocumentsDrawer, setRealtime }) => {
  const [value, setValue] = useState(0);
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
                {open?.status !== "PENDING" && (
                  <Tabs
                    value={value}
                    onChange={(e, i) => setValue(i)}
                    aria-label="icon position tabs example"
                  >
                    <Tab
                      icon={<Visibility />}
                      iconPosition="start"
                      label="View"
                    />
                    {/* <Tab
                icon={<Notifications />}
                iconPosition="start"
                label="Notification"
              /> */}
                    <Tab icon={<Edit />} iconPosition="start" label="Edit" />
                  </Tabs>
                )}
                <CardContent>
                  {value === 0 && (
                    <>
                      {" "}
                      <Typography sx={{ fontWeight: "bold", marginTop: "2vh" }}>
                        {open?.aadharCard?.number}
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
                  )}
                  {/* {value === 1 && <Notification />} */}
                  {value === 1 && (
                    <EditAadharCard
                      open={open}
                      setOpenDocumentsDrawer={setOpenDocumentsDrawer}
                      setRealtime={setRealtime}
                    />
                  )}
                </CardContent>
              </AccordionDetails>
            </Accordion>
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
                  Driving License Info
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  marginTop: "0vh",
                  paddingTop: "0vh",
                  marginBottom: "2vh",
                }}
              >
                {open?.status !== "PENDING" && (
                  <Tabs
                    value={value}
                    onChange={(e, i) => setValue(i)}
                    aria-label="icon position tabs example"
                  >
                    <Tab
                      icon={<Visibility />}
                      iconPosition="start"
                      label="View"
                    />
                    {/* <Tab
                icon={<Notifications />}
                iconPosition="start"
                label="Notification"
              /> */}
                    <Tab icon={<Edit />} iconPosition="start" label="Edit" />
                  </Tabs>
                )}
                <CardContent>
                  {value === 0 && (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          marginTop: "2vh",
                          p: "1.5vh 5vw 0vh 5vw ",
                        }}
                      >
                        Number:{""}
                        {open?.drivingLicense?.number || "Not Provided"}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          marginBottom: "2vh",
                          p: "1.5vh 5vw 0vh 5vw ",
                        }}
                      >
                        Expiry:{""}
                        {open?.drivingLicense?.expiry
                          ? new Date(
                              `${open?.drivingLicense?.expiry}`
                            ).toLocaleDateString()
                          : "Not Provided"}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          marginTop: "2vh",
                          p: "1.5vh 5vw 0vh 5vw ",
                        }}
                      >
                        License Type:{""}
                        {open?.drivingLicense?.licenseType || "Not Provided"}
                      </Typography>
                      <Grid
                        container
                        spacing={1}
                        sx={{
                          p: "0vh 1.2vw 0vh 1.2vw ",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2vh",
                        }}
                      >
                        <Grid
                          item
                          lg={10}
                          md={12}
                          sm={12}
                          xs={12}
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              transform: "scale(1.5)",
                              transition: "transform 0.5s",
                              zIndex: "1",
                              paddingLeft: "2vw",
                              backdropFilter: "blur(5px)",
                              paddingTop: "1vh",
                            },
                          }}
                        >
                          {" "}
                          <Avatar
                            alt=""
                            src={open?.drivingLicense?.url}
                            variant="square"
                            sx={{
                              width: "auto",
                              height: "auto",
                            }}
                          />{" "}
                        </Grid>
                      </Grid>
                    </>
                  )}
                  {/* {value === 1 && <Notification />} */}
                  {value === 1 && (
                    <EditDrivingLicense
                      open={open}
                      setOpenDocumentsDrawer={setOpenDocumentsDrawer}
                      setRealtime={setRealtime}
                    />
                  )}
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
                  {" "}
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
                {open?.status !== "PENDING" && (
                  <Tabs
                    value={value}
                    onChange={(e, i) => setValue(i)}
                    aria-label="icon position tabs example"
                  >
                    <Tab
                      icon={<Visibility />}
                      iconPosition="start"
                      label="View"
                    />
                    {/* <Tab
                icon={<Notifications />}
                iconPosition="start"
                label="Notification"
              /> */}
                    <Tab icon={<Edit />} iconPosition="start" label="Edit" />
                  </Tabs>
                )}
                <CardContent>
                  {value === 0 && (
                    <>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          marginTop: "4vh",
                          marginBottom: "1vh",
                        }}
                      >
                        {`Account Holder Name - ${
                          open?.bankDetails?.accountHolderName
                            ? open?.bankDetails?.accountHolderName
                            : "Not Provided"
                        }`}
                      </Typography>
                      {open?.bankDetails?.bankName ? (
                        <Typography
                          sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                        >
                          {`Bank Name - ${
                            open?.bankDetails?.bankName
                              ? open?.bankDetails?.bankName
                              : "Not Provided"
                          }  `}
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Typography
                        sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                      >
                        {`IFSC code - ${
                          open?.bankDetails?.ifscCode
                            ? open?.bankDetails?.ifscCode
                            : "Not Provided"
                        }`}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                      >
                        {`Account Number - ${
                          open?.bankDetails?.accountNumber
                            ? open?.bankDetails?.accountNumber
                            : "Not Provided"
                        }`}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", marginBottom: "1vh" }}
                      >
                        {`Account Type - ${
                          open?.bankDetails?.bankType
                            ? open?.bankDetails?.bankType
                            : "Not Provided"
                        }`}
                      </Typography>
                    </>
                  )}
                  {/* {value === 1 && <Notification />} */}
                  {value === 1 && (
                    <EditAccountInfo
                      open={open}
                      setOpenDocumentsDrawer={setOpenDocumentsDrawer}
                      setRealtime={setRealtime}
                    />
                  )}
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

export default DocumentsDrawer;
