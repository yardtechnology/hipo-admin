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
const InvoiceDrawer = ({ Details, setOpenInvoiceDrawer }) => {
  console.log(Details);

  return (
    <>
      <Drawer
        anchor="right"
        open={Details}
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
              {Details?.rideId}
              <br />
              {moment(Details?.createdAt)?.format("llll")}
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
              // src={`https://maps.googleapis.com/maps/api/staticmap?center=${Details?.pickupLatitude},${Details?.pickupLongitude}&zoom=14&size=330x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${Details?.pickupLatitude},${Details?.pickupLongitude}&markers=color:blue%7Clabel:B%7C${Details?.dropLatitude},${Details?.dropLongitude}&key=${MAP_KEY}`}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${Details?.pickupLatitude},${Details?.pickupLongitude}&zoom=14&size=400x200&markers=size:mid|color:red|${Details?.pickupLatitude},${Details?.pickupLongitude}&markers=size:mid|color:blue|${Details?.dropLatitude},${Details?.dropLongitude}&key=${MAP_KEY}`}
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
                  <Avatar
                    sx={{ backgroundColor: "#1877f2" }}
                    src={Details?.rider?.photoURL}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Details?.rider?.displayName}
                  secondary={Details?.rider?.phoneNumber}
                />
              </ListItem>
            </Tooltip>
            {Details?.driver?.phoneNumber && (
              <>
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
                      <Avatar
                        sx={{ backgroundColor: "#1877f2" }}
                        src={Details?.driver?.photoURL}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={Details?.driver?.displayName}
                      secondary={Details?.driver?.phoneNumber}
                    />
                  </ListItem>
                </Tooltip>
              </>
            )}
            <Divider />
            <Tooltip title="Vehicle Type">
              <ListItem sx={{ paddingLeft: "1.4vw" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}>
                    <TwoWheeler />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Details?.driver?.vehicle?.vehicleType?.name}
                  secondary={`${
                    Details?.driver?.vehicle?.make?.name
                      ? Details?.driver?.vehicle?.make?.name
                      : "--"
                  } ${
                    Details?.driver?.vehicle?.model?.name
                      ? Details?.driver?.vehicle?.model?.name
                      : ""
                  }`}
                />
              </ListItem>
            </Tooltip>
            <Divider />
            {Details?.billing && (
              <Tooltip title="Ride Amount">
                <ListItem sx={{ paddingLeft: "1.4vw" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#1877f2" }}>
                      <MonetizationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={formatCurrency(Details?.billing?.totalFare)}
                    primary={"Total Price"}
                  />
                </ListItem>
              </Tooltip>
            )}
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
              {/* Pick: {Details?.pickAddress}{" "}
              {moment(Details?.pick)?.format("hh:mm a")} */}
              Pick:{" "}
              <span
                style={{
                  color: "black",
                }}
              >
                {" "}
                {Details?.pickupLocation?.address
                  ? Details?.pickupLocation?.address
                  : "--"}
              </span>
              <br />
              {/* Drop: {Details?.dropAddress}{" "}
              {moment(Details?.drop)?.format("hh:mm a")} */}
              Drop:{" "}
              <span
                style={{
                  color: "black",
                }}
              >
                {Details?.dropLocation?.address
                  ? Details?.dropLocation?.address
                  : "--"}{" "}
              </span>
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
                  secondaryAction={formatCurrency(Details?.billing?.baseFare)}
                >
                  <ListItemText primary={"Base Fare"} />
                </ListItem>

                <Divider />

                {/* <ListItem
                  sx={{
                    marginTop: "0vh",
                    marginBottom: "0vh",
                    padding: "0vh 1.11vw",
                  }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.rideAmount)}
                >
                  <ListItemText primary={"Coupon Savings"} />
                </ListItem> */}
                {/* <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.billing?.roundedOff)}
                >
                  <ListItemText primary={"Rounded Off"} />
                </ListItem>
                <Divider /> */}
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(
                    Details?.billing?.baseFare + Details?.billing?.totalTax
                  )}
                >
                  <ListItemText
                    primary={"Total Bill"}
                    secondary={`includes ${formatCurrency(
                      Details?.billing?.totalTax
                    )} Taxes`}
                  />
                </ListItem>
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "0vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.billing?.roundedOff)}
                >
                  <ListItemText primary={"Rounded Off"} />
                </ListItem>
                <Divider />
                <ListItem
                  sx={{ marginTop: "0vh", marginBottom: "1vh" }}
                  // disableGutters
                  secondaryAction={formatCurrency(Details?.billing?.totalFare)}
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
                  secondaryAction={
                    Details?.billing?.totalFare
                      ? formatCurrency(Details?.billing?.totalFare)
                      : "--"
                  }
                >
                  <ListItemText
                    primary={
                      Details?.billing?.paymentMethod
                        ? Details?.billing?.paymentMethod
                        : "--"
                    }
                  />
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
