import { Typography } from "@mui/material";

const VideoTutorial = ({ videoId }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "2rem" }}>
        Video tutorials
      </Typography>

      <iframe
        width="90%"
        height="400 rem"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </>
  );
};
export default VideoTutorial;
