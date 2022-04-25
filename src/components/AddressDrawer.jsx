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
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import { useEffect, useState } from "react";

const AddressDrawer = ({ open, setOpenAddressDrawer }) => {
  // console.log(open);
  const { isMounted } = useIsMounted();
  const [address, setAddress] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted.current) return;
      try {
        const response = await fetch(`${BASE_URL}/address/${open._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const res = await response.json();
        // console.log(res);
        const sortArr = res?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setAddress(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [open, isMounted]);
  // console.log(address);
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
          {address?.length > 0 ? (
            <Typography
              align="left"
              color="Highlight"
              sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
              variant="h5"
            >
              Rider Address
            </Typography>
          ) : (
            ""
          )}
          <div>
            {address?.length > 0 ? (
              address?.map((address, index) => (
                <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#1877f2" }}>
                      {(address?.title).toUpperCase() === "HOME" ? (
                        <Home />
                      ) : (address?.title).toUpperCase() === "WORK" ? (
                        <HomeRepairService />
                      ) : (
                        <Favorite />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(address?.title).toUpperCase()}
                    secondary={address?.address}
                  />
                </ListItem>
              ))
            ) : (
              <>
                <Typography
                  align="center"
                  // color="Highlight"
                  sx={{ fontWeight: "bold", paddingLeft: "1.10vw", mt: "10vh" }}
                  variant="h5"
                >
                  No Address Found
                </Typography>
              </>
            )}
            {/* <ListItem
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
            </ListItem> */}
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
