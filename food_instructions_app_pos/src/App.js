import Pages from "./pages/Pages";
import Categories from "./components/Categories";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Box from "@mui/material/Box";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Box>
          {/* <Search /> */}
          {/* <Categories /> */}
          <Pages />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
