import { Fragment, useState } from "react";
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
  Divider,
  Collapse,
} from "@mui/material";
import {
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { MenuItems } from "configs";
import { useAppContext } from "contexts";
import { useLocation, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { CustomDrawer, CustomDrawerHeader } from "./custom";
import Scrollbars from "react-custom-scrollbars";
import { LOGO } from "assets";

const DrawerLayout = ({ isDrawerOpen, handleDrawerClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAppContext();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
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
                <img src={LOGO} alt="" width="100px" />
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
          <List sx={{ mt: "1px" }}>
            {MenuItems.map((item) => (
              <Fragment key={item.key}>
                <Tooltip
                  title={item.title}
                  followCursor
                  arrow
                  placement="top-end"
                >
                  <ListItemButton
                    onClick={() =>
                      item?.submenus
                        ? setSelectedSubMenu((prev) =>
                            prev === item.key ? "" : item.key
                          )
                        : navigate(item.route, {})
                    }
                    className={
                      location.pathname === item.route
                        ? "selectedItem"
                        : "listItem"
                    }
                    selected={
                      item?.submenus
                        ? selectedSubMenu === item?.key
                        : location.pathname === item.route
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
                    )}{" "}
                    <ListItemText
                      primary={item.title}
                      className="listItemText"
                    />
                    {item?.submenus &&
                      (selectedSubMenu === item?.key ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </Tooltip>
                {item?.submenus && (
                  <Collapse
                    in={selectedSubMenu === item?.key}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item?.submenus.map((submenu) => (
                        <Tooltip
                          title={submenu.title}
                          followCursor
                          arrow
                          placement="top-end"
                        >
                          <ListItemButton
                            onClick={() => navigate(submenu.route, {})}
                            sx={{ pl: 4 }}
                            key={submenu?.key}
                            className={
                              location?.pathname === submenu?.route
                                ? "selectedSubMenu"
                                : "listItemSubMenu"
                            }
                          >
                            <ListItemIcon
                              sx={{ minWidth: "40px" }}
                              className="itemIcon"
                            >
                              {submenu?.icon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{ whiteSpace: "pre-wrap" }}
                              className="listItemText"
                              primary={submenu?.title}
                            />
                          </ListItemButton>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                )}
                <Divider />
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
