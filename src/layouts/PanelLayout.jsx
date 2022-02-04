import { useState } from "react";
import {
  Box,
  // Typography,
  // Card,
  // CardHeader,
  // Breadcrumbs,
  // Chip,
} from "@mui/material";
// import { Home, NavigateNext } from "@mui/icons-material";
// import { MenuItems } from "configs";
// import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import DrawerLayout from "./DrawerLayout";
import HeaderLayout from "./HeaderLayout";
import { CustomDrawerHeader } from "./custom";
const PanelLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  // const location = useLocation();
  // const currentPageTitle = MenuItems.find(
  //   (item) => item.route === location.pathname
  // )?.title;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <HeaderLayout
          handleDrawerOpen={handleDrawerOpen}
          isDrawerOpen={isDrawerOpen}
        />
        <DrawerLayout
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            minHeight: "100vh",
          }}
        >
          <CustomDrawerHeader />
          {/* {currentPageTitle !== "Dashboard" && (
            <Card>
              <CardHeader
                title={currentPageTitle}
                action={
                  <>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                      <Chip
                        icon={<Home />}
                        label="Home"
                        component={Link}
                        to="/"
                        onClick={() => {}}
                      />
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                        color="text.primary"
                      >
                        {currentPageTitle}
                      </Typography>
                    </Breadcrumbs>
                  </>
                }
              />
            </Card>
          )} */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default PanelLayout;
