import {
  Avatar,
  CardHeader,
  CardActionArea,
  Card as MUICard,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

// import { useState } from "react";
const Card = ({
  icon,
  title,
  subtitle,
  onClick,
  iconAction,
  menuName,
  ICON,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = () => {
    navigate(iconAction);
    setAnchorEl(null);
  };
  return (
    <>
      <MUICard className="dCard">
        <CardActionArea onClick={onClick}>
          <CardHeader
            avatar={<Avatar sx={{ backgroundColor: "snow" }}>{icon}</Avatar>}
            title={title}
            subheader={subtitle}
            titleTypographyProps={{ variant: "body1" }}
            subheaderTypographyProps={{ variant: "body2", color: "snow" }}
            sx={{ color: "snow" }}
            action={
              <>
                <IconButton
                  aria-label="settings"
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {/* <MoreVert sx={{ color: "snow" }} /> */}
                  {ICON}
                </IconButton>{" "}
                <Menu
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  className="menu"
                >
                  <MenuItem onClick={handleMenu} sx={{ p: 0.5 }}>
                    {menuName}
                  </MenuItem>
                </Menu>
              </>
            }
          />
        </CardActionArea>
      </MUICard>
    </>
  );
};

export default Card;
