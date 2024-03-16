import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Container,
  Paper,
  CssBaseline,
  TextField,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";
import Title from "../../Title";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import withAuthorization from "../../utils/auth";
import useDebounce from "../../../../utils/debounce";
import { toast } from "react-toastify";
import AvatarDefault from "../../../../images/avatar.png";

const TruncatedTableCell = ({ text, maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <TableCell style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{truncatedText}</TableCell>
  );
};

const defaultTheme = createTheme();

function ATopic() {
  const [allTopicData, setAllTopicData] = useState({ topics: [] });

  const [searchTopic, setSearchTopic] = useState("");

  const searchTopicDebounce = useDebounce(searchTopic, 1000);
  const getTopicDatas = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/getData`, {
        params: {
          searchTopicDebounce: searchTopicDebounce,
        },
      });
      setAllTopicData(response.data);
    } catch (err) {
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
  };

  useEffect(() => {
    getTopicDatas();
  }, []);

  const handleDeleteTopic = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/deleteTopic`, {
        params: {
          id: id,
        },
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getTopicDatas();
      }
    } catch (err) {
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
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <HeaderWithSidebar title="Topic" />

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
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <React.Fragment>
                  <Title>
                    <Button variant="outlined" href="/a-topic/topics/0">
                      Add new <AddIcon />
                    </Button>
                    <TextField
                      label="Search title"
                      placeholder="Enter title here ..."
                      value={searchTopic}
                      onChange={(e) => setSearchTopic(e.target.value)}
                    />
                    <Button variant="outlined" onClick={getTopicDatas}>
                      Search <SearchIcon />
                    </Button>
                  </Title>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>History</TableCell>
                        <TableCell>Fills</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Manipulation</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allTopicData.topics &&
                        allTopicData.topics.map((row, index) => (
                          <TableRow key={row._id}>
                            <TableCell>
                              <img
                                style={{ width: "11rem", height: "11rem", objectFit: "contain" }}
                                // src={`${process.env.REACT_APP_URL_TOPIC_SERVICE}/${row.mainImage}`}
                                src={
                                  row.mainImage !== ""
                                    ? `${process.env.REACT_APP_URL_TOPIC_SERVICE}/${row.mainImage}`
                                    : `${AvatarDefault}`
                                }
                                alt={row.title}
                              />
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TruncatedTableCell text={row.description} maxLength={100} />
                            <TruncatedTableCell text={row.history} maxLength={100} />
                            <TruncatedTableCell text={row.fills} maxLength={100} />
                            <TruncatedTableCell text={row.type} maxLength={100} />
                            <TableCell>
                              <Button variant="outlined" href={`/a-topic/topics/${row._id}`}>
                                <EditIcon />
                              </Button>
                              <Button variant="outlined" onClick={() => handleDeleteTopic(row._id)}>
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </React.Fragment>
              </Paper>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </motion.div>
  );
}

export default withAuthorization(ATopic);
