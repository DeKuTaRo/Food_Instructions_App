import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TapasIcon from "@mui/icons-material/Tapas";
import BentoIcon from "@mui/icons-material/Bento";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import Link from "@mui/material/Link";

export const mainListItems = (
  <React.Fragment>
    <Link href={"/dashboard"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href={"/user-account"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User account" />
      </ListItemButton>
    </Link>
    <Link href={"/ingredient"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <EmojiFoodBeverageIcon />
        </ListItemIcon>
        <ListItemText primary="Ingredients" />
      </ListItemButton>
    </Link>
    <Link href={"/food"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Food" />
      </ListItemButton>
    </Link>
    <Link href={"/nutrition"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <TapasIcon />
        </ListItemIcon>
        <ListItemText primary="Nutrition" />
      </ListItemButton>
    </Link>
    <Link href={"/recipe"} underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <BentoIcon />
        </ListItemIcon>
        <ListItemText primary="Recipe" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <FoodBankIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TipsAndUpdatesIcon />
      </ListItemIcon>
      <ListItemText primary="Tips" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
