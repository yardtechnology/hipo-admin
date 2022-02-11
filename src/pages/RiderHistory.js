import MaterialTable from "@material-table/core";

const RiderHistory = () => {
  return (
    <>
      {" "}
      <MaterialTable
        title="Rider History"
        // onSelectionChange={(data) => {
        //   setSelectedUserFCMToken({
        //     fcmTokenWeb: data?.[0]?.fcmTokenWeb || null,
        //     fcmToken: data?.[0]?.fcmToken || null,
        //   });
        // }}
        options={{
          // pageSize: "3",
          paging: false,
          actionsColumnIndex: -1,
          search: false,
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
        // data={}
        columns={[
          // {
          //   title: "Sl no",
          //   field: "sl",
          //   render: (newData) => newData.tableData.id + 1,
          //   editable: "never"
          // },
          // {
          //   title: "Name",
          //   field: "displayName",
          // },
          {
            title: "Ride Id",
            tooltip: "Ride Id",
            // field: "displayName",
            // render: ({ photoURL, displayName, email }) => (
            //   <>
            //     <ListItem>
            //       <ListItemAvatar>
            //         {" "}
            //         <Avatar src={photoURL} alt={displayName} />
            //       </ListItemAvatar>
            //       <ListItemText
            //         primary={
            //           <Typography component="span" variant="body2">
            //             {displayName || "Not Provided"}
            //           </Typography>
            //         }
            //         secondary={email}
            //       ></ListItemText>
            //     </ListItem>
            //   </>
            // ),
          },

          {
            title: "Rider Name",
            field: "phoneNumber",
          },
          {
            title: "Driver Name",
            field: "Driver Name",
          },
          {
            title: "Pick Date/Time",
            field: "pick",
          },
          {
            title: "Drop Date/Time",
            field: "drop",
          },
          {
            title: "Pick/Drop Address",
            field: "address",
          },
          {
            title: "Status",
            field: "status",
          },
        ]}
      />
    </>
  );
};

export default RiderHistory;
