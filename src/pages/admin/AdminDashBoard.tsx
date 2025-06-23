import { useState, type ReactNode } from "react";

import { Box, CssBaseline } from "@mui/material";

import Header from "../../components/admin/Header";
import SideNavBar from "../../components/admin/SideNavBar";
import { DrawerHeader } from "../../components/admin/Drawer";

export default function AdminDashBoard({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DRAWER_WIDTH = 240;

  return (
    <Box sx={{ display: "flex" }} component="section">
      <CssBaseline />

      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={DRAWER_WIDTH}
      />
      <SideNavBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={DRAWER_WIDTH}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Welcome to Admin Dashboard</h1>
        {children}
      </Box>
    </Box>
  );
}
