import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

const useAppContext = () => {
  const {
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
  } = useContext(AppContext);

  return {
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
  };
};

export default useAppContext;
