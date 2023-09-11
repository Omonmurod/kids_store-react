import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <div className="footer">
      <div className="footer_top">
        <Container>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            style={{ width: "1200px", height: "320px" }}
          >
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img
                  src={"/icons/cropped-logo.png"}
                  style={{ width: "150px" }}
                />
              </Box>
              <Box className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste lorem ipsum
                dolor sit amet.
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/icons/facebook.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/instagram.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/twitter.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/youtube.svg"} />
                </Box>
              </Stack>
            </Stack>
            <Stack className="working_hours" flexDirection={"column"}>
              <Box className="main_txt">Working Hours</Box>
              <Box className="txt" flexDirection={"column"}>
                Mon <span style={{ marginLeft: "20px" }}>09:30 - 18:30</span>
                <br />
                Tue <span style={{ marginLeft: "25px" }}>09:30 - 18:30</span>
                <br />
                Wed <span style={{ marginLeft: "19px" }}>09:30 - 18:30</span>
                <br />
                Thu <span style={{ marginLeft: "24px" }}>09:30 - 18:30</span>
                <br />
                Fri <span style={{ marginLeft: "33px" }}>09:30 - 18:30</span>
                <br />
                Sat <span style={{ marginLeft: "28px" }}>09:30 - 18:30</span>
                <br />
                Sun <span style={{ marginLeft: "23px" }}>11:00 - 16:30</span>
              </Box>
            </Stack>
            <Stack className="parts" flexDirection={"column"}>
              <Box className="main_txt">Information</Box>
              <Box className="targets">
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
                  <NavLink to="/about" activeClassName="underline">
                    About Us
                  </NavLink>
                </Box>
              </Box>
            </Stack>
            <Stack className="find_us" flexDirection={"column"}>
              <Box className="main_txt">Our Address</Box>
              <Stack className="details">
                <Box>L. Seoul</Box>
              </Stack>
              <Stack className="details">
                <Box>P. +8210 1234 5678</Box>
              </Stack>
              <Stack className="details">
                <Box>E. kidsworld@kids.com</Box>
              </Stack>
              <Stack flexDirection={"row"} className="baby_icons">
                <Box className="icons">
                  <img src="/icons/huggies.png" style={{ height: "60px" }} />{" "}
                  <img src="/icons/babybasket.png" style={{ height: "60px" }} />
                </Box>
                <Box className="icons">
                  <img src="/icons/pampers.png" style={{ height: "60px" }} />{" "}
                  <img src="/icons/happybaby.png" style={{ height: "60px" }} />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="footer_medium">
        <Box className="footer_medium_txt">
          Seasonal Sale%
          <img
            src="/icons/stroller.png"
            style={{ height: "25px", marginLeft: "50px", marginRight: "50px" }}
          />
          Seasonal Sale%
          <img
            src="/icons/stroller.png"
            style={{ height: "25px", marginLeft: "50px", marginRight: "50px" }}
          />
          Seasonal Sale%
          <img
            src="/icons/stroller.png"
            style={{ height: "25px", marginLeft: "50px", marginRight: "50px" }}
          />
          Seasonal Sale%
          <img
            src="/icons/stroller.png"
            style={{ height: "25px", marginLeft: "50px", marginRight: "50px" }}
          />
        </Box>
      </div>
      <div className="footer_bottom">
        <Container>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            className="footer_bottom"
          >
            <Box className="footer_txt">
              Copyright KidsWorld 2023, All right reserved.
            </Box>
            <Box className="footer_icon" flexDirection={"row"}>
              <img src="/icons/Visa.png" />
              <img src="/icons/bitcoin.png" style={{ height: "50px" }} />
              <img src="/icons/MasterCard.png" />
              <img src="/icons/WesternUnion.png" />
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
