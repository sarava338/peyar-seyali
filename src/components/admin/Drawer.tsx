import { styled, type CSSObject, type Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

interface DrawerProps {
  open: boolean;
  drawerwidth: number;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerwidth" })<DrawerProps>(
  ({ theme, open, drawerwidth }) => ({
    width: drawerwidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
      ? {
          ...openedMixin(theme, drawerwidth),
          "& .MuiDrawer-paper": openedMixin(theme, drawerwidth),
        }
      : {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
  })
);

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(7)} + 1px)`, // Mini drawer on desktop
  },
});

export default Drawer;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
