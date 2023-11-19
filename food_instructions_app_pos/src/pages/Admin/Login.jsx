import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";

function Login() {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
        }}></Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <GiKnifeFork style={{ fontSize: "6rem" }} />

        <Box sx={{ pl: 3 }}>
          <Box sx={{ color: "black", fontSize: "2rem", fontWeight: 700 }}>Login ADMIN</Box>
          <Box sx={{ mt: 8 }}>
            <p>Browse Just One Cookbook with NO Ads! Learn more about JOC PLUS here.</p>
            <p>Enter your username and password below.</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p>Username</p>
              <TextField id="outlined-basic" label="Username" variant="outlined" />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p>Password</p>
              <TextField id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <div style={{ display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "space-between" }}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />{" "}
              <Button variant="outlined">Login</Button>
              <Link href={"/forgot-password"}>Forgot password</Link>
            </div>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
        }}></Box>
    </div>
  ); 
}

export default Login;
