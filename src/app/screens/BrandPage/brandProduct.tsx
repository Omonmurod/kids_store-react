import React, { useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Checkbox from "@mui/material/Checkbox";
import { FreeMode, Navigation, Thumbs } from "swiper";
import {
  Favorite,
  FavoriteBorder,
  StayCurrentLandscape,
} from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
import theme2 from "../../MaterialTheme/theme2";
import { ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";

const chosen_list = Array.from(Array(4).keys());

export function BrandProduct() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const events_list = Array.from(Array(10).keys());
  const progress5 = (8 / 20) * 100;
  const progress4 = (12 / 20) * 100;
  const progress3 = (0 / 20) * 100;
  const progress2 = (0 / 20) * 100;
  const progress1 = (0 / 20) * 100;

  return (
    <div className="brand_product">
      <Container className="dish_container">
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Stack className="chosen_dish_slider">
            <Swiper
              className="dish_swiper"
              loop={true}
              spaceBetween={3}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {chosen_list.map((ele) => {
                const image_path = `/icons/teddy-bear.jpeg`;
                return (
                  <SwiperSlide>
                    <img className="img" src={image_path} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {chosen_list.map((ele) => {
                const image_path = `/icons/teddy-bear.jpeg`;
                return (
                  <SwiperSlide>
                    <img src={image_path} className="img-bot" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
          <Stack className={"chosen_dish_info_container"}>
            <Box className={"chosen_dish_info_box"}>
              <strong className={"dish_txt"}>Sweet Sandvich</strong>
              <span className={"resto_name"}>Texas De Brasil</span>
              <Box className={"rating_box"}>
                <Rating
                  name="half-rating"
                  defaultValue={3.5}
                  precision={0.5}
                  style={{ color: "#1876d2" }}
                />
                <div className="evaluation_box">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                      fontFamily: "Nunito",
                      fontWeight: "600",
                    }}
                  >
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={true}
                    />
                    <span>98</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Nunito",
                      fontWeight: "600",
                    }}
                  >
                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                    <span>200</span>
                  </div>
                </div>
              </Box>
              <p className={"dish_desc_info"}>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.{" "}
              </p>
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000000"
              />
              <div className={"dish_price_box"}>
                <span>Narx:</span>
                <span>$11</span>
              </div>
              <div className={"button_box"}>
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "770",
                    fontStyle: "Nunito",
                    backgroundColor: "orange",
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Box>
          </Stack>
        </Stack>
        <Stack className="comment_section">
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            style={{ marginTop: "33px" }}
          >
            <Stack className="comment">
              <Stack className="rating">
                <Box className="comment_title">Reviews for Product</Box>
                <Stack>
                  <div
                    style={{
                      fontFamily: "Nunito",
                      fontSize: "16px",
                      color: "#724D37",
                      fontWeight: "700",
                      lineHeight: "24px",
                      marginTop: "15px",
                      marginBottom: "4px",
                    }}
                  >
                    Average Rating
                  </div>
                  <div
                    style={{
                      fontFamily: "Nunito",
                      fontSize: "36px",
                      color: "#FF961A",
                      fontWeight: "880",
                      lineHeight: "normal",
                      marginBottom: "4px",
                    }}
                  >
                    4.60
                  </div>
                  <div>
                    <Rating
                      name="half-rating"
                      defaultValue={3.5}
                      precision={0.5}
                      style={{ color: "#1876d2" }}
                    />
                  </div>
                </Stack>
                <Stack>
                  <Stack flexDirection={"row"} style={{ marginTop: "15px" }}>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        5 Star
                      </span>
                    </Box>
                    <Box
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <ThemeProvider theme={theme2}>
                        <LinearProgress
                          variant="determinate"
                          className="line"
                          style={{ borderRadius: "3px" }}
                          value={progress5}
                          color="primary"
                        />
                      </ThemeProvider>
                    </Box>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        40%
                      </span>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"} style={{ marginTop: "8px" }}>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        4 Star
                      </span>
                    </Box>
                    <Box
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <ThemeProvider theme={theme2}>
                        <LinearProgress
                          variant="determinate"
                          className="line"
                          style={{ borderRadius: "3px" }}
                          value={progress4}
                          color="primary"
                        />
                      </ThemeProvider>
                    </Box>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        60%
                      </span>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"} style={{ marginTop: "8px" }}>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        3 Star
                      </span>
                    </Box>
                    <Box
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <ThemeProvider theme={theme2}>
                        <LinearProgress
                          variant="determinate"
                          className="line"
                          style={{ borderRadius: "3px" }}
                          value={progress3}
                          color="primary"
                        />
                      </ThemeProvider>
                    </Box>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        0%
                      </span>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"} style={{ marginTop: "8px" }}>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        2 Star
                      </span>
                    </Box>
                    <Box
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <ThemeProvider theme={theme2}>
                        <LinearProgress
                          variant="determinate"
                          className="line"
                          style={{ borderRadius: "3px" }}
                          value={progress2}
                          color="primary"
                        />
                      </ThemeProvider>
                    </Box>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        0%
                      </span>
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"} style={{ marginTop: "8px" }}>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        1 Star
                      </span>
                    </Box>
                    <Box
                      style={{
                        alignItems: "center",
                        marginTop: "10px",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      <ThemeProvider theme={theme2}>
                        <LinearProgress
                          variant="determinate"
                          className="line"
                          style={{ borderRadius: "3px" }}
                          value={progress1}
                          color="primary"
                        />
                      </ThemeProvider>
                    </Box>
                    <Box>
                      <span
                        style={{
                          fontFamily: "Nunito",
                          fontSize: "16px",
                          color: "#724D37",
                          fontWeight: "770",
                          lineHeight: "24px",
                          marginTop: "15px",
                          marginBottom: "4px",
                        }}
                      >
                        0%
                      </span>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack className="add_comment">
                <Box className="comment_title">Add a Review</Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <span
                    style={{
                      fontFamily: "Nunito",
                      fontSize: "18px",
                      color: "#724D37",
                      fontWeight: "700",
                      lineHeight: "24px",
                      marginTop: "15px",
                      marginBottom: "4px",
                    }}
                  >
                    Your Rating
                  </span>
                  <div style={{ marginTop: "15px" }}>
                    <Rating
                      name="half-rating"
                      defaultValue={0}
                      precision={0.5}
                      style={{
                        color: "#1876d2",
                        fontSize: "22px",
                        marginLeft: "20px",
                      }}
                    />
                  </div>
                </Box>
                <span
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "18px",
                    color: "#724D37",
                    fontWeight: "700",
                    lineHeight: "24px",
                    marginTop: "15px",
                    marginBottom: "4px",
                  }}
                >
                  Add your review
                </span>
                <form
                  action={"#"}
                  method={"POST"}
                  className={"admin_letter_frame"}
                >
                  <div className={"admin_input_box"}>
                    <textarea
                      name={"mb_msg"}
                      placeholder={"Your Review"}
                      style={{
                        fontFamily: "Nunito",
                        width: "500px",
                        height: "165px",
                        borderRadius: "12px",
                        marginLeft: "0px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                  <Box display={"flex"} justifyContent={"flex-start"}>
                    <Button
                      style={{
                        backgroundColor: "#ffa602",
                        borderRadius: "20px",
                        width: "200px",
                        fontFamily: "Nunito",
                        fontWeight: "770",
                        fontSize: "15px",
                      }}
                      variant={"contained"}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Stack>
            </Stack>
            <Stack className="reviews">
              <Stack className="review_box">
                <Box>
                  <img
                    src="/icons/default_user.svg"
                    style={{
                      width: "90px",
                      height: "90px",
                      marginLeft: "30px",
                    }}
                  />
                </Box>
                <Stack style={{ marginLeft: "30px", marginTop: "55px" }}>
                  <strong className={"review_txt"}>John Doe</strong>
                  <span className={"review_date"}>October 10, 2023</span>
                  <Rating
                    name="half-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    style={{
                      color: "#1876d2",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  />
                  <p className={"review_info"}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum.
                  </p>
                </Stack>
              </Stack>
              <Stack className="review_box">
                <Box>
                  <img
                    src="/icons/default_user.svg"
                    style={{
                      width: "90px",
                      height: "90px",
                      marginLeft: "30px",
                    }}
                  />
                </Box>
                <Stack style={{ marginLeft: "30px", marginTop: "55px" }}>
                  <strong className={"review_txt"}>John Doe</strong>
                  <span className={"review_date"}>October 10, 2023</span>
                  <Rating
                    name="half-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    style={{
                      color: "#1876d2",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  />
                  <p className={"review_info"}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum.
                  </p>
                </Stack>
              </Stack>
              <Stack className="review_box">
                <Box>
                  <img
                    src="/icons/default_user.svg"
                    style={{
                      width: "90px",
                      height: "90px",
                      marginLeft: "30px",
                    }}
                  />
                </Box>
                <Stack style={{ marginLeft: "30px", marginTop: "55px" }}>
                  <strong className={"review_txt"}>John Doe</strong>
                  <span className={"review_date"}>October 10, 2023</span>
                  <Rating
                    name="half-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    style={{
                      color: "#1876d2",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  />
                  <p className={"review_info"}>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum.
                  </p>
                </Stack>
              </Stack>
              <Box marginBottom={"12px"} width={"600px"}>
                <Marginer direction="horizontal" height="1" bg="#ffa500" />
              </Box>
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
                      style={{ marginTop: "10px" }}
                      className="pagination"
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <div className="best_pro">
        <Container className={"chosen_p_products_main"}>
          <Box className={"p_products_text"}>
            <span className={"title"}>You also may like these</span>
          </Box>
          <Stack className="swiper">
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                style={{ color: "#1876d2", fontSize: "40px" }}
              />
            </Box>
            <Swiper
              className={"swiper_wrapper"}
              slidesPerView={4}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
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
                          marginBottom: "55px",
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
            <Box
              className={"next_btn restaurant-next"}
              style={{ color: "white" }}
            >
              <ArrowForwardIosNewIcon
                style={{ color: "#1876d2", fontSize: "40px" }}
              />
            </Box>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
