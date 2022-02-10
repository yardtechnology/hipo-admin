import { ThemeProvider } from "@mui/material";
import { Loader } from "components/core";
import { useAppContext } from "contexts";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "routers";
import CustomTheme from "theme";
const App = () => {
  const { user } = useAppContext();

  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={CustomTheme}>
        <BrowserRouter>
          {/* {window.localStorage.getItem("SAL") ? (
            user?.email ? (
              <PrivateRoutes />
            ) : (
              <Loader />
            )
          ) : (
            <PublicRoutes />
          )} */}
          {!user?.email ? <PrivateRoutes /> : <PublicRoutes />}
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
