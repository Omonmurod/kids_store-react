import React from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Rating from "@mui/material/Rating";
import { useCountdown } from "../../components/useCountdown";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function PopularProducts() {
  const events_list = Array.from(Array(10).keys());

  return (
    <div className="p_products_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"p_products_main"}>
          <Box className={"p_products_text"}>
            <span className={"title"}>Best Sellers this Week</span>
          </Box>
          <Stack className="swiper">
            <Swiper
              className={"swiper_wrapper"}
              slidesPerView={5}
              centeredSlides={false}
              spaceBetween={0}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 1800,
                disableOnInteraction: true,
              }}
            >
              {events_list.map((value, number) => {
                return (
                  <SwiperSlide className={"product_info_frame"}>
                    <Stack className={"product-box"}>
                      <Box
                        className={"img"}
                        sx={{
                          backgroundImage: `url("/icons/teddy-bear.jpeg")`,
                        }}
                      >
                        <Box className={"dish_sale"}>
                          <div className={"dish_sale-txt"}>Sale 20%</div>
                        </Box>
                        <Button
                          className={"like_view_btn"}
                          style={{ left: "36px" }}
                        >
                          <Badge badgeContent={8} color="primary">
                            <Checkbox
                              icon={<Favorite style={{ color: "white" }} />}
                              checkedIcon={
                                <Favorite style={{ color: "red" }} />
                              }
                              checked={true}
                            />
                          </Badge>
                        </Button>
                        <Button
                          className={"like_view_btn"}
                          style={{ right: "36px" }}
                        >
                          <Badge badgeContent={16} color="primary">
                            <Checkbox
                              icon={<Visibility style={{ color: "white" }} />}
                              checkedIcon={
                                <Visibility style={{ color: "red" }} />
                              }
                              checked={false}
                            />
                          </Badge>
                        </Button>
                      </Box>
                    </Stack>
                    <Stack className={"product_name"}>Taddybear Toy</Stack>
                    <Stack className={"rating_box"}>
                      <Rating
                        className="half-rating"
                        defaultValue={3.5}
                        precision={0.5}
                      />
                    </Stack>
                    <Stack className={"price"}>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontWeight: "900",
                          textDecoration: "line-through",
                          fontSize: "19px",
                        }}
                      >
                        $70
                      </span>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontWeight: "900",
                          color: "orange",
                          fontSize: "20px",
                        }}
                      >
                        $50
                      </span>
                    </Stack>
                    <Stack marginLeft={"45px"} marginTop={"15px"}>
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: "30px",
                          color: "#ffffff",
                          background: "#ffa600",
                          fontFamily: "Nunito",
                          height: "45px",
                          width: "160px",
                          fontWeight: "900",
                          fontSize: "16px",
                          marginBottom: "35px",
                        }}
                        //onClick={props.handleLoginOpen}
                      >
                        ADD TO CART
                      </Button>
                    </Stack>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
