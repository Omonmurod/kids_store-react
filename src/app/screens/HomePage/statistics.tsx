import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Statistics() {
  return (
    <div className="statistics">
      <Container className="statistics_frame">
        <Stack className="frame">
          <Stack className="frame_info">
            <Box className="frame_info-img"><img src="/icons/delivery.png"/></Box>
            <Stack style={{ marginLeft: "11px" }}>
              <Box className="frame_info-top">Free Delivery</Box>
              <Box className="frame_info-bottom">When ordering from $100</Box>
            </Stack>
          </Stack>
          <Stack className="frame_info">
            <Box className="frame_info-img"><img src="/icons/return.png"/></Box>
            <Stack style={{ marginLeft: "11px" }}>
              <Box className="frame_info-top">14 Day’s Return</Box>
              <Box className="frame_info-bottom">Your money-back guarentee</Box>
            </Stack>
          </Stack>
          <Stack className="frame_info">
            <Box className="frame_info-img"><img src="/icons/secure.png"/></Box>
            <Stack style={{ marginLeft: "11px" }}>
              <Box className="frame_info-top">Secure Payment</Box>
              <Box className="frame_info-bottom">Secure code to verify sestem</Box>
            </Stack>
          </Stack>
          <Stack className="frame_info">
            <Box className="frame_info-img"><img src="/icons/support.png"/></Box>
            <Stack style={{ marginLeft: "11px" }}>
              <Box className="frame_info-top">24/7 support</Box>
              <Box className="frame_info-bottom">Customers all over the world</Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
