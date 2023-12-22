import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

function RecipeDialog({ open, handleClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [cuisine, setCumisine] = useState("");
  const [meal, setMeal] = useState("");
  const [dish, setDish] = useState("");

  const formData = {
    name: name,
    link: link,
    linkImage: linkImage,
    diet: diet,
    health: health,
    cuisine: cuisine,
    meal: meal,
    dish: dish,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${process.env.REACT_APP_URL_RECIPE_SERVICE}/recipe/add`, formData).then((res) => {
        if (res.statusText === "OK") {
          toast.success("Add successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          handleClose();
        } else {
          toast.error("Error occurred", {
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
      });
    } catch (error) {
      toast.error(error, {
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
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Food form</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name_recipe"
                  label="Name"
                  type="text"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputLabel htmlFor="descFood">Link recipe</InputLabel>
                <TextareaAutosize
                  id="link_recipe"
                  placeholder="Link recipe"
                  minRows={3}
                  style={{ width: "100%", padding: "0.5rem" }}
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <InputLabel htmlFor="descFood">Link image</InputLabel>
                <TextareaAutosize
                  id="link_image_recipe"
                  placeholder="Link Image"
                  minRows={3}
                  style={{ width: "100%", padding: "0.5rem" }}
                  name="linkImage"
                  value={linkImage}
                  onChange={(e) => setLinkImage(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="label_diet_recipe">Diet</InputLabel>
                  <Select
                    labelId="label_diet_recipe"
                    id="diet_recipe"
                    value={diet}
                    label="Diet"
                    onChange={(e) => setDiet(e.target.value)}>
                    <MenuItem value={"balanced"}>balanced</MenuItem>
                    <MenuItem value={"high-fiber"}>high-fiber</MenuItem>
                    <MenuItem value={"high-protein"}>high-protein</MenuItem>
                    <MenuItem value={"low-carb"}>low-carb</MenuItem>
                    <MenuItem value={"low-fat"}>low-fat</MenuItem>
                    <MenuItem value={"low-sodium"}>low-sodium</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="label_recipe_health">Health</InputLabel>
                  <Select
                    labelId="label_recipe_health"
                    id="health_recipe"
                    value={health}
                    label="Health"
                    onChange={(e) => setHealth(e.target.value)}>
                    <MenuItem value={"alcohol-cocktail"}>alcohol-cocktail</MenuItem>
                    <MenuItem value={"alcohol-free"}>alcohol-free</MenuItem>
                    <MenuItem value={"celery-free"}>celery-free</MenuItem>
                    <MenuItem value={"crustacean-free"}>crustacean-free</MenuItem>
                    <MenuItem value={"dairy-free"}>dairy-free</MenuItem>
                    <MenuItem value={"DASH"}>DASH</MenuItem>
                    <MenuItem value={"egg-free"}>egg-free</MenuItem>
                    <MenuItem value={"fish-free"}>fish-free</MenuItem>
                    <MenuItem value={"fodmap-free"}>fodmap-free</MenuItem>
                    <MenuItem value={"gluten-free"}>gluten-free</MenuItem>
                    <MenuItem value={"immuno-supportive"}>immuno-supportive</MenuItem>
                    <MenuItem value={"keto-friendly"}>keto-friendly</MenuItem>
                    <MenuItem value={"kidney-friendly"}>kidney-friendly</MenuItem>
                    <MenuItem value={"kosher"}>kosher</MenuItem>
                    <MenuItem value={"low-fat-abs"}>low-fat-abs</MenuItem>
                    <MenuItem value={"low-potassium"}>low-potassium</MenuItem>
                    <MenuItem value={"low-sugar"}>low-sugar</MenuItem>
                    <MenuItem value={"lupine-free"}>lupine-free</MenuItem>
                    <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
                    <MenuItem value={"mollusk-free"}>mollusk-free</MenuItem>
                    <MenuItem value={"mustard-free"}>mustard-free</MenuItem>
                    <MenuItem value={"no-oid-added"}>no-oid-added</MenuItem>
                    <MenuItem value={"paleo"}>paleo</MenuItem>
                    <MenuItem value={"peanut-free"}>peanut-free</MenuItem>
                    <MenuItem value={"pescatarian"}>pescatarian</MenuItem>
                    <MenuItem value={"pork-free"}>pork-free</MenuItem>
                    <MenuItem value={"red-meat-free"}>red-meat-free</MenuItem>
                    <MenuItem value={"sesame-free"}>sesame-free</MenuItem>
                    <MenuItem value={"shellfish-free"}>shellfish-free</MenuItem>
                    <MenuItem value={"soy-free"}>soy-free</MenuItem>
                    <MenuItem value={"sugar-conscious"}>sugar-conscious</MenuItem>
                    <MenuItem value={"sulfite-free"}>sulfite-free</MenuItem>
                    <MenuItem value={"tree-nut-free"}>tree-nut-free</MenuItem>
                    <MenuItem value={"vegan"}>vegan</MenuItem>
                    <MenuItem value={"vegetarian"}>vegetarian</MenuItem>
                    <MenuItem value={"wheat-free"}>wheat-free</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="label_cuisine_recipe">Cuisine Type</InputLabel>
                  <Select
                    labelId="label_cuisine_recipe"
                    id="recipe_cuisine"
                    value={cuisine}
                    label="Cuisine"
                    onChange={(e) => setCumisine(e.target.value)}>
                    <MenuItem value={"American"}>American</MenuItem>
                    <MenuItem value={"Asian"}>Asian</MenuItem>
                    <MenuItem value={"British"}>British</MenuItem>
                    <MenuItem value={"Caribbean"}>Caribbean</MenuItem>
                    <MenuItem value={"Central Europe"}>Central Europe</MenuItem>
                    <MenuItem value={"Chinese"}>Chinese</MenuItem>
                    <MenuItem value={"Eastern Europe"}>Eastern Europe</MenuItem>
                    <MenuItem value={"French"}>French</MenuItem>
                    <MenuItem value={"Indian"}>Indian</MenuItem>
                    <MenuItem value={"Italian"}>Italian</MenuItem>
                    <MenuItem value={"Japanese"}>Japanese</MenuItem>
                    <MenuItem value={"Kosher"}>Kosher</MenuItem>
                    <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
                    <MenuItem value={"Mexican"}>Mexican</MenuItem>
                    <MenuItem value={"Middle Eastern"}>Middle Eastern</MenuItem>
                    <MenuItem value={"Nordic"}>Nordic</MenuItem>
                    <MenuItem value={"South American"}>South American</MenuItem>
                    <MenuItem value={"South East Asian"}>South East Asian</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="label_meal_recipe">Meal Type</InputLabel>
                  <Select
                    labelId="label_meal_recipe"
                    id="recipe_meal"
                    value={meal}
                    label="Meal"
                    onChange={(e) => setMeal(e.target.value)}>
                    <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                    <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    <MenuItem value={"Lunch"}>Lunch</MenuItem>
                    <MenuItem value={"Snack"}>Snack</MenuItem>
                    <MenuItem value={"Teatime"}>Teatime</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="label_dish_recipe">Dish Type</InputLabel>
                  <Select
                    labelId="label_dish_recipe"
                    id="recipe_dish"
                    value={dish}
                    label="Dish"
                    onChange={(e) => setDish(e.target.value)}>
                    <MenuItem value={"Biscuits and cookies"}>Biscuits and cookies</MenuItem>
                    <MenuItem value={"Bread"}>Bread</MenuItem>
                    <MenuItem value={"Cereals"}>Cereals</MenuItem>
                    <MenuItem value={"Condiments and sauces"}>Condiments and sauces</MenuItem>
                    <MenuItem value={"Desserts"}>Desserts</MenuItem>
                    <MenuItem value={"Drinks"}>Drinks</MenuItem>
                    <MenuItem value={"Main course"}>Main course</MenuItem>
                    <MenuItem value={"Pancake"}>Pancake</MenuItem>
                    <MenuItem value={"Preps"}>Preps</MenuItem>
                    <MenuItem value={"Preserve"}>Preserve</MenuItem>
                    <MenuItem value={"Salad"}>Salad</MenuItem>
                    <MenuItem value={"Sandwiches"}>Sandwiches</MenuItem>
                    <MenuItem value={"Side dish"}>Side dish</MenuItem>
                    <MenuItem value={"Soup"}>Soup</MenuItem>
                    <MenuItem value={"Starter"}>Starter</MenuItem>
                    <MenuItem value={"Sweets"}>Sweets</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RecipeDialog;
