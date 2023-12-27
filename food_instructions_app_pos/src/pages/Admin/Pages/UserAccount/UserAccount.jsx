import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { toast } from "react-toastify";
import withAuthorization from "../../utils/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function UserAccount() {
  const [allAccounts, setAllAccounts] = React.useState({ accounts: [] });
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const getAllAccounts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/getAllAccounts`, {
      headers: {
        Authorization: `Bearer ${tokenAdmin}`,
      },
    });
    setAllAccounts(response.data);
  };
  React.useEffect(() => {
    getAllAccounts();
  }, []);

  const handleChangeAdminRole = async (_id, isChecked) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/changeAdminStatus/${_id}`,
        {
          isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Dữ liệu được cập nhật thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Có lỗi xảy ra", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setAllAccounts(response.data);
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderWithSidebar title="User account" />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <React.Fragment>
                <Title>Recent Orders</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>CheckAdmin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allAccounts.accounts.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Checkbox
                            onClick={(e) => handleChangeAdminRole(user._id, e.target.checked)}
                            checked={user.isAdmin || false}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link color="primary" href="#" sx={{ mt: 3 }}>
                  See more orders
                </Link>
              </React.Fragment>{" "}
            </Paper>{" "}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default withAuthorization(UserAccount);
