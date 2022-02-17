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
} from "pages";
import Riders from "pages/Riders";
import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <PanelLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/manage-days" element={<ManageDays />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/manage-languages" element={<ManageLanguage />} />
        <Route path="/manage-genres" element={<ManageGenre />} />
        <Route path="/manage-services" element={<ManageServices />} />
        <Route path="/rider-history" element={<RiderHistory />} />
        <Route path="/manage-artists" element={<ManageArtists />} />
        <Route path="/manage-managers" element={<ManageManagers />} />
        <Route path="/driver-statement" element={<DriverStatements />} />
        <Route path="/manage-crowd" element={<ManageCrowd />} />
        <Route path="/app-update" element={<AppUpdate />} />
        <Route path="/all-bookings" element={<Bookings />} />
        <Route path="/artist-booking-list" element={<ArtistBookingList />} />
        <Route path="/manage-activity-list" element={<ManageActivityList />} />
        <Route path="/supports" element={<Supports />} />
        <Route path="/manage-reviews" element={<ManageReviews />} />
        <Route path="/manage-promo-codes" element={<ManagePromoCodes />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="drivers/all-drivers" element={<AllDrivers />} />
        <Route path="drivers/driver-payment" element={<DriverPayment />} />

        <Route path="driver-history" element={<DriverHistory />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/localization" element={<Localization />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="rides/active-rides" element={<ActiveRides />} />
        <Route path="rides/completed-rides" element={<CompletedRides />} />
        <Route path="rides/scheduled-rides" element={<ScheduledRides />} />
        <Route path="rides/cancelled-rides" element={<CancelledRides />} />
        <Route path="rides/rental-rides" element={<RentalRides />} />
        <Route path="rides/outstation-rides" element={<OutstationRides />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </PanelLayout>
  );
};

export default PrivateRoutes;
