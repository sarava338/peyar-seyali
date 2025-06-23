import { Divider, IconButton, List } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
          <DashBoardListItem open={open} pageName="Names" path="/admin/names" />
          <DashBoardListItem open={open} pageName="Add Name" path="/admin/names/add" />

          <Divider />

          <DashBoardListItem open={open} pageName="Tags" path="/admin/tags" />
          <DashBoardListItem open={open} pageName="Add Tag" path="/admin/tags/add" />

          <Divider />
        </List>
      </Drawer>
    </>
  );
}
