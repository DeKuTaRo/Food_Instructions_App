import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";

import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";
function LoginClient() {
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

        <Box sx={{ pl: 3, width: "80%" }}>
          <Box sx={{ color: "black", fontSize: "2.8rem", fontWeight: 700, margin: "28px 0px" }}>Login</Box>
          <div style={{ fontSize: "24px" }}>
            <p>Browse Just One Cookbook with NO Ads! Learn more about JOC PLUS here.</p>
            <p>Enter your username and password below.</p>
          </div>

          <Box sx={{ display: "flex", alignItems: "center", width: "88%" }}>
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "96px",
                  margin: "12px 0px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                <p>Username</p>
                <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                  margin: "12px 0px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                <p>Password</p>
                <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  margin: "12px 0px",
                }}>
                <div
                  style={{ display: "flex", gap: "76px ", alignItems: "center", width: "100%", marginLeft: "-16px" }}>
                  <FormControlLabel
                    color="success"
                    labelPlacement="start"
                    label="Remember me"
                    control={<Checkbox defaultChecked />}
                  />{" "}
                  <Button variant="outlined">Login</Button>
                </div>
                
                <Link style={{ marginLeft: "214px" }} href={"/forgot-password"}>
                  Forgot password
                </Link>
                
                <div style={{ marginLeft: "214px", display:"flex", gap:"4px"}}>
                <p>Create an account at </p> 
                <Link  href={"/sign-up"}>Sign Up</Link>
                </div>
               
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default LoginClient;
