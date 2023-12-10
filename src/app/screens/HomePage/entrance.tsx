import { Height } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Entrance() {
  return (
    <div className="entrance" style={{ backgroundColor: "white"}}>
      <Container className="main">
        <Stack className="main-box">
          <div className="box1">
            <Stack className="box1-1">
              <img src="/icons/heading-bg-1.png" />
              <span className="box1-1_txt">Fun to care,</span>
            </Stack>
          </div>
          <Box className="box1-2">comfy feel</Box>
          <Box className="box1-3">
            Sed congue, eros et feugiat tincidunt, nulla diam iaculis lorem,
            quis hendrerit lorem nisl vel mauris.
          </Box>
          <Box flexDirection={"row"}>
            <Button
              variant="contained"
              style={{
                borderRadius: "30px",
                color: "#ffffff",
                background: "#ffa600",
                fontFamily: "Nunito",
                width: "140px",
                height: "55px",
                marginTop: "40px",
                marginLeft: "60px",
                fontWeight: "800",
                fontSize: "16px"
              }}
            >
              <NavLink to="/products" style={{ textDecoration: "none", color: "white", cursor: "pointer"}}>
                Shop Now
              </NavLink>
            </Button>
          </Box>
        </Stack>
        <Box>
          <img
            src="/icons/Hero-Img.png"
            style={{
              width: "580px",
              height: "550px",
              marginTop: "-60px",
              marginRight: "-40px",
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
