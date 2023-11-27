import { Widgets } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  ListItemIcon,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";

export function Navbar(props: any) {
  return (
    <div className="navbar">
      <div className="navbar_top">
        <Container>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            className="navbar_top_txt"
          >
            <Box className={"shop_now"}>
              New sale Season - Up to 20%
              <NavLink to="/products" activeClassName="underline">
                Shop Now
              </NavLink>
            </Box>
            <Box>
              Customer Care Services:
              <span
                style={{
                  color: "#1976d2",
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  textTransform: "uppercase",
                  marginLeft: "12px",
                }}
              >
                +8210 2049 9295
              </span>
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="navbar_bottom">
        <Container>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Box style={{ width: "18%" }}>
              <NavLink
                to="/home"
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/icons/cropped-logo.png"
                  style={{
                    width: "130px",
                    height: "68px",
                    marginTop: "16px",
                    marginBottom: "14px",
                  }}
                />
              </NavLink>
            </Box>
            <Stack
              style={{ width: "50%" }}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              className="navbar_links"
            >
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/products" activeClassName="underline">
                  Shop
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/brand" activeClassName="underline">
                  Brands
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Community
                </NavLink>
              </Box>
              {props.verifiedMemberData ? (
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/member-page" activeClassName="underline">
                    My page
                  </NavLink>
                </Box>
              ) : null}
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/about" activeClassName="underline">
                  About Us
                </NavLink>
              </Box>
            </Stack>
            <Stack
              style={{ width: "23.5%", marginLeft: "5%" }}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Box className="hover-line" flexDirection={"row"}>
                <IconButton
                  aria-label="cart"
                  id="basic-button"
                  aria-controls={undefined}
                  aria-haspopup="true"
                  aria-expanded={undefined}
                >
                  <Badge badgeContent={5} color="secondary">
                    <img
                      src="/auth/shopping-cart.png"
                      style={{ width: "30px" }}
                    />
                  </Badge>
                </IconButton>
              </Box>
              <Box className="hover-line" flexDirection={"row"}>
                <IconButton
                  aria-label="cart"
                  id="basic-button"
                  aria-controls={undefined}
                  aria-haspopup="true"
                  aria-expanded={undefined}
                >
                  <Badge badgeContent={5} color="secondary">
                    <img
                      src="/auth/wish-list.png"
                      style={{ width: "30px", marginLeft: "0px" }}
                    />
                  </Badge>
                </IconButton>
              </Box>

              {!props.verifiedMemberData ? (
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "30px",
                      color: "#ffffff",
                      background: "#ffa600",
                      fontFamily: "Nunito",
                      height: "40px",
                      width: "70px",
                      fontWeight: "900",
                      fontSize: "12px",
                    }}
                    onClick={props.handleLoginOpen}
                  >
                    LogIn
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "30px",
                      color: "#ffffff",
                      background: "#ffa600",
                      fontFamily: "Nunito",
                      height: "40px",
                      width: "110px",
                      fontWeight: "900",
                      fontSize: "12px",
                      marginLeft: "9px",
                    }}
                    onClick={props.handleSignUpOpen}
                  >
                    SIGN UP
                  </Button>
                </Box>
              ) : (
                <img
                  style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "44px"
                  }}
                  src={props.verifiedMemberData.mb_image}
                  onClick={props.handleLogOutClick}
                />
              )}

              <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleCloseLogOut}
                onClick={props.handleCloseLogOut}
              >
                <Popover
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  anchorEl={props.anchorEl}
                  open={props.open}
                  onClose={props.handleCloseLogOut}
                  onClick={props.handleCloseLogOut}
                >
                  <Box
                    sx={{
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    }}
                  >
                    <MenuItem onClick={props.handleLogOutRequest}>
                      <ListItemIcon>
                        <Logout fontSize="medium" style={{ color: "orange" }} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Box>
                </Popover>
              </Menu>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
