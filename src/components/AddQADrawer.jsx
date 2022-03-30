import { Container, Drawer, ListItem, ListItemText } from "@mui/material";

const AddQADrawer = ({ open, setOpenQADrawer }) => {
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
            <ListItem sx={{ paddingLeft: "1.4vw", marginTop: "1vh" }}>
              {/* <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1877f2" }}></Avatar>
              </ListItemAvatar> */}
              <ListItemText
                primary={open?.questions}
                secondary={open?.answers}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "2vw",
                  color: "#1877f2",
                }}
                secondaryTypographyProps={{
                  fontSize: "1.5vw",
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

export default AddQADrawer;
