import { Widgets } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
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
            <Box className={"shop_now"}>
              New sale Season - Up to 20%
              <NavLink to="/product" activeClassName="underline">
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
                +8210 1234 5678
              </span>
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="navbar_bottom">
        <Container>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Box style={{ width: "18%" }}>
              <img
                src="/icons/cropped-logo.png"
                style={{
                  width: "130px",
                  height: "68px",
                  marginTop: "16px",
                  marginBottom: "14px",
                }}
              />
            </Box>
            <Stack
              style={{ width: "50%" }}
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
                <NavLink to="/brand" activeClassName="underline">
                  Brands
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
                <NavLink to="/about" activeClassName="underline">
                  About Us
                </NavLink>
              </Box>
            </Stack>
            <Stack
              style={{ width: "18.5%", marginLeft: "5%" }}
              flexDirection={"row"}
              justifyContent={"space-between"}
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
                  <Badge badgeContent={5} color="primary">
                    <img
                      src="/icons/shopping_cart.svg"
                      style={{ width: "20px" }}
                    />
                  </Badge>
                </IconButton>
              </Box>
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
                //onClick={props.handleLoginOpen}
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
                }}
                //onClick={props.handleLoginOpen}
              >
                REGISTER
              </Button>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
