import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import {
//   Avatar,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography,
// } from "@mui/material";
import { DETAILPANEL } from "components";
// import { BASE_URL } from "configs";
import { useUsers } from "hooks";
import moment from "moment";

const ManageReviews = () => {
  const { users } = useUsers();
  const Reviews = users?.filter((user) => user?.role === "artist");

  return (
    <div style={{ marginTop: "2vh" }}>
      <MaterialTable
        options={{
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Reviews"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Reviews"),
            },
          ],
        }}
        title={"Reviews"}
        data={
          Reviews === null
            ? []
            : Reviews?.map((review, i) => ({
                ...review,
                sl: i + 1,
                currentTimestamp: moment(review?.timestamp).format("lll"),
              }))
        }
        columns={[
          { field: "sl", title: "#", width: 10 },
          // { title: "Name", field: "name" },
          // {
          //   title: "Profile",
          //   tooltip: "Profile",
          //   searchable: true,
          //   width: "40%",
          //   field: "firstName",
          //   render: ({
          //     profileImageUrl,
          //     firstName,
          //     lastName,
          //     email,
          //     phoneNumber,
          //   }) => (
          //     <>
          //       <ListItem sx={{ paddingLeft: "0px" }}>
          //         <ListItemAvatar>
          //           <Avatar src={profileImageUrl} alt={"img"} />
          //         </ListItemAvatar>
          //         <ListItemText
          //           primary={
          //             <Typography component="span" variant="body2">
          //               {firstName + " " + lastName || "Not Provided"}
          //             </Typography>
          //           }
          //           // secondary={email}
          //           secondary={
          //             <Typography
          //               sx={{}}
          //               component="details"
          //               variant="subtitle2"
          //             >
          //               {email || "Not Provided"} <br />
          //               {phoneNumber || "Not Provided"}
          //             </Typography>
          //           }
          //         ></ListItemText>
          //       </ListItem>
          //     </>
          //   ),
          // },
          {
            title: "First Name",
            field: "firstName",
            searchable: true,
          },
          {
            title: "Last Name",
            field: "lastName",
            searchable: true,
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
          },
          {
            title: "Phone",
            field: "phoneNumber",
            searchable: true,
          },

          // {
          //   title: "Block",
          //   searchable: true,
          //   field: "status",

          //   // render: (row) => (
          //   //   <>
          //   //     {row.status ? (
          //   //       <Button size="small" variant="contained" color="secondary">
          //   //         Blocked
          //   //       </Button>
          //   //     ) : (
          //   //       <Button size="small" variant="contained" color="Primary">
          //   //         UnBlocked
          //   //       </Button>
          //   //     )}
          //   //   </>
          //   // ),
          //   render: (row) => (
          //     <>
          //       <Button
          //         size="small"
          //         variant="contained"
          //         color="secondary"
          //         startIcon={<Block />}
          //       >
          //         block
          //       </Button>
          //     </>
          //   ),
          // },

          {
            title: "Timestamp",
            searchable: true,
            field: "timestamp",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
            export: false,
          },
          {
            title: "Timestamp",
            // width: "70%",
            field: "currentTimestamp",
            editable: "never",
            export: true,
            hidden: true,
            // render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
          // { title: "Updated At", field: "updated_at" },
        ]}
        detailPanel={({ rowData }) => {
          return <DETAILPANEL rowData={rowData} />;
        }}
        isLoading={Reviews === null}
      />
    </div>
  );
};

export default ManageReviews;
