import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Reply } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { SendReply } from "components/dialog";
import { BASE_URL } from "configs";
import { useSupports } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
const Contacts = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers);
  const { supports, setRealtime } = useSupports();
  console.log(supports);
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/support/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          supportIds: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: res.success.message })
        : Swal.fire({ icon: "error", text: res.error.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  return (
    <div style={{ marginTop: "2vh" }}>
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
        data={
          supports === null
            ? []
            : supports?.map((support, i) => ({
                ...support,
                sl: i + 1,
                // firstName: support?.user?.firstName,
                // lastName: support?.user?.lastName,
                // email: support?.user?.email,
                currentTimestamp: moment(support?.timestamp).format("lll"),
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
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
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/support/delete`, {
                method: "DELETE",
                body: JSON.stringify({
                  supportIds: [oldData?._id],
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await result.json();
              console.log(res);
              result.status === 200
                ? Swal.fire({ icon: "success", text: res.success.message })
                : Swal.fire({ icon: "error", text: res.error.message });
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
            tooltip: "Delete all selected users",
            icon: "delete",
            onClick: (evt, data) =>
              handleBulkDelete(data.map((data) => data?._id)),
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
        isLoading={supports === null}
      />
      <SendReply
        selectedUsers={selectedUsers}
        handleClose={() => setSelectedUsers({})}
      />
    </div>
  );
};

export default Contacts;
