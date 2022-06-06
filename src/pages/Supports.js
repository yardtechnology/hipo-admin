import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Reply } from "@mui/icons-material";
import {
  //   Avatar,
  Card,
  CardContent,
  IconButton,
  ListItem,
  //   ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { SendReply } from "components/dialog";
import { BASE_URL } from "configs";
import { useSupports } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const Supports = () => {
  const { supports, setRealtime } = useSupports();
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);
  const [loading, setLoading] = useState(false);
  const handleBulkDelete = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/support-form/all`, {
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
            text: "Support Deleted Successfully",
          })
        : Swal.fire({ icon: "error", text: "Something Went Wrong" });
      console.log(res.error.message);
      setLoading(false);
      setRealtime((prev) => !prev);
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Supports"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Supports"),
            },
          ],
        }}
        title={"Supports"}
        // data={
        //   async (query) => {
        //     const data = await fetchSupports(query?.pageSize, query?.page);
        //     console.log(data);
        //     return data === null
        //       ? []
        //       : data?.map((supports) => ({
        //           ...supports,
        //           // createdAt: moment(supports.createdAt).format("DD-MM-YYYY"),
        //           // updatedAt: moment(supports.updatedAt).format("DD-MM-YYYY"),
        //         }));
        //   }

        // }
        data={
          supports === null
            ? []
            : supports.map((supports, i) => ({
                ...supports,
                sl: i + 1,
                timeStamp: moment(supports.createdAt).format("lll"),
                // createdAt: moment(supports.createdAt).format("DD-MM-YYYY"),
                // updatedAt: moment(supports.updatedAt).format("DD-MM-YYYY"),
              }))
        }
        isLoading={loading === true}
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
            field: "email",
            render: ({ photoURL, displayName, phoneNumber, email }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  {/* <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={email}
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
            hidden: true,
            export: true,
          },

          {
            title: "User Type",
            field: "type",
            searchable: true,
          },
          {
            title: "Subject",
            field: "title",
            searchable: true,
          },
          {
            title: "Message",
            field: "message",
            searchable: true,
            render: ({ message }) =>
              message?.length > 10 ? message?.slice(0, 7) + "..." : message,
            export: false,
          },
          {
            title: "Message",
            field: "message",
            searchable: true,
            hidden: true,
            export: true,
          },

          {
            title: "Timestamp",
            searchable: true,
            field: "timeStamp",
            render: ({ createdAt }) => moment(createdAt).format("lll"),
            export: true,
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
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(
                `${BASE_URL}/support-form/${oldData?._id}`,
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
            tooltip: "Delete selected supports",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(
                data.map((data) => data?._id),
                setRealtime((prev) => !prev)
              ),
          },
        ]}
        detailPanel={({ rowData }) => {
          return (
            <div
              style={{
                padding: "20px",
                margin: "auto",
                backgroundColor: "#eef5f9",
              }}
            >
              <Card
                sx={{
                  minWidth: 275,
                  maxWidth: 700,
                  transition: "0.3s",
                  margin: "auto",
                  borderRadius: "10px",
                  fontWeight: "bolder",
                  wordWrap: "break-word",
                  padding: "20px",
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent>
                  <h2 style={{ marginBottom: "5px", color: "#c91c83" }}>
                    Message
                  </h2>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "#40559b",
                      wordWrap: "break-word",
                    }}
                  >
                    {rowData.message}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </>
  );
};

export default Supports;
