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
  EditRC,
  EditInsurance,
  EditFitness,
  EditRoutePermit,
  EditPUC,
} from "./AddVehicle";
import moment from "moment";
const VehicleDocumentDrawer = ({
  open,
  setOpenVehicleDocumentDrawer,
  setRealtime,
}) => {
  const [value, setValue] = useState(0);
  console.log(open);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenVehicleDocumentDrawer(false)}
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
                  Insurance Info
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
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                          <div>
                            {open?.insurance?.number
                              ? `Number:   ${open?.insurance?.number}`
                              : ""}
                          </div>
                          <div
                            style={{
                              marginBottom: "5vh",
                            }}
                          >
                            {open?.insurance?.expiry
                              ? `Expiry:   ${moment(
                                  open?.insurance?.expiry
                                ).format("DD/MM/YYYY")}`
                              : ""}
                          </div>
                        </Grid>
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
                          <Avatar
                            alt="Remy Sharp"
                            src={open?.insurance?.url}
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
                    <EditInsurance
                      details={open}
                      setRealtime={setRealtime}
                      setOpenVehicleDocumentDrawer={
                        setOpenVehicleDocumentDrawer
                      }
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
                  RC Info
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
                      {" "}
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
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                          <div>
                            {open?.rc?.number
                              ? `Number:   ${open?.rc?.number}`
                              : ""}
                          </div>
                          <div
                            style={{
                              marginBottom: "5vh",
                            }}
                          >
                            {open?.rc?.expiry
                              ? `Expiry:   ${moment(open?.rc?.expiry).format(
                                  "DD/MM/YYYY"
                                )}`
                              : ""}
                          </div>
                        </Grid>
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
                            src={open?.rc?.url}
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
                    <EditRC
                      details={open}
                      setOpenVehicleDocumentDrawer={
                        setOpenVehicleDocumentDrawer
                      }
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
                  Fitness Info
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
                      {" "}
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
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                          <div>
                            {open?.fitness?.number
                              ? `Number:   ${open?.fitness?.number}`
                              : ""}
                          </div>
                          <div
                            style={{
                              marginBottom: "5vh",
                            }}
                          >
                            {open?.fitness?.expiry
                              ? `Expiry:   ${moment(
                                  open?.fitness?.expiry
                                ).format("DD/MM/YYYY")}`
                              : ""}
                          </div>
                        </Grid>
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
                            src={open?.fitness?.url}
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
                    <EditFitness
                      details={open}
                      setOpenVehicleDocumentDrawer={
                        setOpenVehicleDocumentDrawer
                      }
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
                  Route Permit Info
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
                      {" "}
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
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                          <div>
                            {open?.routePermit?.number
                              ? `Number:   ${open?.routePermit?.number}`
                              : ""}
                          </div>
                          <div
                            style={{
                              marginBottom: "5vh",
                            }}
                          >
                            {open?.routePermit?.expiry
                              ? `Expiry:   ${moment(
                                  open?.routePermit?.expiry
                                ).format("DD/MM/YYYY")}`
                              : ""}
                          </div>
                        </Grid>
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
                            src={open?.routePermit?.url}
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
                    <EditRoutePermit
                      details={open}
                      setOpenVehicleDocumentDrawer={
                        setOpenVehicleDocumentDrawer
                      }
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
                  PUC Info
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
                      {" "}
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
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                          <div>
                            {open?.pollution?.number
                              ? `Number:   ${open?.pollution?.number}`
                              : ""}
                          </div>
                          <div
                            style={{
                              marginBottom: "5vh",
                            }}
                          >
                            {open?.pollution?.expiry
                              ? `Expiry:   ${moment(
                                  open?.pollution?.expiry
                                ).format("DD/MM/YYYY")}`
                              : ""}
                          </div>
                        </Grid>
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
                            src={open?.pollution?.url}
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
                    <EditPUC
                      details={open}
                      setOpenVehicleDocumentDrawer={
                        setOpenVehicleDocumentDrawer
                      }
                      setRealtime={setRealtime}
                    />
                  )}
                </CardContent>
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

export default VehicleDocumentDrawer;
