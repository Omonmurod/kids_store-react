import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function OurOffers() {
  return (
    <div className="our-offers">
      <Container className="our-offers_frame">
        <Box className="title">
          <span className="category_title">Our Offers</span>
        </Box>
        <Stack className="offer-bottom">
          <Box className="offer-img">
            <img src="/icons/offer-bunny.png" />
          </Box>
          <Stack style={{ marginRight: "50px" }}>
            <Stack className="info-box1">
              <Box className="info-img">
                <img src="/icons/offer1.svg" />
              </Box>
              <Stack className="info">
                <div className="bottom-info1">New Born & Baby Care Shop</div>
                <div className="bottom-info">Cras efficitur, lacus non luctus facilisis</div>
              </Stack>
            </Stack>
            <Stack className="info-box2">
              <Box className="info-img">
                <img src="/icons/offer2.svg" />
              </Box>
              <Stack className="info">
                <div className="bottom-info2">Toddlers Clothing & Accessories</div>
                <div className="bottom-info">Etiam vulputate efficitur nibh sed euismod</div>
              </Stack>
            </Stack>
            <Stack className="info-box3">
              <Box className="info-img">
                <img src="/icons/offer3.svg" />
              </Box>
              <Stack className="info">
                <div className="bottom-info3">Toys and Games</div>
                <div className="bottom-info">Etiam vulputate efficitur nibh sed euismod</div>
              </Stack>
            </Stack>
            <Stack className="info-box4">
              <Box className="info-img">
                <img src="/icons/offer4.svg" />
              </Box>
              <Stack className="info">
                <div className="bottom-info4">Strollers & Ride-Ons</div>
                <div className="bottom-info">Cras efficitur, lacus non luctus facilisis</div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
