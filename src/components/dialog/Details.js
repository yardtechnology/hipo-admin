import { Cancel } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import moment from "moment";
const Details = ({ selectedDetails, handleClose }) => {
  console.log(selectedDetails);

  //   const sendREPLY = () => {};

  return (
    <>
      <Dialog
        open={Boolean(selectedDetails?._id)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ color: "#c91c83" }}>
          {selectedDetails.role === "artist"
            ? "Artist Information"
            : selectedDetails.role === "manager"
            ? "Manager Information"
            : ""}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            {" "}
            <b> Category: </b>
            <Typography component={"span"}>
              {selectedDetails?.category?.title || "Not Provided"}
            </Typography>
          </Typography>

          <Typography sx={{ marginTop: "2vh" }}>
            {" "}
            <b>Sub Category: </b>
            <Typography component={"span"}>
              {selectedDetails?.subcategories?.length > 0
                ? selectedDetails?.subcategories?.map((genre) => (
                    <>
                      <Chip
                        sx={{ mr: 1 }}
                        label={genre.title}
                        color="success"
                        variant="outlined"
                      />
                    </>
                  ))
                : "Not Provided"}
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "1vh" }}>
            {" "}
            <b>Genres: </b>
            <Typography component={"span"}>
              {selectedDetails?.genres?.length > 0
                ? selectedDetails?.genres?.map((genre) => (
                    <>
                      <Chip
                        label={genre.title}
                        color="warning"
                        variant="outlined"
                      />
                    </>
                  ))
                : "Not Provided"}
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "1vh" }}>
            {" "}
            <b>Languages: </b>
            <Typography component={"span"}>
              {selectedDetails?.languages?.length > 0
                ? selectedDetails?.languages?.map((genre) => (
                    <>
                      <Chip
                        sx={{ mr: 1 }}
                        label={genre.languageName}
                        color="primary"
                        variant="outlined"
                      />
                    </>
                  ))
                : "Not Provided"}
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "2vh" }}>
            {" "}
            <b>Dob: </b>
            <Typography component={"span"}>
              {selectedDetails?.Dob
                ? moment(selectedDetails?.Dob).format("lll")
                : "Not Provided"}
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "0vh" }}>
            {" "}
            <Typography component={"span"} sx={{ display: "flex" }}>
              <>
                <List sx={{ marginLeft: 0, paddingLeft: 0 }}>
                  <b>Events:</b>
                  {selectedDetails?.events?.length > 0 ? (
                    <Grid container spacing={1} sx={{ marginTop: "1vh" }}>
                      {selectedDetails?.events?.map((genre) => (
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <ListItem
                            sx={{ paddingLeft: 0, display: "flex" }}
                            alignItems="flex-start"
                          >
                            <ListItemAvatar
                              sx={{ marginTop: 0, display: "inline" }}
                            >
                              {/* <b>Events: </b> */}

                              <Avatar alt="Remy Sharp" src={genre?.iconUrl} />
                            </ListItemAvatar>
                            <ListItemText
                              sx={{ marginTop: 0, display: "inline" }}
                              primary={genre?.eventName}
                              secondary={
                                <>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {moment(genre?.timestamp).format("lll")}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    "Not Provided"
                  )}
                </List>
              </>
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "0vh" }}>
            {" "}
            <Typography component={"span"}>
              <>
                <b>Event Images:</b>
                {selectedDetails?.artistMedia?.artistPhotos?.length > 0 ? (
                  <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                    {" "}
                    {selectedDetails?.events?.map((genre) => (
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        {" "}
                        <Avatar
                          alt="Remy Sharp"
                          src={genre?.imageUrl}
                          variant="square"
                          sx={{ width: 250, height: 100 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  "Not Provided"
                )}
              </>
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "2.5vh" }}>
            {" "}
            <Typography component={"span"}>
              <>
                <b>Artist Photos:</b>
                {selectedDetails?.events?.length > 0 ? (
                  <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                    {" "}
                    {selectedDetails?.artistMedia?.artistPhotos?.map(
                      (genre) => (
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          {" "}
                          <Avatar
                            alt="Remy Sharp"
                            src={genre?.imageUrl}
                            variant="square"
                            sx={{ width: 250, height: 100 }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  "Not Provided"
                )}
              </>
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "2.5vh" }}>
            {" "}
            <Typography component={"span"}>
              <>
                <b>Artist Videos:</b>
                {selectedDetails?.events?.length > 0 ? (
                  <Grid container spacing={1} sx={{ marginTop: "0vh" }}>
                    {" "}
                    {selectedDetails?.artistMedia?.artistVideos?.map(
                      (genre) => (
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          {" "}
                          <Avatar
                            alt="Remy Sharp"
                            src={genre?.videoUrl}
                            variant="square"
                            sx={{ width: 250, height: 100 }}
                          >
                            {" "}
                            {/* <video></video>{" "} */}
                            <iframe
                              width="853"
                              height="480"
                              src={`${genre?.videoUrl}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded youtube"
                            />
                          </Avatar>
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  "Not Provided"
                )}
              </>
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "2.5vh" }}>
            {" "}
            <Typography component={"span"}>
              <>
                <b>Youtube Videos:</b>
                {selectedDetails?.events?.length > 0 ? (
                  <Grid container spacing={2} sx={{ marginTop: "0vh" }}>
                    {selectedDetails?.artistMedia?.youtubeVideos?.map(
                      (genre) => (
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          {" "}
                          <Avatar
                            alt="Remy Sharp"
                            src={genre?.videoUrl}
                            variant="square"
                            sx={{ width: 250, height: 100 }}
                          >
                            {" "}
                            {/* <video></video>{" "} */}
                            {/* <iframe
                              width="560"
                              height="315"
                              src={`https://www.youtube.com/embed/}`}
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe> */}
                            <iframe
                              width="853"
                              height="480"
                              src={`https://www.youtube.com/embed/${genre?.youtubeUrl?.replace(
                                "https://youtu.be/",
                                ""
                              )}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Embedded youtube"
                            />
                          </Avatar>
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  "Not Provided"
                )}
              </>
            </Typography>
          </Typography>
          <Typography sx={{ marginTop: "1vh" }}>
            {" "}
            <b>Bio: </b>
            <Typography component={"span"}>
              {selectedDetails?.bio || "Not Provided"}
            </Typography>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleClose}
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Details;
