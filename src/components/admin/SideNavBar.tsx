import { Divider, IconButton, List } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArticleIcon from "@mui/icons-material/Article";
import SellIcon from "@mui/icons-material/Sell";
import CategoryIcon from "@mui/icons-material/Category";

import DashBoardListItem from "./DashBoardListItem";
import Drawer, { DrawerHeader } from "./Drawer";

interface SideNavBarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerClose: () => void;
}

export default function SideNavBar({ open, drawerWidth, handleDrawerClose }: SideNavBarProps) {
  return (
    <>
      <Drawer variant="permanent" open={open} component="nav" drawerwidth={drawerWidth}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <DashBoardListItem
            open={open}
            pageName="Names"
            path="/admin/names"
            handleDrawerClose={handleDrawerClose}
            icon={<ArticleIcon />}
          />

          <Divider />

          <DashBoardListItem open={open} pageName="Tags" path="/admin/tags" handleDrawerClose={handleDrawerClose} icon={<SellIcon />} />

          <Divider />

          <DashBoardListItem
            open={open}
            pageName="Categories"
            path="/admin/categories"
            handleDrawerClose={handleDrawerClose}
            icon={<CategoryIcon />}
          />

          <Divider />
        </List>
      </Drawer>
    </>
  );
}
