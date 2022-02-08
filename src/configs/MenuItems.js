import {
  Category,
  ContactMail,
  Dashboard,
  DirectionsCar,
  FeaturedPlayList,
  HomeRepairService,
  LocalActivity,
  Money,
  // LocalActivity,
  Notifications,
  Paid,
  People,
  Person,
  // PersonAdd,
  Redeem,
  Reviews,
  Summarize,
  Support,
  TwoWheeler,
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
    title: "Riders",
    route: "/riders",
  },
  // {
  //   key: "14",
  //   icon: <PersonAdd className="iconColor" />,
  //   title: "Manage Requests",
  //   route: "/manage-requests",
  // },
  {
    key: "4",
    icon: <DirectionsCar className="iconColor" />,
    title: "Drivers",
    route: "drivers",
  },
  {
    key: "2",
    icon: <TwoWheeler className="iconColor" />,
    title: "Rides",
    route: "/rides",
  },
  {
    key: "11",
    icon: <HomeRepairService className="iconColor" />,
    title: "vehicles",
    route: "/vehicles",
  },
  {
    key: "20",
    icon: <Category className="iconColor" />,
    title: "Categories",
    route: "/categories",
  },
  // {
  //   key: "12",
  //   icon: <TheaterComedy className="iconColor" />,
  //   title: "Manage Genres",
  //   route: "/manage-genres",
  // },
  {
    key: "13",
    icon: <LocalActivity className="iconColor" />,
    title: "Localization",
    route: "/localization",
  },

  {
    key: "7",
    icon: <Redeem className="iconColor" />,
    title: "Coupons",
    route: "/coupons",
  },
  {
    key: "19",
    icon: <FeaturedPlayList className="iconColor" />,
    title: "Features",
    route: "/features",
  },
  {
    key: "5",
    icon: <Person className="iconColor" />,
    title: "Operators",
    route: "/operators",
  },
  {
    key: "16",
    icon: <Money className="iconColor" />,
    title: "Pricing",
    route: "/pricing",
  },

  {
    key: "17",
    icon: <Summarize className="iconColor" />,
    title: "Statement",
    route: "/statements",
  },
  {
    key: "18",
    icon: <Paid className="iconColor" />,
    title: "Earning Reports",
    route: "/earning-report",
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
    key: "21",
    icon: <ContactMail className="iconColor" />,
    title: "Contacts",
    route: "/contacts",
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
