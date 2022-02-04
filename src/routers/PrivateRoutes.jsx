import { PanelLayout } from "layouts";
import {
  ChangePassword,
  Dashboard,
  EditProfile,
  ManageActivityList,
  ManageArtists,
  ManageCategories,
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
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/manage-days" element={<ManageDays />} />
        <Route path="/manage-categories" element={<ManageCategories />} />
        <Route path="/manage-languages" element={<ManageLanguage />} />
        <Route path="/manage-genres" element={<ManageGenre />} />
        <Route path="/manage-services" element={<ManageServices />} />
        <Route path="/manage-artists" element={<ManageArtists />} />
        <Route path="/manage-managers" element={<ManageManagers />} />
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
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </PanelLayout>
  );
};

export default PrivateRoutes;
