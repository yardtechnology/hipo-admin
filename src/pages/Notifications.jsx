import { Delete, Done, NotificationsTwoTone } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { BASE_URL } from "configs";
import { useAppContext } from "contexts";
import moment from "moment";
import Swal from "sweetalert2";
import { useNotifications } from "../hooks";

const Notifications = () => {
  const { setRealtime, notifications } = useNotifications();
  const { fetchNotifications } = useAppContext();
  const handleAllRead = async () => {
    try {
      const result = await fetch(
        `${BASE_URL}/notifications/marked-as-seen/all`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        }
      );
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({
            icon: "success",
            text: "All notifications have been read",
          })
        : Swal.fire({ icon: "error", text: res.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      fetchNotifications();
      setRealtime((prev) => !prev);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const result = await fetch(`${BASE_URL}/notifications/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: "Deleted All Notifications" })
        : Swal.fire({ icon: "error", text: res.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      fetchNotifications();
      setRealtime((prev) => !prev);
    }
  };

  const readNotification = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/notifications/marked-as-seen`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
        body: JSON.stringify({
          ids: data,
        }),
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: "Marked as seen" })
        : Swal.fire({ icon: "error", text: res.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      fetchNotifications();
      setRealtime((prev) => !prev);
    }
  };
  const deleteNotification = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/notifications`, {
        method: "DELETE",
        body: JSON.stringify({
          ids: data,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const res = await result.json();
      console.log(res);
      result.status === 200
        ? Swal.fire({ icon: "success", text: "Deleted" })
        : Swal.fire({ icon: "error", text: res.message });
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
      console.log(error);
    } finally {
      fetchNotifications();
      setRealtime((prev) => !prev);
    }
  };
  return (
    <>
      {notifications?.length > 0 ? (
        <>
          <div
            style={{
              justifyContent: "right",
              paddingRight: "1.9vh",
              display: "flex",
            }}
          >
            <>
              <Tooltip title="Mark as read all notifications">
                <List>
                  {" "}
                  <IconButton color="primary" onClick={handleAllRead}>
                    <Done sx={{}} />
                  </IconButton>{" "}
                </List>
              </Tooltip>

              <Tooltip title={"Delete all notifications"}>
                <List>
                  <IconButton color="error" onClick={handleDeleteAll}>
                    {" "}
                    <Delete />
                  </IconButton>
                </List>
              </Tooltip>
            </>
          </div>
          {notifications?.map((notification) => (
            <section className="py-1">
              <>
                {" "}
                <Alert
                  severity={notification?.seen ? "success" : "info"}
                  iconMapping={{
                    success: <NotificationsTwoTone fontSize="inherit" />,
                  }}
                  action={
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => readNotification(notification?._id)}
                      >
                        <Done />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteNotification(notification?._id)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <AlertTitle>{notification?.title}</AlertTitle>
                  {notification?.description}{" "}
                  <strong>
                    {moment(notification?.createdAt).format("lll")}
                  </strong>
                </Alert>
              </>
            </section>
          ))}
        </>
      ) : (
        <Grid container justifyContent={"center"}>
          <Grid
            item
            style={{ display: "block", margin: "auto", paddingTop: "12vh" }}
            justifyContent="center"
          >
            <div
              style={{ display: "block", textAlign: "center", margin: "auto" }}
            >
              <IconButton color="primary">
                <NotificationsTwoTone />
              </IconButton>
            </div>
            <Typography>No Notifications Found</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Notifications;
