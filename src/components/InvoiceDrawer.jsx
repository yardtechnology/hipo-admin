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
import { MAP } from "assets";
import moment from "moment";
const InvoiceDrawer = ({ open, setOpenInvoiceDrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
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
                marginTop: "2vh",
                paddingLeft: "1.10vw",
                paddingBottom: "0px",
                marginBottom: "0px",
              }}
              variant="body1"
            >
              {open?.invoiceNumber}
              <br />
              {moment(open?.bookingTime)?.format("llll")}
            </Typography>
            <img src={MAP} alt="p" />
          </div>
          <div>
            <Tooltip title="Driver Profile">
              <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Aliva Priyadarshini"
                  secondary="772634243264"
                />
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
                <ListItemText primary={open?.vehicleType} />
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
                <ListItemText primary={formatCurrency(open?.rideAmount)} />
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
              Pick: {open?.pickAddress} {moment(open?.pick)?.format("hh:mm a")}
              <br />
              Drop: {open?.dropAddress} {moment(open?.drop)?.format("hh:mm a")}
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
                  }}
                >
                  Bill Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
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
