import { BASE_URL } from "configs";
// import { useIsMounted } from "hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
const { createContext, useState } = require("react");

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [vehicleBasicDetails, setVehicleBasicDetails] = useState({
    vehicleName: "",
    vehicleType: "",
    vehicleNumber: "",
    ownerNumber: "",
    ownerName: "",
    seatingCapacity: "",
    costPerKm: "",
    purchaseOn: "",
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
  const login = async (email, password, submitProps) => {
    try {
      const result = await fetch(`${BASE_URL}/auth/login`, {
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
      console.log(res);
      console.log(res?.success?.user?.role);
      submitProps.resetForm();
      if (result.status === 200) {
        if (res?.success?.user?.role !== "admin") {
          Swal.fire({ icon: "error", text: "Please Login as SuperAdmin" });
          submitProps.resetForm();
          return;
        }
        window.localStorage.setItem("SAL", res?.success?.data);
        setUser(res?.success?.user);
        console.log(res?.success?.data);
      } else {
        Swal.fire({ icon: "error", text: res.error.message });
      }
      // document.cookie = res?.data;
    } catch (error) {
      submitProps.resetForm();
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFun = async () => {
      const Sal = window.localStorage.getItem("SAL");
      if (!Sal) return;
      try {
        const result = await fetch(`${BASE_URL}/user/accounts-self`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Beear ${Sal}`,
          },
        });
        const res = await result.json();
        console.log(res);
        result.status === 200
          ? console.log(res?.success?.data)
          : Swal.fire({ icon: "error", text: res.error.message });
        setUser(res?.success?.data);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
