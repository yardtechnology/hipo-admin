import { Card, Container } from "@mui/material";
import { LOGO } from "assets";

const withAuthLayout = (Page) => {
  const AuthLayout = () => (
    <div className="auth_page">
      <Container
        maxWidth="sm"
        className="d-flex h-75vh place-content-center place-items-center"
      >
        <Card>
          <div className="" style={{ textAlign: "center", marginTop: "3vh" }}>
            <img src={LOGO} alt="logo" width="150" style={{}} />
          </div>
          <Page />
        </Card>
      </Container>
    </div>
  );
  return AuthLayout;
};

export default withAuthLayout;
