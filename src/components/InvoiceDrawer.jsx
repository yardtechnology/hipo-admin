import { formatCurrency } from "@ashirbad/js-core";
import { ExpandMore, MonetizationOn, TwoWheeler } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { MAP_KEY } from "configs";
import moment from "moment";
const InvoiceDrawer = ({ rideDetails, setOpenInvoiceDrawer }) => {
  const drawerData = rideDetails;
  console.log(drawerData);
  console.log(rideDetails);

  return (
    <>
      <Drawer
        anchor="right"
        open={rideDetails}
        onClose={() => setOpenInvoiceDrawer(false)}
      >
        <Container
          style={{
            width: "32vw",
            marginTop: "12vh",
          }}
        >
          <Typography
            align="left"
            color="Highlight"
            sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
            variant="h5"
          >
            View Details
          </Typography>

          <div>
            <Typography
              align="left"
              color=""
              sx={{
                fontWeight: "",
                marginTop: "0vh",
                paddingLeft: "1.10vw",
                paddingBottom: "0px",
                marginBottom: "2vh",
              }}
              variant="body1"
            >
              {rideDetails?.rideId}
              <br />
              {moment(rideDetails?.bookingTime)?.format("llll")}
            </Typography>
            <img
              alt=""
              style={{
                width: "100%",
                height: "auto",
                marginTop: "0vh",
                paddingLeft: "1.10vw",
                paddingBottom: "0px",
                marginBottom: "2vh",
              }}
              // src={`https://maps.googleapis.com/maps/api/staticmap?center=${rideDetails?.pickupLatitude},${rideDetails?.pickupLongitude}&zoom=14&size=330x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${rideDetails?.pickupLatitude},${rideDetails?.pickupLongitude}&markers=color:blue%7Clabel:B%7C${rideDetails?.dropLatitude},${rideDetails?.dropLongitude}&key=${MAP_KEY}`}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${rideDetails?.pickupLatitude},${rideDetails?.pickupLongitude}&zoom=14&size=400x200&markers=size:mid|color:red|${rideDetails?.pickupLatitude},${rideDetails?.pickupLongitude}&markers=size:mid|color:blue|${rideDetails?.dropLatitude},${rideDetails.dropLongitude}&key=${MAP_KEY}`}
            />
          </div>
          <div>
            <Typography
              sx={{
                color: "#1877f2",
                paddingLeft: "1.4vw",
                mb: 0,
                marginTop: "1vh",
                fontWeight: "bold",
              }}
            >
              Rider Profile
            </Typography>

            <Tooltip title="Rider Profile">
              <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Aliva Priyadarshini"
                  secondary="772634243264"
                />
              </ListItem>
            </Tooltip>
            <Typography
              sx={{
                color: "#1877f2",
                paddingLeft: "1.4vw",
                mb: 0,
                marginTop: "1vh",
                fontWeight: "bold",
              }}
            >
              Driver Profile
            </Typography>
            <Tooltip title="Driver Profile">
              <ListItem sx={{ paddingLeft: "1.4vw" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Alexa Smith" secondary="772634243264" />
              </ListItem>
            </Tooltip>
            <Divider />
            <Tooltip title="Vehicle Type">
              <ListItem sx={{ paddingLeft: "1.4vw" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}>
                    <TwoWheeler />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={rideDetails?.vehicleType}
                  secondary={"Maruti Suzuki Baleno"}
                />
              </ListItem>
            </Tooltip>
            <Divider />
            <Tooltip title="Ride Amount">
              <ListItem sx={{ paddingLeft: "1.4vw" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}>
                    <MonetizationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={formatCurrency(rideDetails?.rideAmount)}
                  primary={"Total Price"}
                />
              </ListItem>
            </Tooltip>
            <Divider />
            <Typography
              align="left"
              color=""
              sx={{
                fontWeight: "",
                color: "Highlight",
                marginTop: "2vh",
                paddingLeft: "1.10vw",
                paddingBottom: "0px",
                marginBottom: "1.5vh",
              }}
              variant="body1"
            >
              Pick: {rideDetails?.pickAddress}{" "}
              {moment(rideDetails?.pick)?.format("hh:mm a")}
              <br />
              Drop: {rideDetails?.dropAddress}{" "}
              {moment(rideDetails?.drop)?.format("hh:mm a")}
            </Typography>
            {/* </Tooltip> */}
            <Divider />

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  color="Highlight"
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
              <AccordionDetails sx={{ marginTop: "0vh" }}>
                <ListItem
                  sx={{ marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText primary={"Your Trip"} />
                </ListItem>

                <Divider />

                <ListItem
                  sx={{
                    marginTop: "0vh",
                    marginBottom: "0vh",
                    padding: "0vh 1.11vw",
                  }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText primary={"Coupon Savings"} />
                </ListItem>
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText primary={"Rounded Off"} />
                </ListItem>
                <Divider />
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText
                    primary={"Total Bill"}
                    secondary={"includes 13.87 Taxes"}
                  />
                </ListItem>
                <Divider />
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "1vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText
                    primary={"Total Payable"}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                {/* <div className="zigzag"> </div> */}
                <ListItem sx={{ marginTop: "1vh" }}>
                  <ListItemText
                    primary={"Payment"}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "1vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(rideDetails?.rideAmount)}
                >
                  <ListItemText primary={"Cash"} />
                </ListItem>
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

export default InvoiceDrawer;
