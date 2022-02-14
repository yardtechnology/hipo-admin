import {
  Avatar,
  Container,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const ReferralDrawer = ({ open, setOpenReferralDrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenReferralDrawer(false)}
      >
        <Container
          style={{
            width: "30vw",
            marginTop: "12vh",
          }}
        >
          <Typography
            align="left"
            color="Highlight"
            sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
            variant="h5"
          >
            Referrals
          </Typography>
          <div>
            {" "}
            <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Aliva Priyadarshini"
                secondary="772634243264"
              />
            </ListItem>
            <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "0vh" }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Aliva Priyadarshini"
                secondary="772634243264"
              />
            </ListItem>
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

export default ReferralDrawer;
