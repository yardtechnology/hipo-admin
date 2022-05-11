import { lazy } from "react";

export const Login = lazy(() => import("./Login"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const ManageUsers = lazy(() => import("./ManageUsers"));
export const ManageActivityList = lazy(() => import("./ManageActivityList"));
export const Categories = lazy(() => import("./Categories"));
export const Contacts = lazy(() => import("./Contacts"));
export const ManageEvents = lazy(() => import("./ManageEvents"));
export const ManageServices = lazy(() => import("./ManageServices"));
export const ManageFeatures = lazy(() => import("./ManageFeatures"));
export const ManageCrowd = lazy(() => import("./ManageCrowd"));
export const ManageGenre = lazy(() => import("./ManageGenre"));
export const ManageDays = lazy(() => import("./ManageDays"));
export const AppUpdate = lazy(() => import("./AppUpdate"));
export const DriverRequests = lazy(() => import("./DriverRequests"));
export const DriverStatements = lazy(() => import("./DriverStatements"));
export const AddNewDriver = lazy(() => import("./AddNewDriver"));
export const RidersRating = lazy(() => import("./RidersRating"));
export const DriversRating = lazy(() => import("./DriversRating"));
export const Bookings = lazy(() => import("./Bookings"));
export const ArtistBookingList = lazy(() => import("./ArtistBookingList"));
export const ManageLanguage = lazy(() => import("./ManageLanguage"));
export const ManageRequests = lazy(() => import("./ManageRequests"));
export const Supports = lazy(() => import("./Supports"));
export const Operators = lazy(() => import("./Operators"));
export const OperatorRequest = lazy(() => import("./OperatorRequest"));
export const OperatorRequestedDriver = lazy(() =>
  import("./OperatorDriverRequest")
);
export const ManageReviews = lazy(() => import("./ManageReviews"));
export const ManagePromoCodes = lazy(() => import("./ManagePromoCodes"));
export const AllDrivers = lazy(() => import("./AllDrivers"));
export const DriverPayment = lazy(() => import("./DriverPayment"));
export const Localization = lazy(() => import("./Localization"));
export const Vehicles = lazy(() => import("./Vehicles"));
export const AddVehicle = lazy(() => import("./AddNewVehicle"));

export const DriverEarningReports = lazy(() =>
  import("./DriverEarningReports")
);
export const OperatorEarningReports = lazy(() =>
  import("./OperatorEarningReports")
);
export const ViewDocuments = lazy(() => import("./ViewDocuments"));
export const Pricing = lazy(() => import("./Pricing"));
export const Rides = lazy(() => import("./Rides"));
export const ActiveRides = lazy(() => import("./ActiveRides"));
export const CompletedRides = lazy(() => import("./CompletedRides"));
export const ScheduledRides = lazy(() => import("./ScheduledRides"));
export const RentalRides = lazy(() => import("./RentalRides"));
export const CancelledRides = lazy(() => import("./CancelledRides"));
export const OutstationRides = lazy(() => import("./OutstationRides"));
export const RiderHistory = lazy(() => import("./RiderHistory"));
export const DriverHistory = lazy(() => import("./DriverHistory"));
export const Coupons = lazy(() => import("./Coupons"));
export const Incentives = lazy(() => import("./Incentives"));
export const OperatorShare = lazy(() => import("./OperatorShare"));
export const DriverShare = lazy(() => import("./DriverShare"));
export const OperatorDriver = lazy(() => import("./OperatorDriver"));
export const OverallRideStatement = lazy(() =>
  import("./OverallRideStatement")
);
export const DailyStatement = lazy(() => import("./DailyStatement"));
export const MonthlyStatement = lazy(() => import("./MonthlyStatement"));
export const YearlyStatement = lazy(() => import("./YearlyStatement"));

export const ManageArtists = lazy(() => import("./ManageArtists"));
export const ManageManagers = lazy(() => import("./ManageManagers"));
export const ChangePassword = lazy(() => import("./ChangePassword"));
export const Riders = lazy(() => import("./Riders"));
export const ForgotPassword = lazy(() => import("./ForgotPassword"));
export const EditProfile = lazy(() => import("./EditProfile"));
export const Notifications = lazy(() => import("./Notifications"));
export const Users = lazy(() => import("./Users"));
export const Faqs = lazy(() => import("./Faqs"));
export const Premium = lazy(() => import("./Premium"));
export const Career = lazy(() => import("./Career"));
export const Enquiries = lazy(() => import("./Enquiries"));
export const HipoDrive = lazy(() => import("./HipoDrive"));
export const VerifyOtp = lazy(() => import("./VerifyOtp"));
export const VehicleCategories = lazy(() => import("./VehicleCategories"));
export const RiderConfig = lazy(() => import("./RiderConfig"));
export const DriverConfig = lazy(() => import("./DriverConfig"));
export const OperatorConfig = lazy(() => import("./OperatorConfig"));
export const CancellationCharge = lazy(() => import("./CancellationCharge"));
export const WaitingCharge = lazy(() => import("./WaitingCharge"));
export const Profit = lazy(() => import("./Profit"));
export const VehicleRequests = lazy(() => import("./VehicleRequests"));
