import { Badge, Box, Button, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_top">
        <Container>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            className="navbar_top_txt"
          >
            <Box>
              New sale Season - Up to 20%
              <span
                style={{
                  color: "#FF961A",
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  textTransform: "uppercase",
                  marginLeft: "10px",
                }}
              >
                Shop Now
                <img
                  src="/product/shop_now.png"
                  style={{ marginLeft: "4px", width: "15px", height: "15px" }}
                />
              </span>
            </Box>
            <Box>
              Customer Care Services:
              <span
                style={{
                  color: "#FF961A",
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "900",
                  lineHeight: "normal",
                  textTransform: "uppercase",
                  marginLeft: "10px",
                }}
              >
                +8210 1234 5678
              </span>
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="navbar_bottom">
        <Container>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
              <img
                src="/product/cropped-logo.png"
                style={{
                  width: "130px",
                  height: "68px",
                  marginTop: "16px",
                  marginBottom: "14px",
                }}
              />
            </Box>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              className="navbar_links"
            >
              <Box className="hover-line">
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/product" activeClassName="underline">
                  Shop
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>

              <Box className="hover-line">
                <NavLink to="/community" activeClassName="underline">
                  Community
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My page
                </NavLink>
              </Box>

              <Box className="hover-line">
                <NavLink to="/help" activeClassName="underline">
                  Help
                </NavLink>
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
                      src="/icons/shopping_cart.svg"
                      style={{ width: "18px" }}
                    />
                  </Badge>
                </IconButton>
                </Box>
                <Box flexDirection={"row"}>
                <Button
                  variant="contained"
                  style={{ color: "#ffffff", background: "#ffa600" }}
                  //onClick={props.handleLoginOpen}
                >
                  LogIn
                </Button>
                </Box>
                <Box flexDirection={"row"}>
                <Button
                  variant="contained"
                  style={{ color: "#ffffff", background: "#ffa600" }}
                  //onClick={props.handleLoginOpen}
                >
                  REGISTER
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
