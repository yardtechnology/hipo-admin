import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Article, History, SummarizeRounded } from "@mui/icons-material";
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

const AllDrivers = () => {
  return (
    <>
      {" "}
      <MaterialTable
        title="All Drivers"
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
            name: "Alexa",
            email: "alexa@gmail.com",
            phoneNumber: "777887643625",
            address: "Bbsr",
            joiningDate: "12/2/2021",
            trips: "15",
            profileImageUrl: "",
            status: "Approved",
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
            title: "Joining Date",
            field: "joiningDate",
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
            title: "Other",
            // field: "pick",
            render: (row) => (
              <>
                {" "}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<History />}
                  sx={{ textTransform: "none" }}
                >
                  History
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<SummarizeRounded />}
                  sx={{ marginTop: "1vh", textTransform: "none" }}
                >
                  Statement
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  startIcon={<Article />}
                  sx={{ marginTop: "1vh", textTransform: "none" }}
                >
                  Document
                </Button>
              </>
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

export default AllDrivers;
