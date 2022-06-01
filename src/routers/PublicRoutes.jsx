import { ForgotPassword, Login, SetPassword, VerifyOtp } from "pages";
import { Routes, Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/set-password/:email" element={<SetPassword />} />
    </Routes>
  );
};

export default PublicRoutes;
