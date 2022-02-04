import {
  Attractions,
  Money,
  MoreVert,
  People,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Card as DashboardCard } from "components/dashboard";
import { useBookings, useUsers } from "hooks";
import moment from "moment";
import Chart from "react-apexcharts";
const Dashboard = () => {
  const { bookings } = useBookings();
  console.log(bookings);
  const BOOKINGS =
    bookings === null
      ? []
      : bookings?.filter((booking) => booking?.status === "confirm");
  console.log(BOOKINGS);
  const Revenue = BOOKINGS.reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  const janRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jan 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jan 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(janRevenue);
  const febRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Feb 29,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Feb 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(febRevenue);
  const marRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Mar 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Mar 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(marRevenue);
  const aprRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Apr 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Apr 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(aprRevenue);
  const mayRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `May 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `May 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(mayRevenue);
  const junRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jun 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jun 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(junRevenue);
  const julRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jul 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jul 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(julRevenue);
  const augRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Aug 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Aug 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(augRevenue);
  const sepRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Sep 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Sep 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(sepRevenue);
  const octRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Oct 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Oct 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(octRevenue);
  const novRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Nov 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Nov 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(novRevenue);
  const decRevenue = BOOKINGS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Dec 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Dec 01, ${new Date().getFullYear()}`
  ).reduce(function (accumulator, currentValue) {
    return accumulator + +currentValue?.bookingPrice;
  }, 0);
  console.log(decRevenue);
  console.log(Revenue);
  const { users } = useUsers();
  console.log(users);
  const Artists =
    users === null ? [] : users.filter((user) => user?.role === "artist");
  console.log(Artists);
  const janArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jan 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jan 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(janArtist);
  const febArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Feb 29,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Feb 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(febArtist);
  const marArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Mar 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Mar 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(marArtist);
  const aprArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Apr 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Apr 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(aprArtist);
  const mayArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `May 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `May 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(mayArtist);
  const junArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jun 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jun 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(junArtist);
  const julArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jul 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jul 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(julArtist);
  const augArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Aug 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Aug 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(augArtist);
  const sepArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Sep 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Sep 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(sepArtist);
  const octArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Oct 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Oct 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(octArtist);
  const novArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Nov 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Nov 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(novArtist);
  const decArtist = Artists?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Dec 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Dec 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(decArtist);
  const USERS =
    users === null ? [] : users.filter((user) => user?.role === "user");
  console.log(USERS);
  const janUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jan 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jan 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(janUser);
  const febUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Feb 29,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Feb 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(febUser);
  const marUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Mar 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Mar 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(marUser);
  const aprUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Apr 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Apr 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(aprUser);
  const mayUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `May 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `May 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(mayUser);
  const junUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jun 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jun 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(junUser);
  const julUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jul 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jul 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(julUser);
  const augUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Aug 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Aug 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(augUser);
  const sepUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Sep 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Sep 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(sepUser);
  const octUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Oct 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Oct 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(octUser);
  const novUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Nov 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Nov 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(novUser);
  const decUser = USERS?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Dec 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Dec 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(decUser);
  const Managers =
    users === null ? [] : users.filter((user) => user?.role === "manager");
  console.log(Managers);
  const janManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jan 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jan 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(janManagers);
  const febManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Feb 29,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Feb 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(febManagers);
  const marManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Mar 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Mar 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(marManagers);
  const aprManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Apr 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Apr 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(aprManagers);
  const mayManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `May 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `May 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(mayManagers);
  const junManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jun 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jun 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(junManagers);
  const julManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Jul 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Jul 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(julManagers);
  const augManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Aug 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Aug 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(augManagers);
  const sepManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Sep 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Sep 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(sepManagers);
  const octManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Oct 31,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Oct 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(octManagers);
  const novManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Nov 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Nov 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(novManagers);
  const decManagers = Managers?.filter(
    (booking) =>
      moment(booking.timestamp).format("lll") <=
        `Dec 30,${new Date().getFullYear()}` &&
      moment(booking.timestamp).format("lll") >=
        `Dec 01, ${new Date().getFullYear()}`
  )?.length;
  console.log(decManagers);
  const optionsPie = {
    series: [Artists?.length, Managers?.length, USERS?.length],
    // labels: ["User", "Ads", "Categories", "Cities"],
    options: {
      legend: {
        position: "right",
      },
      colors: ["#c91c83", "#40559b", "#4d4444"],
      chart: {
        selection: {
          enabled: true,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          export: {
            csv: {
              filename: "Total data",
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: "Total data",
            },
            png: {
              filename: "Total data",
            },
          },
          autoSelected: "zoom",
        },
        width: 380,
        type: "donut",
      },
      labels: ["Total Artists", "Total Managers", "Total Users"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
    },

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const areaOptions = {
    series: [
      {
        name: "Total Revenue",
        data: [
          janRevenue,
          febRevenue,
          marRevenue,
          aprRevenue,
          mayRevenue,
          junRevenue,
          julRevenue,
          augRevenue,
          sepRevenue,
          octRevenue,
          novRevenue,
          decRevenue,
        ],
      },
    ],
    options: {
      // colors: ["#c91c83", "#b53682", "#a84c83"],
      // colors: ["#40559b", "#57679c", "#677299"],
      title: {
        text: "Monthly Total Revenue",
      },
      colors: ["#40559b"],
      chart: {
        background: "transparent",
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,

          tools: {
            zoomin: false,
            zoomout: false,
          },
          export: {
            csv: {
              filename: "Total data",
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: "Total data",
            },
            png: {
              filename: "Total data",
            },
          },
          autoSelected: "zoom",
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  const chartOptions = {
    series: [
      {
        name: "Total Artists",
        data: [
          janArtist,
          febArtist,
          marArtist,
          aprArtist,
          mayArtist,
          junArtist,
          julArtist,
          augArtist,
          sepArtist,
          octArtist,
          novArtist,
          decArtist,
        ],
      },
      {
        name: "Total Managers",
        data: [
          janManagers,
          febManagers,
          marManagers,
          aprManagers,
          mayManagers,
          junManagers,
          julManagers,
          augManagers,
          sepManagers,
          octManagers,
          novManagers,
          decManagers,
        ],
      },
      {
        name: "Total Users",
        data: [
          janUser,
          febUser,
          marUser,
          aprUser,
          mayUser,
          junUser,
          julUser,
          augUser,
          sepUser,
          octUser,
          novUser,
          decUser,
        ],
      },
    ],
    options: {
      // colors: ["#c91c83", "#b53682", "#a84c83"],
      // colors: ["#40559b", "#57679c", "#677299"],
      colors: ["#c91c83", "#40559b", "#4d4444"],
      chart: {
        background: "#fff",
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,

          tools: {
            zoomin: false,
            zoomout: false,
          },
          export: {
            csv: {
              filename: "Total data",
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: "Total data",
            },
            png: {
              filename: "Total data",
            },
          },
          autoSelected: "zoom",
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };
  return (
    <>
      {/* <Card>
        <CardHeader
          title="Hello, Super Admin!"
          subheader="Check the latest banking stats under this beautiful dashboard!"
        />
      </Card> */}

      <section className="py-2">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <DashboardCard
              title={Artists?.length}
              subtitle="Artists"
              icon={<Attractions className="iconColor" />}
              iconAction={"/manage-users"}
              menuName={"view artists"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <DashboardCard
              title={Managers?.length}
              subtitle="Managers"
              icon={<SupervisedUserCircleOutlined className="iconColor" />}
              iconAction={"/manage-users"}
              menuName={"view managers"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <DashboardCard
              title={USERS?.length}
              subtitle="Users"
              icon={<People className="iconColor" />}
              iconAction={"/manage-users"}
              menuName={"view users"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <DashboardCard
              title={"$ " + Revenue}
              subtitle="Revenue"
              icon={<Money className="iconColor" />}
              iconAction={<MoreVert sx={{ color: "snow" }} />}
              menuName={"total revenue"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: 3.5 }}>
            <Chart
              options={{
                ...chartOptions.options,
              }}
              series={chartOptions.series}
              type="line"
              height="300"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ marginTop: 3.5 }}>
            <Chart
              options={{ ...optionsPie.options }}
              series={optionsPie.series}
              type="donut"
              height="300"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ marginTop: 3.5, justifyContent: "center" }}
          >
            <Chart
              options={{
                ...areaOptions.options,
              }}
              series={areaOptions.series}
              type="area"
              height="300"
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Dashboard;
