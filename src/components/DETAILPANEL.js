import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { BASE_URL } from "configs";
import { useIsMounted } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DETAILPANEL = (rowData) => {
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);
  const [reviews, setReviews] = useState(null);
  const handleBulkDelete = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/review/delete`, {
        method: "PUT",
        body: JSON.stringify({
          artistId: rowData?.rowData?._id,
          reviewIds: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      res?.status === 200
        ? Swal.fire({ icon: "success", text: res?.success?.message })
        : Swal.fire({ icon: "error", text: res.error.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      setRealtime((prev) => !prev);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      if (!isMounted.current) return;

      try {
        const response = await fetch(
          `${BASE_URL}/review/all-review/${rowData?.rowData?._id}`,
          {
            // method: "GET",
            // body: JSON.stringify({ ...values }),
            // headers: {
            //   "Content-Type": "application/json",
            // },
          }
        );
        const arr = await response.json();
        console.log(arr);

        const sortArr = arr?.success?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setReviews(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [isMounted, rowData?.rowData?._id, realtime]);

  return (
    <div
      style={{
        padding: "20px",
        margin: "auto",
        backgroundColor: "#eef5f9",
      }}
    >
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
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "Customers"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "Customers"),
            },
          ],
        }}
        title={`Reviews of ${rowData?.rowData?.firstName} ${rowData?.rowData?.lastName}`}
        data={
          reviews === null
            ? []
            : reviews?.map((support, i) => ({
                ...support,
                sl: i + 1,
                firstName: support?.user?.firstName,
                lastName: support?.user?.lastName,
                email: support?.user?.email,
              }))
        }
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
          },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            width: "40%",
            field: "firstName",
            render: ({
              profileImageUrl,
              firstName,
              lastName,
              email,
              phoneNumber,
            }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={profileImageUrl} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="span" variant="body2">
                        {firstName + " " + lastName || "Not Provided"}
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
                        {/* {phoneNumber || "Not Provided"} */}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          //   {
          //     title: "First Name",
          //     field: "firstName",
          //   },
          //   {
          //     title: "Last Name",
          //     field: "lastName",
          //   },
          //   {
          //     title: "Email",
          //     field: "email",
          //   },
          {
            title: "Ratings",
            field: "ratings",
          },
          {
            title: "Title",
            field: "title",
          },
          {
            title: "Message",
            field: "description",
            render: ({ description }) =>
              description?.length > 10
                ? description?.slice(0, 7) + "..."
                : description,
          },

          {
            title: "TimeStamp",
            field: "timestamp",
            editable: "never",
            render: ({ timestamp }) => moment(timestamp).format("lll"),
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            try {
              const result = await fetch(`${BASE_URL}/review/delete`, {
                method: "PUT",
                body: JSON.stringify({
                  artistId: rowData?.rowData?._id,
                  reviewIds: [oldData?._id],
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
                    {rowData?.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }}
        isLoading={reviews === null}
      />
    </div>
  );
};

export default DETAILPANEL;
