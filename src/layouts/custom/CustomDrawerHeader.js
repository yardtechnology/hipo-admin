import { styled } from "@mui/material";
// Create CustomDrawerHeader
const CustomDrawerHeader = styled("div")(({ theme }) => ({
  padding: "2.5vh 2.5vw 0vh 1vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  background: "rgba(255, 255, 255, 0.72)",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default CustomDrawerHeader;
