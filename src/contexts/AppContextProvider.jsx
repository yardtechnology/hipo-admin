import { BASE_URL } from "configs";
// import { useIsMounted } from "hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
const { createContext, useState } = require("react");

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});
  const ID = window.localStorage.getItem("ID");
  console.log("ID", ID);
  const [vehicleBasicDetails, setVehicleBasicDetails] = useState({
    vehicleName: "",
    vehicleType: "",
    vehicleNumber: "",
    ownerNumber: "",
    ownerName: "",
    seatingCapacity: "",
    costPerKm: "",
    purchaseOn: "",
    imgFile: "",
  });
  const [basicDetails, setBasicDetails] = useState({
    displayName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    city: "",
    imgFile: "",
  });
  const [insuranceInfo, setInsuranceInfo] = useState({
    insuranceNumber: "",
    insuranceImage: "",
  });
  const [RCInfo, setRCInfo] = useState({
    RCNumber: "",
    RCImage: "",
  });
  const [aadharCardInfo, setAadharCardInfo] = useState({
    aadharCardNumber: "",
    imgFile: "",
    imgFile1: "",
  });
  const [drivingLicenceInfo, setDrivingLicenceInfo] = useState({
    drivingLicenceNumber: "",
    drivingLicenceimage: "",
  });
  const [bankAccountInfo, setBankAccountInfo] = useState({
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    bankName: "",
  });
  // const { isMounted } = useIsMounted();
  const login = async (phoneNumber, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/send-otp`, {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      console.log(res?.success?.user?.role);
      submitProps.resetForm();
      if (res.status === 200) {
        window.localStorage.setItem("ID", res._id);
        setUserId(window.localStorage.getItem("ID"));
        console.log(userId);
        Swal.fire({ icon: "success", text: res.message });
        // navigate("/vetify-otp");
      } else {
        return Swal.fire({ icon: "error", text: res.message });
      }

      //   if (res?.success?.user?.role !== "admin") {
      //     Swal.fire({ icon: "error", text: "Please Login as SuperAdmin" });
      //     submitProps.resetForm();
      //     return;
      //   }
      //   window.localStorage.setItem("SAL", res?.success?.data);
      //   setUser(res?.success?.user);
      //   console.log(res?.success?.data);
      // } else {
      //   Swal.fire({ icon: "error", text: res.error.message });
      // }
      // document.cookie = res?.data;
    } catch (error) {
      submitProps.resetForm();
      console.log(error);
    }
  };
  const verifyOtp = async (OTP, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/verify-otp?userId=${ID}`, {
        method: "POST",
        body: JSON.stringify({
          OTP: OTP,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      console.log(res?.success?.user?.role);
      submitProps.resetForm();
      if (res.status === 200) {
        // Swal.fire({ icon: "success", text: res.message });
        if (res?.user?.role !== "ADMIN") {
          Swal.fire({ icon: "error", text: "Please Login as SuperAdmin" });
          submitProps.resetForm();
          return;
        }
        window.localStorage.setItem("SAL", res?.token);
        setUser(res?.user);
        console.log(res?.user);
      } else {
        Swal.fire({ icon: "error", text: res.error.message });
      }
      // navigate("/vetify-otp");
    } catch (error) {
      //   if (res?.success?.user?.role !== "admin") {
      //     Swal.fire({ icon: "error", text: "Please Login as SuperAdmin" });
      //     submitProps.resetForm();
      //     return;
      //   }
      //   window.localStorage.setItem("SAL", res?.success?.data);
      //   setUser(res?.success?.user);
      //   console.log(res?.success?.data);
      // } else {
      //   Swal.fire({ icon: "error", text: res.error.message });
      // }
      // document.cookie = res?.data;
      submitProps.resetForm();
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFun = async () => {
      const Sal = window.localStorage.getItem("SAL");
      if (!Sal) return;
      try {
        const result = await fetch(`${BASE_URL}/account`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Sal}`,
          },
        });
        const res = await result.json();
        console.log(res);
        result.status === 200
          ? console.log(res?.userData)
          : Swal.fire({ icon: "error", text: res.message });
        setUser(res?.userData);
        // isMounted.current && setUser();
        // document.cookie = res?.data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchFun();
  }, []);
  const logout = () => {
    try {
      window.localStorage.removeItem("SAL");
      return setUser({});
    } catch (error) {
      new Error(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        user,
        setUser,
        login,
        logout,
        basicDetails,
        setBasicDetails,
        aadharCardInfo,
        setAadharCardInfo,
        bankAccountInfo,
        setBankAccountInfo,
        drivingLicenceInfo,
        setDrivingLicenceInfo,
        insuranceInfo,
        setInsuranceInfo,
        RCInfo,
        setRCInfo,
        vehicleBasicDetails,
        setVehicleBasicDetails,
        verifyOtp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
