import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, PictureAsPdfOutlined } from "@mui/icons-material";
// import { formatCurrency } from "@ashirbad/js-core";
import {
  Avatar,
  ListItem,
  //   ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
// import { BASE_URL } from "configs";
import moment from "moment";

const Career = () => {
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  return (
    <>
      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 10,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Counpons"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Counpons"),
            },
          ],
        }}
        title={"Manage Career"}
        data={[
          {
            sl: 1,
            amount: "100",
            typeImage: "",
            couponCode: "45#APR",
            count: 5,
            usedCount: 2,
            costPerKm: 7,
            seatingCapacity: 5,
            status: "active",
            maxCashback: 85,
            discount: 15,
            displayName: "Alexa Smith",
            email: "alexa@gmail.com",
            phoneNumber: "9876543210",
            gender: "Male",
            location: "Bhubaneswar",
            experience: "Fresher",
          },
        ]}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "10%",
          },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "25%",
            field: "firstName",
            render: ({ photoURL, displayName, phoneNumber, email }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  {/* <ListItemAvatar
                    sx={{ paddingRight: "0px !important", minWidth: "50px" }}
                  >
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar> */}
                  <ListItemText
                    sx={{ paddingLeft: 0 }}
                    primary={
                      <Typography component="span" variant="body2">
                        {displayName || "Not Provided"}
                      </Typography>
                    }
                    // secondary={email}
                    secondary={
                      <div>
                        <div> {email || "Not Provided"}</div>
                        <div> {phoneNumber || "Not Provided"}</div>
                      </div>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },

          //   {
          //     title: "Phone",
          //     field: "phoneNumber",
          //   },
          {
            title: "Gender",
            field: "gender",
          },
          {
            title: "Location",
            field: "location",
          },
          {
            title: "Experience",
            field: "experience",
          },
          // {
          //   title: "Amount",
          //   field: "amount",
          //   type: "numeric",
          //   render: ({ amount }) => formatCurrency(amount),
          // },
          // {
          //   title: "Count",
          //   field: "count",
          //   type: "numeric",
          // },
          // {
          //   title: "Used Count",
          //   field: "count",
          //   type: "numeric",
          // },

          {
            title: "Timestamp",
            // width: "70%",
            field: "timestamp",
            editable: "never",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
            export: false,
            searchable: true,
            // hidden: true,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            hidden: true,
            export: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
          {
            title: "Actions",
            // width: "18%",
            headerStyle: {
              textAlign: "center",
            },
            // field: "pick",
            render: (row) => (
              <>
                <div className="d-flex">
                  <Tooltip title="Download CV">
                    <Avatar
                      variant="rounded"
                      //   onClick={() =>
                      //     setOpenEditQADrawer(row)
                      //   }
                      sx={{
                        mr: ".4vw",
                        padding: "0px !important",
                        backgroundColor: "gray",
                        cursor: "pointer",
                      }}
                    >
                      <PictureAsPdfOutlined
                        sx={{ padding: "0px !important" }}
                      />
                    </Avatar>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Avatar
                      variant="rounded"
                      // onClick={() => setOpenDocumentDrawer(row)}
                      sx={{
                        padding: "0px !important",
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                    >
                      <Delete sx={{ padding: "0px !important" }} />
                    </Avatar>
                  </Tooltip>
                </div>
              </>
            ),
          },
        ]}
        // editable={{
        //   onRowAdd: async (data) => {},
        //   onRowUpdate: async (newData, oldData) => {},
        //   onRowDelete: async (oldData) => {},
        // }}
        // actions={[
        //   {
        //     tooltip: "Delete all selected Days",
        //     icon: "delete",
        //     onClick: (evt, data) =>
        //       handleBulkDelete(data.map((data) => data?.day)),
        //   },
        // ]}
        // isLoading={days === null}
      />
    </>
  );
};

export default Career;
