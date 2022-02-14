import { Favorite, Home, HomeRepairService } from "@mui/icons-material";
import {
  Avatar,
  Container,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const AddressDrawer = ({ open, setOpenAddressDrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpenAddressDrawer(false)}
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
            Rider Address
          </Typography>
          <div>
            {" "}
            <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}>
                  <Home />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Home"
                secondary=" House No - Mmjdsrhet Sri Satya Sai Enclave,Lane-175,Khandagiri
            ,Bhubaneswar"
              />
            </ListItem>
            <ListItem
              sx={{ paddingLeft: "1.4vw", marginTop: "", paddingTop: "0px" }}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}>
                  <HomeRepairService />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Work"
                secondary=" House No - Mmjdsrhet Sri Satya Sai Enclave,Lane-175,Khandagiri
            ,Bhubaneswar"
              />
            </ListItem>
            <ListItem
              sx={{ paddingLeft: "1.4vw", marginTop: "1vh", paddingTop: "0px" }}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}>
                  <Favorite />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="location Name"
                secondary=" House No - Mmjdsrhet Sri Satya Sai Enclave,Lane-175,Khandagiri
            ,Bhubaneswar"
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

export default AddressDrawer;
