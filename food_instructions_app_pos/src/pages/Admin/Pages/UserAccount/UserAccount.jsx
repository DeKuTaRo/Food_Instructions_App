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

// Generate Order Data
function createData(id, dateCreate, userName) {
  return { id, dateCreate, userName };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley"),
  createData(1, "16 Mar, 2019", "Paul McCartney"),
  createData(2, "16 Mar, 2019", "Tom Scholz"),
  createData(3, "16 Mar, 2019", "Michael Jackson"),
  createData(4, "15 Mar, 2019", "Bruce Springsteen"),
];

function preventDefault(event) {
  event.preventDefault();
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserAccount() {
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
                      <TableCell>Date create</TableCell>
                      <TableCell>User Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.dateCreate}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
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
