import {
  AppBar,
  MenuList,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemButton,
  ListItem,
} from "@mui/material";

import {
  Dashboard,
  AccountBalanceWallet,
  AttachMoney,
  Feed,
  Person,
  Contacts,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { LEFT_NAV_MENU } from "../Utils/Constants";

import "../Styles/Navbars.scss";

const menuItemIcons = {
  [LEFT_NAV_MENU[0].key]: Dashboard,
  [LEFT_NAV_MENU[1].key]: AccountBalanceWallet,
  [LEFT_NAV_MENU[2].key]: AttachMoney,
  [LEFT_NAV_MENU[3].key]: Feed,
  [LEFT_NAV_MENU[4].key]: Person,
  [LEFT_NAV_MENU[5].key]: Contacts,
};

export default function LeftNavbar() {
  const navigate = useNavigate();

  const handleMenuClick = (e, menuItemKey) => {
    navigate(`/${menuItemKey}`);
  };

  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        bgcolor: "white",
        color: "black",
        height: "100%",
        width: "100%",
      }}
    >
      <MenuList
        sx={{
          padding: 0,
        }}
      >
        {LEFT_NAV_MENU.map((item) => {
          const MenuItemIcon = menuItemIcons[item.key];
          console.log("my path", window.location.pathname);
          const activeMenuClass =
            window.location.pathname.includes(item.key) ||
            (window.location.pathname === "/" && item.key === "dashboard")
              ? "active-menu-item"
              : "";

          return (
            <ListItem
              className={`left-nav-list ${activeMenuClass}`}
              disablePadding
              component={"nav"}
              key={item.key}
              onClick={(e) => handleMenuClick(e, item.key)}
            >
              <ListItemButton style={{ paddingLeft: 28 }}>
                <ListItemIcon sx={{ minWidth: 0, marginRight: "20px" }}>
                  <MenuItemIcon
                    fontSize="small"
                    color="secondary"
                    style={{ ...(activeMenuClass ? { color: "white" } : {}) }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="h6"
                    style={{ ...(activeMenuClass ? { color: "white" } : {}) }}
                  >
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </MenuList>
    </AppBar>
  );
}
