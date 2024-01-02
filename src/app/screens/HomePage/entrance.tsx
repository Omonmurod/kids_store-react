import { Height } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

export function Entrance() {
  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div
        className="entrance"
        style={{
          backgroundColor: "white",
          width: "430px",
          height: "470px",
        }}
      >
        <Container className="main">
          <Stack className="main-box">
            <div className="box1">
              <Stack className="box1-1">
                <img
                  src="/icons/heading-bg-1.png"
                  style={{ width: "300px", marginTop: "60px" }}
                />
                <span
                  className="box1-1_txt"
                  style={{
                    fontSize: "32px",
                    marginTop: "-55px",
                    marginLeft: "45px",
                  }}
                >
                  Fun to care,
                </span>
              </Stack>
            </div>
            <Box
              className="box1-2"
              style={{
                fontSize: "32px",
                marginTop: "15px",
                marginLeft: "45px",
              }}
            >
              comfy feel
            </Box>
            <Box
              className="box1-3"
              style={{
                fontSize: "15px",
                marginTop: "25px",
                marginLeft: "5px",
                width: "300px",
              }}
            >
              Sed congue, eros et feugiat tincidunt, nulla diam iaculis lorem,
              quis hendrerit lorem nisl vel mauris.
            </Box>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="entrance" style={{ backgroundColor: "white" }}>
        <Container className="main">
          <Fade left duration={1500}>
            <Stack className="main-box">
              <div className="box1">
                <Stack className="box1-1">
                  <img
                    src="/icons/heading-bg-1.png"
                    style={{ width: "600px" }}
                  />
                  <span className="box1-1_txt">Babylandia</span>
                </Stack>
              </div>
              <Box className="box1-2">quality first</Box>
              <Box className="box1-3">
                Let’s make your babies happy.
                <br />
                We know that babies deserve the best.
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
                    fontSize: "16px",
                  }}
                >
                  <NavLink
                    to="/brand/654d6039a79bbaaa921aaf01"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Shop Now
                  </NavLink>
                </Button>
              </Box>
            </Stack>
          </Fade>
          <Zoom duration={2200}>
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
          </Zoom>
        </Container>
      </div>
    );
  }
}
