import { Delete, Done, NotificationsTwoTone } from "@mui/icons-material";
import { Alert, AlertTitle, Grid, IconButton, Typography } from "@mui/material";
import { BASE_URL } from "configs";
import moment from "moment";
import Swal from "sweetalert2";
import { useNotifications } from "../hooks";

const Notifications = () => {
  const { notifications, setRealtime } = useNotifications();
  console.log(notifications);
  const readNotification = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/notification/make-read`, {
        method: "PUT",
        body: JSON.stringify({
          notificationIds: data,
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
  const deleteNotification = async (data) => {
    try {
      const result = await fetch(`${BASE_URL}/notification/delete`, {
        method: "PUT",
        body: JSON.stringify({
          notificationIds: data,
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
    <>
      {notifications.length === 0 ? (
        notifications.map((notification) => (
          <section className="py-1">
            <>
              {" "}
              <Alert
                severity={notification.isRead ? "success" : "info"}
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
                <strong>{moment(notification?.timestamp).format("lll")}</strong>
              </Alert>
            </>
          </section>
        ))
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
