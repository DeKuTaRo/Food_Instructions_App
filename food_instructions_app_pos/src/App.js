import Pages from "./pages/Pages";
import Categories from "./components/Categories";
import Headers from "./components/Headers";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Link from "@mui/material/Link";
import { GiKnifeFork } from "react-icons/gi";
import Box from "@mui/material/Box";

function NavBar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Link
        href={"/"}
        sx={{
          pt: 1,
          pb: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: 400,
          fontFamily: "Lobster Two, cursive;;}",
        }}
        underline="none"
        color="inherit">
        <GiKnifeFork style={{ fontSize: "2rem" }} />
        <Box> Travel to Food </Box>
      </Link>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ p: 1, fontSize: "1rem" }}>Recipes</Box>
        <Box sx={{ p: 1, fontSize: "1rem" }}>Categories</Box>
        <Box sx={{ p: 1, fontSize: "1rem" }}>Ingredient</Box>
        <Box sx={{ p: 1, fontSize: "1rem" }}>Tips</Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />
        <NavBar />
        {/* <Search />
        <Categories /> */}
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
