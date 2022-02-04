import { Fragment } from "react";
import {
  Box,
  List,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Tooltip,
  Button,
  ListItemButton,
} from "@mui/material";
import { ExitToApp, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MenuItems } from "configs";
import { useAppContext } from "contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CustomDrawer, CustomDrawerHeader } from "./custom";
import Scrollbars from "react-custom-scrollbars";
import { LOGO } from "assets";

const DrawerLayout = ({ isDrawerOpen, handleDrawerClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAppContext();
  const handleLogout = async () => {
    try {
      logout();
      navigate("/", {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CustomDrawer variant="permanent" open={isDrawerOpen}>
        <CustomDrawerHeader>
          {isDrawerOpen ? (
            <>
              {" "}
              <div className="layoutLogo">
                <img src={LOGO} alt="" width="170px" />
                {/* <Typography variant="h6" noWrap>
              ADMIN PANEL
            </Typography> */}
              </div>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </>
          ) : (
            ""
          )}
        </CustomDrawerHeader>
        {/* <Divider /> */}
        {/* Render Menu Items */}
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <List sx={{ marginTop: "1px" }}>
            {MenuItems.map((item) => (
              <Fragment key={item.key}>
                <Tooltip
                  title={item.title}
                  followCursor
                  arrow
                  placement="top-end"
                >
                  <ListItemButton
                    component={Link}
                    to={item.route}
                    selected={location.pathname === item.route}
                    className={
                      location.pathname === item.route
                        ? "selectedItem"
                        : "listItem"
                    }
                  >
                    {isDrawerOpen ? (
                      <ListItemIcon
                        sx={{ minWidth: "40px" }}
                        className="itemIcon"
                      >
                        {item.icon}
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon
                        sx={{ paddingLeft: ".5vw" }}
                        className="itemIcon"
                      >
                        {item.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={item.title}
                      className="listItemText"
                    />
                  </ListItemButton>
                </Tooltip>
                {/* <Divider /> */}
              </Fragment>
            ))}
            <Box hidden={isDrawerOpen}>
              <Tooltip
                title={"Click Here To Logout"}
                followCursor
                arrow
                placement="top-end"
              >
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon sx={{ paddingLeft: ".5vw" }}>
                    <ExitToApp className="iconColor" />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </Tooltip>
            </Box>
          </List>
          <Box
            hidden={!isDrawerOpen}
            sx={{ textAlign: "center", marginBottom: "30px" }}
          >
            <Typography variant="body1" sx={{ color: "rgb(19, 15, 18)" }}>
              Hi User,
            </Typography>
            <Typography variant="caption" sx={{ color: "rgb(19, 15, 18)" }}>
              Click here to logout from panel
            </Typography>
            <div className="">
              <Button
                variant="contained"
                onClick={handleLogout}
                startIcon={<ExitToApp color="#fff" />}
                className="mt-1vh logout "
              >
                Logout
              </Button>
            </div>
          </Box>{" "}
        </Scrollbars>
      </CustomDrawer>
    </>
  );
};

export default DrawerLayout;
