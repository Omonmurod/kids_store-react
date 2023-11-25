import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopBrands } from "../../screens/HomePage/selector";
import { Brand } from "../../../types/user";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR */
const topBrandsRetriever = createSelector(retrieveTopBrands, (topBrands) => ({
  topBrands,
}));

export function TopBrands() {
  const { topBrands } = useSelector(topBrandsRetriever);

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
          {topBrands.map((ele: Brand) => {
            const image_path = `${serverApi}/${ele.mb_image}`;
            return (
              <Stack className="top-brands_box" key={ele._id}>
                <Stack className="brand-img">
                  <img src={image_path} className="img" />
                </Stack>
                <Stack className="brand-info">
                  <CssVarsProvider>
                    <Stack className="info-top">
                      <Box className="info-top_nick">{ele.mb_nick}</Box>
                      <Box className="info-top_address">
                        <img
                          src="/icons/location.svg"
                          style={{ marginRight: "8px" }}
                        />
                        서울 강남구 가로수길 18
                      </Box>
                      <Box className="info-top_address">
                        <img
                          src="/icons/call.svg"
                          style={{ marginRight: "8px" }}
                        />
                        {ele.mb_phone}
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
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 35,
                          transform: "translateY(50%)",
                          color: "rgba(0, 0, 0, .4)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Favorite
                          //onClick={(e)=>targetLikeTop(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
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
                        {ele.mb_views}
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
                        {ele.mb_likes}
                      </Typography>
                    </CardOverflow>
                  </CssVarsProvider>
                </Stack>
              </Stack>
            );
          })}
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
