import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { History } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Riders = () => {
  return (
    <>
      {" "}
      <MaterialTable
        title="Riders"
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Riders"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Riders"),
            },
          ],
          // pageSize: "3",
          actionsColumnIndex: -1,
          search: true,
          // selection: true,
          sorting: true,
          headerStyle: {
            backgroundColor: "rgba(239,239,247,.7)",
            color: "#3b3e66",
            fontSize: 16,
            fontWeight: 560,
            textAlign: "left",
            "&:hover": {
              color: "#ff4f00 !important",
              cursor: "pointer",
            },
            whiteSpace: "nowrap",
          },
          rowStyle: {
            backgroundColor: "#fffbf2",
            color: "#3b3e66",
            textAlign: "left",
          },
          cellStyle: {
            textAlign: "left",
          },
        }}
        data={[
          {
            name: "Mehmet",
            email: "Baran@gmail.com",
            phoneNumber: "777887643625",
            address: "Bbsr",
            trips: "15",
            profileImageUrl: "",
            status: "completed",
          },
        ]}
        columns={[
          {
            title: "Sl no",
            field: "sl",
            render: (newData) => newData.tableData.id + 1,
            editable: "never",
          },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "30%",
            field: "firstName",
            render: ({ profileImageUrl, name, email, phoneNumber }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={profileImageUrl} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {name || "Not Provided"}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={
                      <Typography
                        sx={{}}
                        component="details"
                        variant="subtitle2"
                      >
                        {email || "Not Provided"} <br />
                        {phoneNumber || "Not Provided"}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },

          {
            title: "Address",
            field: "address",
          },
          {
            title: "Trips",
            field: "trips",
          },
          {
            title: "Status",
            field: "status",
            render: (row) => (
              <>
                <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={row?.status}
                />
              </>
            ),
          },
          {
            title: "Ride History",
            // field: "pick",
            render: (row) => (
              <Button variant="contained" size="small" startIcon={<History />}>
                History
              </Button>
            ),
          },
          // {
          //   title: "Drop Date/Time",
          //   field: "drop",
          // },
        ]}
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
    </>
  );
};

export default Riders;
