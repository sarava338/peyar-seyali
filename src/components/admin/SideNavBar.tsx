import { Divider, IconButton, List, Tooltip } from "@mui/material";

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
          <Tooltip title="Names" placement="bottom">
            <DashBoardListItem
              open={open}
              pageName="Names"
              path="/admin/names"
              handleDrawerClose={handleDrawerClose}
              icon={<ArticleIcon />}
            />
          </Tooltip>

          <Divider />

          <Tooltip title="Tags" placement="bottom">
            <DashBoardListItem open={open} pageName="Tags" path="/admin/tags" handleDrawerClose={handleDrawerClose} icon={<SellIcon />} />
          </Tooltip>

          <Divider />

          <Tooltip title="Categories" placement="bottom">
            <DashBoardListItem
              open={open}
              pageName="Categories"
              path="/admin/categories"
              handleDrawerClose={handleDrawerClose}
              icon={<CategoryIcon />}
            />
          </Tooltip>

          <Divider />
        </List>
      </Drawer>
    </>
  );
}
