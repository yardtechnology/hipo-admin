import {
  AttractionsTwoTone,
  BookOutlined,
  CalendarToday,
  Category,
  Dashboard,
  HomeRepairService,
  Language,
  // LocalActivity,
  Notifications,
  People,
  // PersonAdd,
  Redeem,
  Reviews,
  Support,
  SystemUpdate,
  // TheaterComedy,
  VpnKey,
} from "@mui/icons-material";

const MenuItems = [
  {
    key: "1",
    title: "Dashboard",
    icon: <Dashboard className="iconColor" />,
    route: "/",
  },
  // {
  //   key: "2",
  //   title: "Manage Artists",
  //   icon: <AttractionsTwoTone className="iconColor" />,
  //   route: "/manage-artists",
  // },
  // {
  //   key: "11",
  //   title: "Manage  Managers",
  //   icon: <SupervisedUserCircleOutlined className="iconColor" />,
  //   route: "/manage-managers",
  // },

  {
    key: "3",
    icon: <People className="iconColor" />,
    title: "Manage Users",
    route: "/manage-users",
  },
  // {
  //   key: "14",
  //   icon: <PersonAdd className="iconColor" />,
  //   title: "Manage Requests",
  //   route: "/manage-requests",
  // },
  {
    key: "4",
    icon: <Category className="iconColor" />,
    title: "Manage Categories",
    route: "/manage-categories",
  },
  {
    key: "2",
    icon: <AttractionsTwoTone className="iconColor" />,
    title: "Manage Events",
    route: "/manage-events",
  },
  {
    key: "11",
    icon: <HomeRepairService className="iconColor" />,
    title: "Manage Services",
    route: "/manage-services",
  },
  // {
  //   key: "12",
  //   icon: <TheaterComedy className="iconColor" />,
  //   title: "Manage Genres",
  //   route: "/manage-genres",
  // },
  {
    key: "13",
    icon: <Language className="iconColor" />,
    title: "Manage Languages",
    route: "/manage-languages",
  },

  {
    key: "7",
    icon: <Redeem className="iconColor" />,
    title: "Manage PromoCodes",
    route: "/manage-promo-codes",
  },
  {
    key: "5",
    icon: <People className="iconColor" />,
    title: "Manage Crowd",
    route: "/manage-crowd",
  },
  {
    key: "16",
    icon: <CalendarToday className="iconColor" />,
    title: "Manage Days",
    route: "/manage-days",
  },
  {
    key: "15",
    icon: <BookOutlined className="iconColor" />,
    title: "All Bookings",
    route: "/all-bookings",
  },
  {
    key: "8",
    icon: <Support className="iconColor" />,
    title: "Supports",
    route: "/supports",
  },
  {
    key: "6",
    icon: <Reviews className="iconColor" />,
    title: "Manage Reviews",
    route: "/manage-reviews",
  },
  {
    key: "14",
    icon: <SystemUpdate className="iconColor" />,
    title: "App Update",
    route: "/app-update",
  },
  {
    key: "9",
    icon: <Notifications className="iconColor" />,
    title: "Notifications",
    route: "/notifications",
  },
  {
    key: "10",
    icon: <VpnKey className="iconColor" />,
    title: "Change Password",
    route: "/change-password",
  },
];

export default MenuItems;
