import {
  Add,
  // AssignmentTurnedIn,
  Cancel,
  CarRental,
  Category,
  ContactMail,
  // Create,
  Dashboard,
  DirectionsCar,
  Done,
  FeaturedPlayList,
  // HomeRepairService,
  LocalActivity,
  LocalCarWash,
  Money,
  Visibility,
  // LocalActivity,
  Notifications,
  People,
  PeopleAlt,
  Person,
  PersonAdd,
  // PersonAdd,
  Redeem,
  Reviews,
  Schedule,
  Star,
  Summarize,
  ToggleOn,
  TwoWheeler,
  // TheaterComedy,
  VpnKey,
  // LocalAtm,
  PriceCheck,
  Quiz,
  WorkspacePremium,
  DocumentScanner,
  Phone,
  Support,
  RequestPage,
  CategoryOutlined,
  SystemUpdate,
  AttachMoney,
  LocationSearching,
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
    submenus: [
      {
        key: "2",
        title: "All Drivers",
        icon: <PeopleAlt sx={{ color: "#000" }} />,
        route: "/drivers/all-drivers",
      },
      {
        key: "1",
        title: "Add New Driver",
        icon: <Add className="iconColor" sx={{ color: "#000" }} />,
        route: "/drivers/add-new-driver",
      },
      {
        key: "3",
        title: "Driver Payment",
        icon: <Money className="iconColor" sx={{ color: "#000" }} />,
        route: "/drivers/driver-payment",
      },
      {
        key: "4",
        title: "Requests",
        icon: <PersonAdd className="iconColor" sx={{ color: "#000" }} />,
        route: "/drivers/driver-requests",
      },
    ],
  },
  {
    key: "5",
    icon: <Person className="iconColor" />,
    title: "Operators",
    route: "/operators",
    submenus: [
      {
        key: "1",
        title: "View Operators",
        icon: <Person className="iconColor" sx={{ color: "#000" }} />,
        route: "/view-operators",
      },
      {
        key: "3",
        title: "Operator Payment",
        icon: <Money className="iconColor" sx={{ color: "#000" }} />,
        route: "/operator-payment",
      },
      {
        key: "2",
        title: "Requests",
        icon: <PersonAdd className="iconColor" sx={{ color: "#000" }} />,
        route: "/operators-requests",
      },
    ],
  },
  {
    key: "11",
    icon: <Category className="iconColor" />,
    title: "Vehicles",
    route: "/view-vehicles",
    submenus: [
      {
        key: "3",
        title: "Vehicle Categories",
        icon: <CategoryOutlined className="iconColor" sx={{ color: "#000" }} />,
        route: "/vehicle-categories",
      },
      {
        key: "1",
        title: "Add New Vehicle",
        icon: <Add className="iconColor" sx={{ color: "#000" }} />,
        route: "/add-new-vehicle",
      },
      {
        key: "2",
        title: "View Vehicles",
        icon: <Visibility className="iconColor" sx={{ color: "#000" }} />,
        route: "/vehicles",
      },
      {
        key: "4",
        title: "Vehicle Requests",
        icon: <PersonAdd className="iconColor" sx={{ color: "#000" }} />,
        route: "/vehicle-requests",
      },
      {
        key: "5",
        title: "Assign Models",
        icon: <Add className="iconColor" sx={{ color: "#000" }} />,
        route: "/assign-models",
      },
    ],
  },
  {
    key: "2",
    icon: <TwoWheeler className="iconColor" />,
    title: "Rides",
    route: "/rides",
    submenus: [
      {
        key: "1",
        title: "Active Rides",
        icon: <ToggleOn className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/active-rides",
      },
      {
        key: "2",
        title: "Completed Rides",
        icon: <Done className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/completed-rides",
      },
      {
        key: "3",
        title: "Scheduled Rides",
        icon: <Schedule className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/scheduled-rides",
      },
      {
        key: "4",
        title: "Rental Rides",
        icon: <CarRental className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/rental-rides",
      },
      {
        key: "6",
        title: "Outstation Rides",
        icon: <LocalCarWash className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/outstation-rides",
      },
      {
        key: "5",
        title: "Cancelled Rides",
        icon: <Cancel className="iconColor" sx={{ color: "#000" }} />,
        route: "/rides/cancelled-rides",
      },
    ],
  },
  {
    key: "54",
    title: "Total Revenue",
    icon: <AttachMoney className="iconColor" />,
    route: "/total-revenue",
  },

  // {
  //   key: "20",
  //   icon: <Category className="iconColor" />,
  //   title: "Categories",
  //   route: "/categories",
  // },
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
    key: "71",
    icon: <WorkspacePremium className="iconColor" />,
    title: "Premium",
    route: "/premium",
  },
  {
    key: "19",
    icon: <FeaturedPlayList className="iconColor" />,
    title: "Features",
    route: "/features",
  },

  // {
  //   key: "27",
  //   icon: <LocalAtm className="iconColor" />,
  //   title: "Incentives",
  //   route: "/incentives",
  //   submenus: [
  //     {
  //       key: "1",
  //       title: "Driver Share",
  //       icon: <Money className="iconColor" sx={{ color: "#000" }} />,
  //       route: "/driver-share",
  //     },
  //     {
  //       key: "2",
  //       title: "Operators Share",
  //       icon: <Money className="iconColor" sx={{ color: "#000" }} />,
  //       route: "/operators-share",
  //     },
  //   ],
  // },
  // {
  //   key: "16",
  //   icon: <Money className="iconColor" />,
  //   title: "Pricing",
  //   route: "/pricing",
  // },

  {
    key: "17",
    icon: <Summarize className="iconColor" />,
    title: "Statement",
    route: "/statements",
    submenus: [
      {
        key: "2",
        title: "Daily Statement",
        icon: <PriceCheck className="iconColor" sx={{ color: "#000" }} />,
        route: "/daily-statement",
      },
      {
        key: "2",
        title: "Monthly Statement",
        icon: <PriceCheck className="iconColor" sx={{ color: "#000" }} />,
        route: "/monthly-statement",
      },
      {
        key: "2",
        title: "Yearly Statement",
        icon: <PriceCheck className="iconColor" sx={{ color: "#000" }} />,
        route: "/yearly-statement",
      },
    ],
  },

  {
    key: "8",
    icon: <Quiz className="iconColor" />,
    title: "Faqs",
    route: "/faqs",
  },
  {
    key: "6",
    icon: <Reviews className="iconColor" />,
    title: "Reviews",
    route: "/manage-reviews",
    submenus: [
      {
        key: "1",
        title: "Riders Rating",
        icon: <Star className="iconColor" sx={{ color: "#000" }} />,
        route: "/rider-ratings",
      },
      {
        key: "2",
        title: "Drivers Rating",
        icon: <Star className="iconColor" sx={{ color: "#000" }} />,
        route: "/driver-ratings",
      },
    ],
  },
  {
    key: "87",
    icon: <RequestPage className="iconColor" />,
    title: "Hipo Drive",
    route: "/hipo-drive",
  },
  {
    key: "92",
    icon: <DocumentScanner className="iconColor" />,
    title: "Career",
    route: "/career",
  },

  {
    key: "21",
    icon: <ContactMail className="iconColor" />,
    title: "Contacts",
    route: "/contacts",
  },
  {
    key: "85",
    icon: <Support className="iconColor" />,
    title: "Supports",
    route: "/supports",
  },
  {
    key: "86",
    icon: <Phone className="iconColor" />,
    title: "Enquiries",
    route: "/enquiries",
  },
  {
    key: "9",
    icon: <Notifications className="iconColor" />,
    title: "Notifications",
    route: "/notifications",
  },
  {
    key: "67",
    icon: <SystemUpdate className="iconColor" />,
    title: "Configs",
    // route: "/manage-reviews",
    submenus: [
      {
        key: "8",
        title: "Team Number",
        icon: <Phone className="iconColor" sx={{ color: "#000" }} />,
        route: "/team-number-config",
      },
      {
        key: "1",
        title: "Rider Config",
        icon: <SystemUpdate className="iconColor" sx={{ color: "#000" }} />,
        route: "/rider-config",
      },
      {
        key: "2",
        title: "Driver Config",
        icon: <SystemUpdate className="iconColor" sx={{ color: "#000" }} />,
        route: "/driver-config",
      },
      {
        key: "3",
        title: "Operator Config",
        icon: <SystemUpdate className="iconColor" sx={{ color: "#000" }} />,
        route: "/operator-config",
      },
      {
        key: "10",
        title: "Set Billing",
        icon: <AttachMoney className="iconColor" sx={{ color: "#000" }} />,
        route: "/billing-config",
      },
      {
        key: "4",
        title: "Set Profit",
        icon: <AttachMoney className="iconColor" sx={{ color: "#000" }} />,
        route: "/profit",
      },
      {
        key: "5",
        title: "Waiting Charge",
        icon: <AttachMoney className="iconColor" sx={{ color: "#000" }} />,
        route: "/waiting-charge",
      },
      {
        key: "6",
        title: "Cancellation Charge",
        icon: <AttachMoney className="iconColor" sx={{ color: "#000" }} />,
        route: "/cancellation-charge",
      },
      {
        key: "7",
        title: "Referral Charge",
        icon: <AttachMoney className="iconColor" sx={{ color: "#000" }} />,
        route: "/referral-charge",
      },
      {
        key: "11",
        title: "Set Search Radius",
        icon: (
          <LocationSearching className="iconColor" sx={{ color: "#000" }} />
        ),
        route: "/search-radius",
      },
      {
        key: "9",
        title: "Set Rental Package",
        icon: <CarRental className="iconColor" sx={{ color: "#000" }} />,
        route: "/rental-package",
      },
    ],
  },
  {
    key: "10",
    icon: <VpnKey className="iconColor" />,
    title: "Change Password",
    route: "/change-password",
  },
];

export default MenuItems;
