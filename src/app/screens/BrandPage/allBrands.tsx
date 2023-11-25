import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, Visibility } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function AllBrands() {
  const brands_list = Array.from(Array(8).keys());

  return (
    <div className="all_brands_frame">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack className="search">
          <Stack className="search_box">
            <form className="search_form" action="" method="">
              <input
                className="searchInput"
                type={"search"}
                name={"resSearch"}
                placeholder={"Input desired brand name here ..."}
              />
            </form>
          </Stack>
          <Stack className="category_box">
            <a>Newly added</a>
            <a>Trending</a>
            <a>Most Liked</a>
            <a>Most Viewed</a>
          </Stack>
        </Stack>
        <Stack className="brands">
          <Stack
            className="top-brands"
            style={{
              width: "100%",
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {brands_list.map((value, number) => {
              return (
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
                          <img
                            src="/icons/call.svg"
                            style={{ marginRight: "8px" }}
                          />
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
              );
            })}
          </Stack>
          <Stack>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  className="pagination"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
