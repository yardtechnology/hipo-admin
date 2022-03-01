import { Cancel, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { SMAP } from "assets";

const StatementInvoice = ({ selectedDetails, handleClose }) => {
  console.log(selectedDetails);

  //   const sendREPLY = () => {};

  return (
    <>
      <Dialog
        open={Boolean(selectedDetails?.sl)}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          style={{ color: "#1877f2", fontWeight: "bold", paddingLeft: "5vw" }}
        >
          Ride Details
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              style={{
                marginTop: "5vh",

                paddingLeft: "5vw",
              }}
            >
              <Typography>
                {" "}
                <b> Ride Id: </b>
                <Typography component={"span"}>
                  {selectedDetails?.rideId || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Rider Name: </b>
                <Typography component={"span"}>
                  {selectedDetails?.riderName || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Driver Name: </b>
                <Typography component={"span"}>
                  {selectedDetails?.driverName || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Ride Start Time: </b>
                <Typography component={"span"}>
                  {selectedDetails?.rideStartTime || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Ride End Time: </b>
                <Typography component={"span"}>
                  {selectedDetails?.rideEndTime || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Pickup: </b>
                <Typography component={"span"}>
                  {selectedDetails?.pick || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Destination: </b>
                <Typography component={"span"}>
                  {selectedDetails?.drop || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Ride Type: </b>
                <Typography component={"span"}>
                  {selectedDetails?.rideType || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Vehicle Type: </b>
                <Typography component={"span"}>
                  {selectedDetails?.vehicleType || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Total Distance: </b>
                <Typography component={"span"}>
                  {selectedDetails?.totalDistance || "Not Provided"}
                </Typography>
              </Typography>
              <Typography sx={{ marginTop: "2vh" }}>
                {" "}
                <b>Ride Status: </b>
                <Typography component={"span"}>
                  {/* {selectedDetails?.totalDistance || "Not Provided"} */}{" "}
                  <Chip
                    label={"Completed"}
                    size="medium"
                    variant="outlined"
                    color="secondary"
                  />
                </Typography>
              </Typography>
              <Tooltip title="Bill Details">
                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary
                    sx={{ boxShadow: "none", padding: "0px" }}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        // paddingLeft: "1.10vw",
                        // marginTop: "1vh",
                        marginBottom: "0vh",
                      }}
                    >
                      Bill Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ marginTop: "0vh", padding: "0px" }}>
                    <ListItem
                      sx={{
                        marginBottom: "0vh",
                        paddingLeft: "0px",
                        paddingBottom: "0px",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.baseFare}
                    >
                      <ListItemText primary={"Base Fare"} />
                    </ListItem>
                    <ListItem
                      sx={{
                        marginBottom: "0vh",
                        paddingLeft: "0px",
                        paddingTop: "0px",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.rideFare}
                    >
                      <ListItemText primary={"Ride Fare"} />
                    </ListItem>
                    <Divider />

                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "0vh",
                        padding: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.discount}
                    >
                      <ListItemText primary={"Discount"} />
                    </ListItem>
                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "0vh",
                        padding: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.roundedOff}
                    >
                      <ListItemText primary={"Rounded Off"} />
                    </ListItem>
                    <Divider />
                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "0vh",
                        paddingLeft: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.totalAmount}
                    >
                      <ListItemText
                        primary={"Total Bill"}
                        secondary={"includes 13.87 Taxes"}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "1vh",
                        paddingLeft: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={selectedDetails?.totalAmount}
                    >
                      <ListItemText
                        primary={"Total Paid"}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    {/* <div className="zigzag"> </div> */}
                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "",
                        paddingLeft: "0vh",
                        paddingTop: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={"Cash"}
                    >
                      <ListItemText
                        primary={"Payment Method"}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        marginTop: "0vh",
                        marginBottom: "",
                        paddingLeft: "0vh",
                        paddingTop: "0vh",
                      }}
                      // disableGutters
                      secondaryAction={
                        <Chip label={"Paid"} size="medium" color="info" />
                      }
                    >
                      <ListItemText
                        primary={"Payment Status"}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
              </Tooltip>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              {" "}
              <div
                style={{
                  marginTop: "5vh",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <img src={SMAP} alt="p" style={{ textAlign: "center " }} />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleClose}
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatementInvoice;
