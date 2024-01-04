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
import { verifiedMemberData } from "../../apiServices/verify";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import Basket from "./basket";

export function Navbar(props: any) {
  //**INITIALIZATIONSS**/
  const { isMobile } = useDeviceDetect();

  if (isMobile()) {
    return (
      <div className="navbar">
        <div className="navbar_top" style={{ height: "80px", width: "430px" }}>
          <Container>
            <Stack
              flexDirection={"column"}
              justifyContent={"space-between"}
              className="navbar_top_txt"
            >
              <Box className={"shop_now"}>
                New sale Season - Up to 20%
                <NavLink
                  to="/mobile"
                  onClick={props.setPath}
                  activeClassName="underline"
                >
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
        <div className="navbar_bottom" style={{ width: "430px" }}>
          <Container>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box style={{}}>
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
                style={{ marginLeft: "-300px" }}
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
                  ></IconButton>
                </Box>

                {!props.verifiedMemberData ? (
                  <Box>
                    <NavLink to="/mobile" onClick={props.setPath}>
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
                      >
                        LogIn
                      </Button>
                    </NavLink>
                    <NavLink to="/mobile" onClick={props.setPath}>
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
                      >
                        SIGN UP
                      </Button>
                    </NavLink>
                  </Box>
                ) : null}
              </Stack>
            </Stack>
          </Container>
        </div>
      </div>
    );
  } else {
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
                <NavLink to="/brand" activeClassName="underline">
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
              <Box style={{ width: "15%" }}>
                <NavLink
                  to="/"
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
                style={{
                  marginLeft: "2%",
                  width: props.verifiedMemberData ? "50%" : "35%",
                }}
                flexDirection={"row"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                className="navbar_links"
              >
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/home" activeClassName="underline">
                    Home
                  </NavLink>
                </Box>
                {/* <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/products" activeClassName="underline">
                  Shop
                </NavLink>
              </Box> */}
                <Box className="hover-line" onClick={props.setPath}>
                  <NavLink to="/brand" activeClassName="underline">
                    Brands
                  </NavLink>
                </Box>
                {verifiedMemberData ? (
                  <Box className="hover-line" onClick={props.setPath}>
                    <NavLink to="/orders" activeClassName="underline">
                      Orders
                    </NavLink>
                  </Box>
                ) : null}
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
                style={{ width: props.verifiedMemberData ? "16%" : "22%" }}
                flexDirection={"row"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
              >
                <Basket
                  cartItems={props.cartItems}
                  onAdd={props.onAdd}
                  onRemove={props.onRemove}
                  onDelete={props.onDelete}
                  onDeleteAll={props.onDeleteAll}
                  setOrderRebuild={props.setOrderRebuild}
                />
                <Box className="hover-line" flexDirection={"row"}>
                  <IconButton
                    aria-label="cart"
                    id="basic-button"
                    aria-controls={undefined}
                    aria-haspopup="true"
                    aria-expanded={undefined}
                  ></IconButton>
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
                      borderRadius: "44px",
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
                          <Logout
                            fontSize="medium"
                            style={{ color: "orange" }}
                          />
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
}
