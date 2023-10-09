import React from "react";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import Marginer from "../../components/marginer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";

export function OneBrand() {
  const events_list = Array.from(Array(6).keys());
  const brand_list = Array.from(Array(10).keys());
  const progress = (18 / 38) * 100;

  return (
    <div className="one_brand">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box
            style={{ height: "75px", marginTop: "20px" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent="flex-start"
          >
            <span className="category_title" style={{ marginRight: "1000px", fontSize: "28px"}}>See also</span>
          </Box>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "-25px" }}
          >
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                style={{ color: "orange", fontSize: "40px" }}
              />
            </Box>
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {brand_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{ cursor: "pointer " }}
                    key={index}
                    className={"restaurant_avatars"}
                  >
                    <img src={"/icons/swiper2.jpeg"} />
                    <span>Brand name</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className={"next_btn restaurant-next"}
              style={{ color: "white" }}
            >
              <ArrowForwardIosNewIcon
                style={{ color: "orange", fontSize: "40px" }}
              />
            </Box>
          </Stack>
          <Box
            style={{ height: "75px", marginTop: "50px" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
          >
            <span className="category_title">Brand Name</span>
          </Box>
          <Stack className="shop">
            <Stack className="left_shop">
              <Stack flexDirection={"row"}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="new"
                  >
                    <FormControlLabel
                      value="new"
                      control={
                        <Radio color="primary" style={{ width: "33px" }} />
                      }
                      label={
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontWeight: "650",
                            fontSize: "19px",
                            paddingRight: "20px",
                          }}
                        >
                          New
                        </span>
                      }
                    />
                    <FormControlLabel
                      value="price"
                      control={
                        <Radio color="primary" style={{ width: "33px" }} />
                      }
                      label={
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontWeight: "650",
                            fontSize: "19px",
                            paddingRight: "20px",
                          }}
                        >
                          Price
                        </span>
                      }
                    />
                    <FormControlLabel
                      value="view"
                      control={
                        <Radio color="primary" style={{ width: "33px" }} />
                      }
                      label={
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontWeight: "650",
                            fontSize: "19px",
                            paddingRight: "20px",
                          }}
                        >
                          Views
                        </span>
                      }
                    />
                    <FormControlLabel
                      value="like"
                      control={
                        <Radio color="primary" style={{ width: "33px" }} />
                      }
                      label={
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontWeight: "650",
                            fontSize: "19px",
                          }}
                        >
                          Likes
                        </span>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack className="shop_products">
                {events_list.map((value, number) => {
                  return (
                    <Stack className="shop_product-info">
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
                      <Stack
                        display={"flex"}
                        marginLeft={"40px"}
                        marginTop={"15px"}
                        className="btn"
                      >
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
                          }}
                          //onClick={props.handleLoginOpen}
                        >
                          ADD TO CART
                        </Button>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
              <Stack>
                <Box marginTop={"30px"} width={"820px"}>
                  <Marginer
                    direction="horizontal"
                    height="1"
                    width="100%"
                    bg="#ffa500"
                  />
                </Box>
                <Stack className={"bottom_box"}>
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
            </Stack>

            <Stack className="right_shop">
              <Stack className="right_shop-top">
                <Stack className="search">
                  <Box className="right_shop-title">Search</Box>
                  <Box className={"search_big_box"}>
                    <input
                      className="search_product_input"
                      type={"search"}
                      name={"resSearch"}
                      placeholder={"Input product name here ..."}
                    />
                    <Button
                      className={"button_search"}
                      variant="contained"
                      endIcon={<SearchIcon />}
                    ></Button>
                  </Box>
                </Stack>
                <Stack className="gender_category">
                  <Box
                    className="right_shop-title"
                    style={{ marginRight: "10px" }}
                  >
                    Gender
                  </Box>
                  <Stack style={{ marginTop: "10px" }}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position">
                        <FormControlLabel
                          value="boy"
                          control={<Checkbox style={{ color: "#423123" }} />}
                          label={
                            <span
                              style={{
                                fontFamily: "Nunito",
                                fontWeight: "550",
                                fontSize: "19px",
                                paddingLeft: "5px",
                              }}
                            >
                              Boy
                            </span>
                          }
                        />
                        <FormControlLabel
                          value="girl"
                          control={<Checkbox style={{ color: "#423123" }} />}
                          label={
                            <span
                              style={{
                                fontFamily: "Nunito",
                                fontWeight: "550",
                                fontSize: "19px",
                                paddingLeft: "5px",
                              }}
                            >
                              Girl
                            </span>
                          }
                        />
                        <FormControlLabel
                          value="unisex"
                          control={<Checkbox style={{ color: "#423123" }} />}
                          label={
                            <span
                              style={{
                                fontFamily: "Nunito",
                                fontWeight: "550",
                                fontSize: "19px",
                                paddingLeft: "5px",
                              }}
                            >
                              Uni
                            </span>
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack className="category">
                  <Box
                    className="right_shop-title"
                    style={{ marginLeft: "10px" }}
                  >
                    Categories
                  </Box>
                  <Stack className="category_info">
                    <Box className="category_info1">
                      <div>
                        <img
                          src="/icons/category1.png"
                          style={{ width: "165px", borderRadius: "20px" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "165px",
                          marginTop: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "850",
                            lineHeight: "20px",
                          }}
                        >
                          Toys, Books & Games
                        </span>
                      </div>
                    </Box>
                    <Box
                      className="category_info1"
                      style={{ marginLeft: "19px" }}
                    >
                      <div>
                        <img
                          src="/icons/category2.png"
                          style={{ width: "165px", borderRadius: "20px" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "165px",
                          marginTop: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "850",
                            lineHeight: "20px",
                          }}
                        >
                          Toddlers Clothing & Sets
                        </span>
                      </div>
                    </Box>
                  </Stack>
                  <Stack
                    className="category_info"
                    style={{ marginTop: "20px" }}
                  >
                    <Box className="category_info1">
                      <div>
                        <img
                          src="/icons/category3.png"
                          style={{ width: "165px", borderRadius: "20px" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "165px",
                          marginTop: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "850",
                            lineHeight: "20px",
                          }}
                        >
                          Strollers & Car Seats
                        </span>
                      </div>
                    </Box>
                    <Box
                      className="category_info1"
                      style={{ marginLeft: "19px" }}
                    >
                      <div>
                        <img
                          src="/icons/category4.png"
                          style={{ width: "165px", borderRadius: "20px" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "165px",
                          marginTop: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "850",
                            lineHeight: "20px",
                          }}
                        >
                          Party & Gifts Shop
                        </span>
                      </div>
                    </Box>
                  </Stack>
                  <Stack
                    className="category_info"
                    style={{ marginTop: "20px" }}
                  >
                    <Box className="category_info1">
                      <div>
                        <img
                          src="/icons/category5.png"
                          style={{
                            width: "165px",
                            marginRight: "35px",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "160px",
                          marginTop: "8px",
                          marginLeft: "-38px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontWeight: "850",
                            lineHeight: "20px",
                            marginRight: "-80px",
                          }}
                        >
                          Baby Care Products
                        </span>
                      </div>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              {/* <Stack className="right_shop-bottom">
                <Box
                  style={{
                    width: "282px",
                    marginRight: "55px",
                    marginTop: "15px",
                    marginBottom: "15px",
                    color: "#423127",
                    fontFamily: "Nunito",
                    fontWeight: "900",
                    fontSize: "28px",
                  }}
                >
                  Special Offer
                </Box>
                <Stack className={"product-box"}>
                  <Box
                    className={"img"}
                    sx={{
                      backgroundImage: `url("/icons/red-baby-stroller.jpeg")`,
                    }}
                  >
                    <Box className={"dish_sale"}>
                      <div className={"dish_sale-txt"}>-50%</div>
                    </Box>
                    <Button
                      className={"like_view_btn"}
                      style={{ left: "36px" }}
                    >
                      <Badge badgeContent={8} color="primary">
                        <Checkbox
                          icon={<Favorite style={{ color: "white" }} />}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
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
                          checkedIcon={<Visibility style={{ color: "red" }} />}
                          checked={false}
                        />
                      </Badge>
                    </Button>
                  </Box>
                  <Stack className={"product_name"}>Stroller 2 in 1</Stack>
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
                      $100
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontWeight: "900",
                        color: "#f50157",
                        fontSize: "20px",
                      }}
                    >
                      $50
                    </span>
                  </Stack>
                  <Stack className="remain_date">
                    <Stack className="available">
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        className="line"
                        color="secondary"
                      />
                      <Box className="availability">
                        <div>
                          Available:{" "}
                          <span style={{ fontWeight: "770" }}>18</span>
                        </div>
                        <div>
                          Sold: <span style={{ fontWeight: "770" }}>20</span>
                        </div>
                      </Box>
                    </Stack>
                    <Stack className="date">
                      <Stack className="hurry">
                        <Box className="hurry-top">Hurry Up!</Box>
                        <Box className="hurry-bottom">Offer end in :</Box>
                      </Stack>
                      <Stack className="timer">
                        <span className="time">29 :</span>
                        <span className="time">23 :</span>
                        <span className="time">59 :</span>
                        <span className="time">59</span>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
