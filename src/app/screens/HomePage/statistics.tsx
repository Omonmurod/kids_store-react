import { Box, Container, Stack } from "@mui/material";
import React from "react";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";

export function Statistics() {
  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div
        className="statistics"
        style={{ backgroundColor: "white", height: "480px", width: "430px" }}
      >
        <Container className="statistics_frame">
          <Stack
            className="frame"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Stack
              className="frame_info"
              style={{ marginTop: "-10px", width: "330px", marginLeft: "45px" }}
            >
              <Box className="frame_info-img">
                <img src="/icons/delivery.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">Free Delivery</Box>
                <Box className="frame_info-bottom">When ordering from $100</Box>
              </Stack>
            </Stack>
            <Stack
              className="frame_info"
              style={{ marginTop: "-10px", width: "330px", marginLeft: "45px" }}
            >
              <Box className="frame_info-img">
                <img src="/icons/return.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">14 Day’s Return</Box>
                <Box className="frame_info-bottom">
                  Your money-back guarentee
                </Box>
              </Stack>
            </Stack>
            <Stack
              className="frame_info"
              style={{ marginTop: "-10px", width: "330px", marginLeft: "45px" }}
            >
              <Box className="frame_info-img">
                <img src="/icons/secure.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">Secure Payment</Box>
                <Box className="frame_info-bottom">
                  Secure code to verify sestem
                </Box>
              </Stack>
            </Stack>
            <Stack
              className="frame_info"
              style={{ marginTop: "-10px", width: "330px", marginLeft: "45px" }}
            >
              <Box className="frame_info-img">
                <img src="/icons/support.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">24/7 support</Box>
                <Box className="frame_info-bottom">
                  Customers all over the world
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="statistics" style={{ backgroundColor: "white" }}>
        <Container className="statistics_frame">
          <Stack className="frame">
            <Stack className="frame_info">
              <Box className="frame_info-img">
                <img src="/icons/delivery.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">Free Delivery</Box>
                <Box className="frame_info-bottom">When ordering from $100</Box>
              </Stack>
            </Stack>
            <Stack className="frame_info">
              <Box className="frame_info-img">
                <img src="/icons/return.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">14 Day’s Return</Box>
                <Box className="frame_info-bottom">
                  Your money-back guarentee
                </Box>
              </Stack>
            </Stack>
            <Stack className="frame_info">
              <Box className="frame_info-img">
                <img src="/icons/secure.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">Secure Payment</Box>
                <Box className="frame_info-bottom">
                  Secure code to verify sestem
                </Box>
              </Stack>
            </Stack>
            <Stack className="frame_info">
              <Box className="frame_info-img">
                <img src="/icons/support.png" />
              </Box>
              <Stack style={{ marginLeft: "11px" }}>
                <Box className="frame_info-top">24/7 support</Box>
                <Box className="frame_info-bottom">
                  Customers all over the world
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}
