import { BASE_URL } from "configs";
// import { useIsMounted } from "hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useIsMounted } from "hooks";
const { createContext, useState } = require("react");

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { isMounted } = useIsMounted();
  const [not, setNot] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});

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
    imgFile1: "",
  });
  const [basicDetails, setBasicDetails] = useState({
    displayName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    country: "",
    city: "",
    imgFile: "",
    countryCode: "",
  });
  const [insuranceInfo, setInsuranceInfo] = useState({
    insuranceNumber: "",
    insuranceImage: "",
  });
  const [RCInfo, setRCInfo] = useState({
    RCNumber: "",
    RCImage: "",
  });
  const [fitnessInfo, setFitnessInfo] = useState({
    fitnessNumber: "",
    fitnessImage: "",
    validTill: "",
  });
  const [permitInfo, setPermitInfo] = useState({
    permitNumber: "",
    permitImage: "",
    validTill: "",
  });
  const [pucInfo, setPucInfo] = useState({
    pucNumber: "",
    pucImage: "",
    validTill: "",
  });
  const [aadharCardInfo, setAadharCardInfo] = useState({
    aadharCardNumber: "",
    imgFile: "",
    imgFile1: "",
  });
  const [drivingLicenceInfo, setDrivingLicenceInfo] = useState({
    drivingLicenseNumber: "",
    drivingLicenceimage: "",
    drivingLicenseExpiryDate: "",
    category: "",
  });
  const [bankAccountInfo, setBankAccountInfo] = useState({
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    bankName: "",
  });
  const login = async (email, password, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/admin-login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await result.json();
      submitProps.resetForm();
      if (res.status === 200) {
        // Swal.fire({ icon: "success", text: res.message });
        if (res?.data?.role !== "ADMIN") {
          Swal.fire({ icon: "error", text: "Please Login as SuperAdmin" });
          submitProps.resetForm();
          return;
        }
        window.localStorage.setItem("SAL", res?.token);
        setUser(res?.data);
      } else {
        Swal.fire({ icon: "error", text: res.message });
      }
    } catch (error) {
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
        result.status !== 200 &&
          Swal.fire({ icon: "error", text: res.message });
        isMounted.current && setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFun();
  }, [isMounted]);
  const logout = () => {
    try {
      window.localStorage.removeItem("SAL");
      return setUser({});
    } catch (error) {
      new Error(error);
    }
  };
  const fetchNotifications = async () => {
    if (!isMounted.current) return;

    try {
      const result = await fetch(`${BASE_URL}/notifications/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await result.json();
      res?.status === 200 ? console.log(res?.data) : console.log(res.message);
      return setNot(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await fetch(`${BASE_URL}/notifications/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const res = await result.json();
        res?.status !== 200 && console.log(res.message);
        return isMounted.current && setNot(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [isMounted]);

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
        fetchNotifications,
        not,
        fitnessInfo,
        setFitnessInfo,
        permitInfo,
        setPermitInfo,
        pucInfo,
        setPucInfo,
        // verifyOtp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
