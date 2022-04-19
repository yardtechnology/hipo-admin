import { Container, Drawer, ListItem, ListItemText } from "@mui/material";

const ViewQADrawer = ({ open, setOpenQADrawer }) => {
  const drawerData = open;
  console.log(drawerData);
  console.log(open);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => setOpenQADrawer(false)}>
        <Container
          style={{
            width: "40vw",
            marginTop: "12vh",
          }}
        >
          {/* <Typography
            align="left"
            color="Highlight"
            sx={{ fontWeight: "bold", paddingLeft: "1.10vw" }}
            variant="h5"
          >
            Questions & Answers
          </Typography> */}
          <div>
            {" "}
            <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "" }}>
              {/* <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
              </ListItemAvatar> */}
              <ListItemText
                primary={open?.title}
                secondary={open?.answer}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "1.5vw",
                  color: "#1877f2",
                }}
                secondaryTypographyProps={{
                  fontSize: "1.3vw",
                  marginTop: "1vh",
                }}
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

export default ViewQADrawer;
