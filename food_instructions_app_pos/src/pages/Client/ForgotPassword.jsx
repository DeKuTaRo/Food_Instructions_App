import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Headers from "../../components/Client/Headers";
import NavBar from "../../components/Client/Navbar";
function ForgotPassword() {
  return (
    <div style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
          position: "absolute",
          left: "-10%",
          right: "-10%",
        }}></Box>
      <Box sx={{ display: "flex", position: "relative", top: "1.5rem", left: "10rem" }}>
        <GiKnifeFork style={{ fontSize: "6rem" }} />

        <Box sx={{ pl: 3 }}>
          <Box sx={{ color: "black", fontSize: "2rem", fontWeight: 700 }}>Forgot Password</Box>
          <Box sx={{ mt: 8 }}>
            <p>Forgot your password? Enter your email address below to reset:</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <TextField id="outlined-basic" label="Email" variant="outlined" />
              <Button variant="outlined">Submit</Button>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ForgotPassword;
