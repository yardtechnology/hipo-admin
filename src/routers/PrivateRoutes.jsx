import { PanelLayout } from "layouts";
import {
  ChangePassword,
  Dashboard,
  EditProfile,
  ManageActivityList,
  ManageArtists,
  // ManageCategories,
  ManageUsers,
  ManageManagers,
  ManagePromoCodes,
  ManageReviews,
  Notifications,
  Supports,
  Users,
  ManageRequests,
  ManageEvents,
  ManageLanguage,
  ManageGenre,
  ManageServices,
  ManageCrowd,
  AppUpdate,
  ManageDays,
  Bookings,
  ArtistBookingList,
  Categories,
  Contacts,
  AllDrivers,
  Vehicles,
  Pricing,
  Rides,
  Coupons,
  Localization,
  RiderHistory,
  DriverStatements,
  ActiveRides,
  CompletedRides,
  ScheduledRides,
  CancelledRides,
  RentalRides,
  OutstationRides,
  DriverHistory,
  DriverPayment,
  DriverRequests,
  ManageFeatures,
  RidersRating,
  DriversRating,
  Operators,
  Riders,
  OperatorRequest,
  Incentives,
  OperatorDriver,
  DriverShare,
  OperatorShare,
  OperatorRequestedDriver,
  DriverEarningReports,
  OperatorEarningReports,
  OverallRideStatement,
  DailyStatement,
  MonthlyStatement,
  YearlyStatement,
  AddNewDriver,
  ViewDocuments,
  AddVehicle,
  Faqs,
  Premium,
  Career,
  Enquiries,
  HipoDrive,
  VehicleCategories,
  RiderConfig,
  DriverConfig,
  OperatorConfig,
  CancellationCharge,
  WaitingCharge,
  Profit,
  VehicleRequests,
  AssignModels,
  ReferralCharge,
  DriverVehicleList,
  RequestedDriverVehicleList,
  RequestedOperatorVehicleList,
  OperatorVehicleList,
  TeamNumberConfig,
  SetRentalPackage,
} from "pages";
import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <PanelLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
        <Route
          path="/operator-requested-drivers"
          element={<OperatorRequestedDriver />}
        />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/manage-days" element={<ManageDays />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/manage-languages" element={<ManageLanguage />} />
        <Route path="/manage-genres" element={<ManageGenre />} />
        <Route path="/manage-services" element={<ManageServices />} />
        <Route path="/features" element={<ManageFeatures />} />
        <Route path="/ride-history/:riderId" element={<RiderHistory />} />
        <Route path="/manage-artists" element={<ManageArtists />} />
        <Route path="/manage-managers" element={<ManageManagers />} />
        <Route
          path="/driver-statement/:driverName/:driverId"
          element={<DriverStatements />}
        />
        <Route path="/rider-ratings" element={<RidersRating />} />
        <Route path="/driver-ratings" element={<DriversRating />} />
        <Route path="/manage-crowd" element={<ManageCrowd />} />
        <Route path="/app-update" element={<AppUpdate />} />
        <Route path="/all-bookings" element={<Bookings />} />
        <Route path="/driver-share" element={<DriverShare />} />
        <Route path="/operators-share" element={<OperatorShare />} />
        <Route path="/artist-booking-list" element={<ArtistBookingList />} />
        <Route path="/manage-activity-list" element={<ManageActivityList />} />
        <Route path="/supports" element={<Supports />} />
        <Route path="/manage-reviews" element={<ManageReviews />} />
        <Route path="/manage-promo-codes" element={<ManagePromoCodes />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="/driver-earning-reports"
          element={<DriverEarningReports />}
        />
        <Route path="/drivers/all-drivers" element={<AllDrivers />} />
        <Route path="/drivers/driver-payment" element={<DriverPayment />} />
        <Route path="/drivers/add-new-driver" element={<AddNewDriver />} />
        <Route path="/drivers/driver-requests" element={<DriverRequests />} />
        <Route path="/drivers/driver-requests" element={<DriverRequests />} />
        <Route path="/view-documents" element={<ViewDocuments />} />
        <Route path="/driver-history/:driverId" element={<DriverHistory />} />
        <Route path="/view-operators" element={<Operators />} />
        <Route path="/operators-requests" element={<OperatorRequest />} />
        <Route
          path="/operator-earning-reports"
          element={<OperatorEarningReports />}
        />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/add-new-vehicle" element={<AddVehicle />} />
        <Route path="vehicle-categories" element={<VehicleCategories />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/incentives" element={<Incentives />} />
        <Route
          path="/operator-driver/:operatorId"
          element={<OperatorDriver />}
        />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/localization" element={<Localization />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="rides/active-rides" element={<ActiveRides />} />
        <Route path="rides/completed-rides" element={<CompletedRides />} />
        <Route path="rides/scheduled-rides" element={<ScheduledRides />} />
        <Route path="rides/cancelled-rides" element={<CancelledRides />} />
        <Route path="rides/rental-rides" element={<RentalRides />} />
        <Route path="rides/outstation-rides" element={<OutstationRides />} />
        <Route
          path="overall-ride-statement"
          element={<OverallRideStatement />}
        />{" "}
        <Route path="daily-statement" element={<DailyStatement />} />
        <Route path="monthly-statement" element={<MonthlyStatement />} />
        <Route path="yearly-statement" element={<YearlyStatement />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/career" element={<Career />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/hipo-drive" element={<HipoDrive />} />
        <Route path="/rider-config" element={<RiderConfig />} />
        <Route path="/driver-config" element={<DriverConfig />} />
        <Route path="/operator-config" element={<OperatorConfig />} />
        <Route path="/cancellation-charge" element={<CancellationCharge />} />
        <Route path="/waiting-charge" element={<WaitingCharge />} />
        <Route path="/profit" element={<Profit />} />
        <Route path="/vehicle-requests" element={<VehicleRequests />} />
        <Route path="/assign-models" element={<AssignModels />} />
        <Route path="/referral-charge" element={<ReferralCharge />} />
        <Route path="/team-number-config" element={<TeamNumberConfig />} />
        <Route
          path="/driver-vehicle-list/:driverId"
          element={<DriverVehicleList />}
        />
        <Route
          path="/requested-driver-vehicle-list/:driverId"
          element={<RequestedDriverVehicleList />}
        />
        <Route
          path="/operator-vehicle-list/:operatorId"
          element={<OperatorVehicleList />}
        />
        <Route
          path="/requested-operator-vehicle-list/:operatorId"
          element={<RequestedOperatorVehicleList />}
        />
        <Route path="/rental-package" element={<SetRentalPackage />} />
      </Routes>
    </PanelLayout>
  );
};

export default PrivateRoutes;
