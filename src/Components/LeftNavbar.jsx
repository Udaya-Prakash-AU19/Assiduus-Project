import {
  AppBar,
  MenuList,
  ListItemIcon,
  ListItemText,
  Typography,
  List,
  ListItemButton,
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

  console.log({ checkLocation: window.location });

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        width: "200px",
        bgcolor: "white",
        color: "black",
        height: "100vh",
      }}
    >
      <MenuList
        sx={{
          padding: 0,
        }}
      >
        {LEFT_NAV_MENU.map((item) => {
          const MenuItemIcon = menuItemIcons[item.key];
          const activeMenuClass = window.location.pathname.includes(item.key)
            ? "active-menu-item"
            : "";

          return (
            <List
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
            </List>
          );
        })}
      </MenuList>
    </AppBar>
  );
}
