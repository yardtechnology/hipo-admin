import { styled } from "@mui/material";
// Create CustomDrawerHeader
const CustomDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  background: "rgba(255, 255, 255, 0.72)",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default CustomDrawerHeader;
