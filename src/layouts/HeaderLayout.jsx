import {
  Toolbar,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Badge,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Logout, Notifications, People, Settings } from "@mui/icons-material";
import { CustomAppBar } from "./custom";
import { useState } from "react";
import { MenuItems } from "configs";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "contexts";

const HeaderLayout = ({ handleDrawerOpen, isDrawerOpen }) => {
  const { user, logout, not } = useAppContext();
  console.log(not);
  // console.log(notifications);

  // console.log(user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  return (
    <>
      <CssBaseline />
      <CustomAppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(isDrawerOpen && { display: "none" }),
            }}
            className="menuBtn"
          >
            {/* <MenuOpen className="menuIcon" /> */}
            <div className="menuSec">
              <label htmlFor="check" className="labelCheck">
                <span className="spanMenu"></span>
                <span className="spanMenu"></span>
                <span className="spanMenu"></span>
              </label>
            </div>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="typo"
            sx={{ textTransform: "capitalize" }}
          >
            {MenuItems.find((item) => item.route === location.pathname)?.title}
            {
              MenuItems.find((item) =>
                item?.submenus?.find(
                  (submenus) => submenus.route === location?.pathname
                )
              )?.title
            }
            {MenuItems.find((item) =>
              item?.submenus?.find(
                (submenus) => submenus.route === location?.pathname
              )
            )?.title ? (
              <span> / </span>
            ) : (
              <span> </span>
            )}
            {
              MenuItems.find((item) =>
                item?.submenus?.find(
                  (submenus) => submenus.route === location?.pathname
                )
              )?.submenus?.find(
                (submenus) => submenus.route === location?.pathname
              )?.title
            }
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <>
            <Tooltip title="Notifications">
              <IconButton
                sx={{ mr: 1 }}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <Badge
                  badgeContent={
                    not?.length === 0
                      ? not?.length
                      : not?.filter(
                          (notification) => notification?.seen === false
                        )?.length
                  }
                  color="error"
                >
                  <Notifications className="iconColor" />
                </Badge>
              </IconButton>
            </Tooltip>
          </>
          <>
            <Tooltip title="Riders">
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => {
                  navigate("/riders");
                }}
              >
                <People className="iconColor" />
              </IconButton>
            </Tooltip>
          </>
          <Chip
            onClick={handleClick}
            avatar={<Avatar alt="" src="/logo192.png" />}
            label="Profile"
            variant="outlined"
          />
        </Toolbar>
      </CustomAppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar alt="" src="/logo192.png" />
          <ListItemText
            primary={`Super Admin`}
            // primary={`${user?.firstName} ${user?.lastName}`}

            secondary={user?.email}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/change-password")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderLayout;
