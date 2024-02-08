import { Typography, Stack } from "@mui/material";
import { MdBreakfastDining, MdBrunchDining, MdDining, MdDinnerDining, MdKebabDining } from "react-icons/md";

const Meal = ({ mealType }) => {
  const handleMealType = (mealType) => {
    if (mealType === "breakfast") {
      return <MdBreakfastDining />;
    }
    if (mealType === "brunch") {
      return <MdBrunchDining />;
    }
    if (mealType === "lunch/dinner") {
      return <MdDining />;
    }
    if (mealType === "snack") {
      return <MdDinnerDining />;
    }
    if (mealType === "teatime") {
      return <MdKebabDining />;
    }
  };
  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
      <Typography variant="h5">Meal: </Typography>
      <Typography variant="h5">
        {handleMealType(mealType.join(","))} {mealType.join(",")}
      </Typography>
    </Stack>
  );
};
export default Meal;
