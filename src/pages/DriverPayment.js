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
import {
  DocumentsDrawer,
  EditDriverDrawer,
  OperatorDriverPayment,
  ReferralDrawer,
  VehicleInfoDrawer,
} from "components";
import { SendNotification } from "components/dialog";
import { useDriverPayments } from "hooks";
import moment from "moment";
import React, { useState } from "react";

const DriverPayment = () => {
  const tableRef = React.createRef();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openReferralDrawer, setOpenReferralDrawer] = useState(false);
  const [openVehicleInfoDrawer, setOpenVehicleInfoDrawer] = useState(false);
  const [openDocumentDrawer, setOpenDocumentDrawer] = useState(false);
  const [openEditDriverDrawer, setOpenEditDriverDrawer] = useState(false);
  const { soloDrivers, setRealtime } = useDriverPayments();

  // console.log("drivers", drivers);

  return (
    <>
      <ReferralDrawer
        open={openReferralDrawer}
        setOpenReferralDrawer={setOpenReferralDrawer}
      />
      <VehicleInfoDrawer
        open={openVehicleInfoDrawer}
        setOpenVehicleInfoDrawer={setOpenVehicleInfoDrawer}
      />
      <DocumentsDrawer
        setRealtime={setRealtime}
        open={openDocumentDrawer}
        setOpenDocumentsDrawer={setOpenDocumentDrawer}
      />
      <EditDriverDrawer
        setRealtime={setRealtime}
        open={openEditDriverDrawer}
        setOpenEditDriverDrawer={setOpenEditDriverDrawer}
      />
      <MaterialTable
        title="Drivers"
        tableRef={tableRef}
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
          pageSize: 20,
          actionsColumnIndex: -1,
          search: true,
          detailPanelColumnAlignment: "right",
          sorting: true,
        }}
        data={
          soloDrivers === null
            ? []
            : soloDrivers.map((driver) => {
                return {
                  ...driver,
                  countryName: driver?.country?.name,
                  DOB: driver?.dateOfBirth
                    ? moment(driver?.dateOfBirth).format("ll")
                    : "--",
                  isBlocked: driver.isBlocked ? "Yes" : "No",
                };
              })
        }
        isLoading={soloDrivers === null}
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
            title: "DOB",
            field: "DOB",
            // render: ({ dateOfBirth }) => {
            //   moment(dateOfBirth).format("ll");
            // },
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Country",
            field: "countryName",
            searchable: true,
            emptyValue: "--",
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
        detailPanel={(rowData) => {
          return (
            <div
              style={{
                padding: "5px",
                margin: "auto",
                backgroundColor: "#eef5f9",
              }}
            >
              <OperatorDriverPayment operatorDrivers={rowData} />
            </div>
          );
        }}
        // actions={[
        //   {
        //     // icon: () => <Visibility style={{ color: "#1991eb" }} />,
        //     // tooltip: "View All Rides ",
        //     // position: "toolbar",
        //     // onClick: () => {
        //     //   history.push("/users");
        //     // },
        //   },
        // ]}
      />
      <SendNotification
        setRealtime={setRealtime}
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers([])}
      />
    </>
  );
};

export default DriverPayment;
