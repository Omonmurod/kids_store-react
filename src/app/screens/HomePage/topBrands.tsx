import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export function TopBrands() {
  return (
    <div className="top_brands_frame">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          style={{ height: "75px", marginTop: "30px" }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <div style={{ marginTop: "-15px", marginRight: "30px" }}>
            <img src="/icons/left.png" style={{ marginTop: "0px" }} />
          </div>
          <span className="category_title">Featured Brands</span>
          <div style={{ marginTop: "-15px", marginLeft: "30px" }}>
            <img src="/icons/right.png" />
          </div>
        </Box>
        <Stack
          className="top-brands"
          style={{
            height: "480px",
            width: "100%",
            marginTop: "40px",
          }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Stack className="top-brands_box">
            <Stack className="brand-img">
              <img src="/icons/swiper2.jpeg" className="img" />
            </Stack>
            <Stack className="brand-info">
              <CssVarsProvider>
                <Stack className="info-top">
                  <Box className="info-top_nick">AGABANG</Box>
                  <Box className="info-top_address">
                    <img
                      src="/icons/location.svg"
                      style={{ marginRight: "8px" }}
                    />
                    서울 홍익로 동교동
                  </Box>
                  <Box className="info-top_address">
                    <img src="/icons/call.svg" style={{ marginRight: "8px" }} />
                    053 1234 5678
                  </Box>
                </Stack>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 0.4,
                  }}
                >
                  <IconButton
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 45,
                      transform: "translateY(70%)",
                      color: "rgba(0, 0, 0, .4)",
                    }}
                  >
                    <Favorite style={{ fill: "red" }} />
                  </IconButton>
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Visibility
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    100
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Favorite
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    5
                  </Typography>
                </CardOverflow>
              </CssVarsProvider>
            </Stack>
          </Stack>
          <Stack className="top-brands_box">
            <Stack className="brand-img">
              <img src="/icons/swiper2.jpeg" className="img" />
            </Stack>
            <Stack className="brand-info">
              <CssVarsProvider>
                <Stack className="info-top">
                  <Box className="info-top_nick">AGABANG</Box>
                  <Box className="info-top_address">
                    <img
                      src="/icons/location.svg"
                      style={{ marginRight: "8px" }}
                    />
                    서울 홍익로 동교동
                  </Box>
                  <Box className="info-top_address">
                    <img src="/icons/call.svg" style={{ marginRight: "8px" }} />
                    053 1234 5678
                  </Box>
                </Stack>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 0.4,
                  }}
                >
                  <IconButton
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 45,
                      transform: "translateY(70%)",
                      color: "rgba(0, 0, 0, .4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Visibility
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    100
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Favorite
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    5
                  </Typography>
                </CardOverflow>
              </CssVarsProvider>
            </Stack>
          </Stack>
          <Stack className="top-brands_box">
            <Stack className="brand-img">
              <img src="/icons/swiper2.jpeg" className="img" />
            </Stack>
            <Stack className="brand-info">
              <CssVarsProvider>
                <Stack className="info-top">
                  <Box className="info-top_nick">AGABANG</Box>
                  <Box className="info-top_address">
                    <img
                      src="/icons/location.svg"
                      style={{ marginRight: "8px" }}
                    />
                    서울 홍익로 동교동
                  </Box>
                  <Box className="info-top_address">
                    <img src="/icons/call.svg" style={{ marginRight: "8px" }} />
                    053 1234 5678
                  </Box>
                </Stack>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 0.4,
                  }}
                >
                  <IconButton
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 45,
                      transform: "translateY(70%)",
                      color: "rgba(0, 0, 0, .4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Visibility
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    100
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Favorite
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    5
                  </Typography>
                </CardOverflow>
              </CssVarsProvider>
            </Stack>
          </Stack>
          <Stack className="top-brands_box">
            <Stack className="brand-img">
              <img src="/icons/swiper2.jpeg" className="img" />
            </Stack>
            <Stack className="brand-info">
              <CssVarsProvider>
                <Stack className="info-top">
                  <Box className="info-top_nick">AGABANG</Box>
                  <Box className="info-top_address">
                    <img
                      src="/icons/location.svg"
                      style={{ marginRight: "8px" }}
                    />
                    서울 홍익로 동교동
                  </Box>
                  <Box className="info-top_address">
                    <img src="/icons/call.svg" style={{ marginRight: "8px" }} />
                    053 1234 5678
                  </Box>
                </Stack>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 0.4,
                  }}
                >
                  <IconButton
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 45,
                      transform: "translateY(70%)",
                      color: "rgba(0, 0, 0, .4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Visibility
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    100
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    //level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "#423126",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "15px",
                    }}
                  >
                    <Favorite
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    />
                    5
                  </Typography>
                </CardOverflow>
              </CssVarsProvider>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{
            height: "60px",
            width: "100%",
            marginTop: "0px",
            marginBottom: "12px",
          }}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <Button

          //onClick={goRestaurantsHandler}
          >
            <NavLink to="/brand" className="see-btn success">
              See All Brands
            </NavLink>
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
