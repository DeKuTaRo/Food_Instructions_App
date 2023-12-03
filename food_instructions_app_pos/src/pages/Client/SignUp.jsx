import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { motion } from "framer-motion";

import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";
function SignUp() {
  return (
    <motion.div>
  <div style={{  margin: "0% 10%"  }}>
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
          <Box sx={{ color: "black", fontSize: "2.8rem", fontWeight: 700, margin: "28px 12px " }}>Sign Up</Box>
          <div style={{ fontSize: "24px", marginLeft:"12px" }}>
            <p>You need to fill in the information to <b>register</b> </p>
            
          </div>

          <Box sx={{ display: "flex", alignItems: "center", width: "88%" }}>
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column",width:"100vh", margin:"" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "28px",
                  margin: "12px 12px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  
                }}>
                 <TextField fullWidth id="outlined-basic" label="First Name *" variant="outlined" />
                 <TextField fullWidth id="outlined-basic" label="Last Name *" variant="outlined" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                  margin: "12px 12px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                <TextField fullWidth id="outlined-basic" label="Email Address *" variant="outlined" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                  margin: "12px 12px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                <TextField fullWidth id="outlined-basic" label="Password *" variant="outlined" />
              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                  margin: "12px 12px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                <TextField fullWidth id="outlined-basic" label="Con *" variant="outlined" />
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
                  style={{ display: "flex", gap: "76px ", alignItems: "center", width: "100%", marginLeft: "10px" }}>
                  <FormControlLabel
                    color="success"
                    labelPlacement="end"
                    label="Are you sure of the above information
"
                    control={<Checkbox defaultChecked />}
                  />{" "}
                 
                </div>
                <div style={{display:"flex" ,justifyContent:"center",alignItems:"center",width:"97% ",margin:"12px"}}>
                    <Button  variant="contained" style={{width:"100%",padding:"12px"}}>Register</Button>
                </div>
                
                
                
               <div style={{display:"flex", gap:"8px",margin:"12px 12px" }}>

               
                <p>Have an account ? </p> 
                <Link  href={"/login-plus"}>Login</Link>
                </div>
               
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
    </motion.div>
  
  );
}

export default SignUp;
