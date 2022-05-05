import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Reply } from "@mui/icons-material";
import {
  //   Avatar,
  IconButton,
  ListItem,
  //   ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { SendReply } from "components/dialog";
import { BASE_URL } from "configs";
import { useEnquiries } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const Enquiries = () => {
  const [loading, setLoading] = useState(false);
  const { enquiries, setRealtime } = useEnquiries();
  console.log(enquiries);
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);
  const handleBulkDelete = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/enquiry-form/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          ids: data,
        }),
      });
      const res = await response.json();
      console.log(res);
      response.status === 200
        ? Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Enquiry Deleted Successfully",
          })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      console.log(res.error.message);
      setRealtime((prev) => !prev);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <MaterialTable
        options={{
          selection: "true",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          pageSize: 5,
          exportAllData: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Enquiries"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Enquiries"),
            },
          ],
        }}
        title={"Enquiries"}
        data={
          enquiries === null
            ? []
            : enquiries?.map((enquiry, i) => ({
                ...enquiry,
                sl: i + 1,
                currentTimestamp: moment(enquiry.createdAt).format(
                  "DD-MM-YYYY"
                ),
                //   createdAt: moment(enquiry.createdAt).format("LL"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            field: "name",
            render: ({ photoURL, name, phoneNumber, email }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  {/* <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={name}
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
            searchable: true,
            export: false,
            hidden: true,
          },
          {
            title: "City",
            field: "city",
            searchable: true,
          },
          {
            title: "Vehicle Type",
            field: "vehicleType",
            searchable: true,
          },
          // {
          //   title: "Message",
          //   field: "message",
          //   searchable: true,
          //   render: ({ message }) =>
          //     message?.length > 10 ? message?.slice(0, 7) + "..." : message,
          //   export: false,
          // },
          // {
          //   title: "Message",
          //   field: "message",
          //   searchable: true,
          //   hidden: true,
          //   export: true,
          // },

          {
            title: "Timestamp",
            searchable: true,
            field: "createdAt",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: false,
          },
          {
            export: false,
            title: "Reply",
            render: (row) => (
              <IconButton onClick={() => setSelectedUsers(row)}>
                <Reply />
              </IconButton>
            ),
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
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(
                `${BASE_URL}/enquiry-form/${oldData?._id}`,
                {
                  method: "DELETE",

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("SAL")}`,
                  },
                }
              );
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res.message })
                : Swal.fire({ icon: "error", text: res.message });
            } catch (error) {
              Swal.fire({ icon: "error", text: error.message });
              console.log(error);
            } finally {
              setRealtime((prev) => !prev);
            }
          },
        }}
        actions={[
          {
            tooltip: "Delete selected enquiries",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(
                data.map((data) => data?._id),
                setRealtime((prev) => !prev)
              ),
          },
        ]}
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
        //           minWidth: 275,
        //           maxWidth: 700,
        //           transition: "0.3s",
        //           margin: "auto",
        //           borderRadius: "10px",
        //           fontWeight: "bolder",
        //           wordWrap: "break-word",
        //           padding: "20px",
        //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        //           "&:hover": {
        //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        //           },
        //         }}
        //       >
        //         <CardContent>
        //           <h2 style={{ marginBottom: "5px", color: "#c91c83" }}>
        //             Message
        //           </h2>
        //           <Typography
        //             style={{
        //               fontWeight: "bold",
        //               color: "#40559b",
        //               wordWrap: "break-word",
        //             }}
        //           >
        //             {rowData.message}
        //           </Typography>
        //         </CardContent>
        //       </Card>
        //     </div>
        //   );
        // }}
        isLoading={enquiries === null || loading}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </>
  );
};

export default Enquiries;
