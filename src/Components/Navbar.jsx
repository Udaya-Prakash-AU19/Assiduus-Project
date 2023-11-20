import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  TextField,
  Toolbar,
} from "@mui/material";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";

import { useState } from "react";
import "../Styles/Navbars.scss";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const handleDropdownOpen = (e) => {
    setAvatarAnchorEl(e.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setAvatarAnchorEl(null);
    setShowDropdown(!showDropdown);
  };

  return (
    <AppBar position="relative" elevation={0} sx={{ zIndex: 99 }}>
      <Toolbar className="top-navbar">
        <img
          src={require("../Images/Assiduus_Global_Logo1.jpg")}
          alt="Assiduus logo"
          width={150}
          height={45}
        />
        <Box className="top-nav-box">
          <TextField
            id="search-field"
            size="small"
            className="search-field"
            variant="standard"
            // Another way to apply style to the inbuilt components
            // sx={{
            //   "& fieldset": { border: "none" },
            // }}
            sx={{
              px: 1,
              py: 0.5,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <Badge
            overlap="circular"
            color="success"
            variant="dot"
            badgeContent=" "
          >
            <Notifications
              sx={{
                color: "black",
              }}
            />
          </Badge>
          <Button onClick={(e) => handleDropdownOpen(e)}>
            <Avatar
              src={require("../Images/girl_pic.jpg")}
              alt="Girl proile pic"
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
            <ArrowDropDown
              sx={{
                color: "black",
              }}
            />
          </Button>
          <Popover
            id="proile-dropdodwn"
            open={showDropdown}
            anchorEl={avatarAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            onClose={handleDropdownClose}
          >
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Avatar"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Favourites"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Settings"></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Log out"></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
