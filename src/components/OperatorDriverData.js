import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import OperatorDriverPayment from "./OperatorDriverPayment";

const OperatorDriverData = ({ operatorData, setRealtime }) => {
  console.log(operatorData);
  const { isMounted } = useIsMounted();
  // const { setRealtime } = useDrivers();
  const [driverList, setDriverList] = useState(null);
  console.log(driverList);
  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted) return;
      try {
        const response = await fetch(
          `${BASE_URL}/drivers/all?operatorId=${operatorData?.rowData?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
            // body: JSON.stringify({
            //   operatorId: operatorId,
            // }),
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setDriverList(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, operatorData]);
  return (
    <div>
      <MaterialTable
        title={`${operatorData?.rowData?.displayName}'s Driver List`}
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Drivers"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Drivers"),
            },
          ],
          pageSize: 5,
          actionsColumnIndex: -1,
          search: true,
          selection: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        data={
          driverList === null
            ? []
            : driverList.map((driver, i) => ({
                ...driver,
                sl: i + 1,
                cityName: driver?.city?.name,
                currentTimestamp: moment(driver?.createdAt).format("ll"),
              }))
          //   [
          //   {
          //     dateOfBirth: "12/12/12",
          //     displayName: "Alexa",
          //     email: "alexa@gmail.com",
          //     phoneNumber: "+91 7778876436",
          //     city: "Bbsr",
          //     joiningDate: new Date().toString(),
          //     trips: "15",
          //     profileImageUrl: "",
          //     status: "Approved",
          //   },
          // ]
        }
        isLoading={driverList === null}
        columns={[
          {
            title: "#",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
            width: "2%",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Driver Profile",
            tooltip: "Profile",
            searchable: true,
            field: "displayName",
            render: ({ photoURL, displayName, phoneNumber, isOnline }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                      color={isOnline ? "success" : "error"}
                      invisible={!isOnline}
                    >
                      <Avatar src={photoURL} alt={"img"} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Phone",
            field: "phoneNumber",
            hidden: true,
            export: true,
          },
          {
            title: "Email",
            field: "email",
            hidden: true,
            export: true,
          },
          {
            title: "dateOfBirth",
            field: "dateOfBirth",
            hidden: true,
            export: true,
          },
          {
            title: "City",
            field: "cityName",
          },
          // {
          //   title: "Trips",
          //   field: "trips",
          // },
          {
            title: "Joining Date",
            field: "createdAt",
            render: (rowData) => moment(rowData.createdAt).format("ll"),
            export: false,
          },
          {
            title: "Joining Date",
            field: "currentTimestamp",
            hidden: true,
            export: true,
          },

          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
        detailPanel={(rowData) => (
          <div>
            <OperatorDriverPayment operatorDrivers={rowData} />
          </div>
        )}

        // actions={[
        //   {
        //     tooltip: "Send notification to all selected Drivers",
        //     icon: "send",
        //     onClick: (evt, data) => setSelectedUsers(data),
        //   },
        //   {
        //     tooltip: "Block all selected Drivers",
        //     icon: "block",
        //     onClick: (evt, data) => handleBlockAll(data.map((d) => d._id)),
        //   },
        //   {
        //     tooltip: "Unblock all selected Drivers",
        //     icon: "done",
        //     onClick: (evt, data) => handleUnblockAll(data.map((d) => d._id)),
        //   },
        // ]}
        // detailPanel={({ rowData }) => {
        //   return (
        //     <div
        //       style={{
        //         padding: "20px",
        //         margin: "auto",
        //         backgroundColor: "#eef5f9",
        //       }}
        //     >
        //       <Card
        //         sx={{
        //           minWidth: 500,
        //           maxWidth: 550,
        //           transition: "0.3s",
        //           margin: "auto",
        //           padding: "2vh 2vw",
        //           borderRadius: "10px",
        //           // fontFamily: italic,
        //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        //           "&:hover": {
        //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        //           },
        //         }}
        //       >
        //         <CardContent>
        //           <Typography
        //             variant="body1"
        //             component="p"
        //             gutterBottom
        //             align="left"
        //           >
        //             Email:{" "}
        //             <span
        //               style={{
        //                 color: "rgb(30, 136, 229)",
        //                 fontSize: "15px",
        //               }}
        //             >
        //               {rowData?.email}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             DOB:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.dateOfBirth}
        //             </span>
        //           </Typography>
        //           {/* <Typography variant="body1" gutterBottom align="left">
        //             City:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.city}
        //             </span>
        //           </Typography>
        //           <Typography variant="body1" gutterBottom align="left">
        //             Trips:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.trips}
        //             </span>
        //           </Typography> */}
        //           <Typography variant="body1" gutterBottom align="left">
        //             Country:{" "}
        //             <span
        //               style={{ color: "rgb(30, 136, 229)", fontSize: "15px" }}
        //             >
        //               {rowData?.country?.name}
        //             </span>
        //           </Typography>
        //         </CardContent>
        //       </Card>
        //     </div>
        //   );
        // }}
      />
    </div>
  );
};

export default OperatorDriverData;
