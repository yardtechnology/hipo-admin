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
  IconButton,
} from "@mui/material";
import { BASE_URL } from "configs";
import { useCareer } from "hooks";
// import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";

const Career = () => {
  const { career, setRealtime } = useCareer();
  console.log(career);
  // const { days, setRealtime } = useDays();
  // const handleBulkDelete = async (data) => {};
  const onRowDelete = async (oldData) => {
    console.log(oldData);
    try {
      const response = await fetch(`${BASE_URL}/career-form/${oldData.id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      res?.status === 200
        ? Swal.fire({ text: res.message, icon: "success" })
        : Swal.fire({ text: res.message, icon: "error" });
    } catch (err) {
      Swal.fire({ text: err.message, icon: "error" });
      console.log(err);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
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
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Career Forms"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Career Forms"),
            },
          ],
        }}
        title={"Manage Career"}
        data={
          career === null
            ? []
            : career?.map((career, i) => ({
                ...career,
                sl: i + 1,
                currentTimestamp: moment(career?.createdAt).format("LL"),
              }))
        }
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
            field: "name",
            render: ({ photoURL, name, phoneNumber, email }) => (
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
                        {name || "Not Provided"}
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
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
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
                      <IconButton href={row?.resumeURL} target={"_blank"}>
                        <PictureAsPdfOutlined
                          sx={{ padding: "0px !important", color: "snow" }}
                        />
                      </IconButton>
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
                      <IconButton onClick={() => onRowDelete(row)}>
                        <Delete
                          sx={{ padding: "0px !important", color: "snow" }}
                        />
                      </IconButton>
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
