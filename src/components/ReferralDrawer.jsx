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

const ReferralDrawer = ({ open, setOpenReferralDrawer }) => {
  // console.log(open);
  const { isMounted } = useIsMounted();
  const [referral, setReferral] = useState({});
  // console.log(referral);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted.current) return;
      try {
        const response = await fetch(`${BASE_URL}/users/referred/${open._id}`, {
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
        setReferral(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [open, isMounted]);

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
          {referral?.length > 0 ? (
            <>
              <Typography
                align="left"
                color="Highlight"
                sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
                variant="h5"
              >
                Referrals
              </Typography>
            </>
          ) : (
            ""
          )}
          <div>
            {open?._id && referral?.length > 0 ? (
              referral?.map((item, index) => (
                <ListItem
                  key={index}
                  style={{
                    padding: "0.5vw",
                    margin: "0.5vw",
                    borderRadius: "0.5vw",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ backgroundColor: "#1877f2" }}
                      src={item?.photoURL}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item?.displayName}
                    secondary={item?.phoneNumber}
                  />
                </ListItem>
              ))
            ) : (
              <Typography
                align="center"
                // color="Highlight"
                sx={{ fontWeight: "bold", paddingLeft: "1.10vw", mt: "10vh" }}
                variant="h5"
              >
                No Referrals Yet
              </Typography>
            )}
          </div>
          {/* <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
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
