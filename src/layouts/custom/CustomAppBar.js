import { styled, AppBar } from "@mui/material";
import { drawerWidth } from "./LayoutConfigs";
const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "rgba(255, 255, 255, 0.72)",
  color: "#000",
  backdropFilter: "blur(6px)",
  boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.72)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default CustomAppBar;
