import React, { useEffect, useRef, useState } from "react";
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
import {
  Favorite,
  FavoriteBorder,
  Label,
  Visibility,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import Marginer from "../../components/marginer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import theme2 from "../../MaterialTheme/theme2";
// import { ThemeProvider } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import BrandApiService from "../../apiServices/brandApiService";
import { ProductSearchObj, SearchObj } from "../../../types/others";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { styled } from "@mui/system";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenBrand,
  retrieveRandomBrands,
  retrieveTargetProducts,
} from "../../screens/BrandPage/selector";
import { Brand } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenBrand,
  setRandomBrands,
  setTargetProducts,
} from "../../screens/BrandPage/slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

const progress = (18 / 38) * 100;
const progress5 = (8 / 20) * 100;
const progress4 = (12 / 20) * 100;
const progress3 = (0 / 20) * 100;
const progress2 = (0 / 20) * 100;
const progress1 = (0 / 20) * 100;
const StyledCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "red",
    },
  },
});

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setRandomBrands: (data: Brand[]) => dispach(setRandomBrands(data)),
  setChosenBrand: (data: Brand) => dispach(setChosenBrand(data)),
  setTargetProducts: (data: Product[]) => dispach(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomBrandsRetriever = createSelector(
  retrieveRandomBrands,
  (randomBrands) => ({ randomBrands })
);
const chosenBrandRetriever = createSelector(
  retrieveChosenBrand,
  (chosenBrand) => ({ chosenBrand })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({ targetProducts })
);

export function OneBrand(props: any) {
  /** INITIALIZATIONS */
  let { brand_id } = useParams<{ brand_id: string }>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { randomBrands } = useSelector(randomBrandsRetriever);
  const { chosenBrand } = useSelector(chosenBrandRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const { setTargetProducts, setChosenBrand, setRandomBrands } = actionDispatch(
    useDispatch()
  );
  const [chosenBrandId, setchosenBrandId] = useState<string>(brand_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "createdAt",
      brand_mb_id: brand_id,
      product_collection: "clothing",
    });
  const history = useHistory();
  const refs: any = useRef([]);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const brandService = new BrandApiService();
    brandService
      .getBrands({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomBrands(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [targetProductSearchObj, productRebuild]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    setchosenBrandId(id);
    targetProductSearchObj.brand_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/brand/${id}`);
  };
  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("Success", 700, false);
      setProductRebuild(new Date());
    } catch (error: any) {
      console.log("targetLikeProduct, ERROR:", error);
      sweetErrorHandling(error).then();
    }
  };

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
            <span
              className="category_title"
              style={{ marginRight: "1000px", fontSize: "28px" }}
            >
              See also
            </span>
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
                prevEl: ".resturant-prev",
              }}
            >
              {randomBrands.map((ele: Brand) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenBrandHandler(ele._id)}
                    style={{ cursor: "pointer " }}
                    key={ele._id}
                    className={"restaurant_avatars"}
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
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
                        <Radio
                          color="primary"
                          style={{ width: "33px" }}
                          onClick={() => searchOrderHandler("createdAt")}
                        />
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
                        <Radio
                          color="primary"
                          style={{ width: "33px" }}
                          onClick={() => searchOrderHandler("product_price")}
                        />
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
                        <Radio
                          color="primary"
                          style={{ width: "33px" }}
                          onClick={() => searchOrderHandler("product_views")}
                        />
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
                        <Radio
                          color="primary"
                          style={{ width: "33px" }}
                          onClick={() => searchOrderHandler("product_likes")}
                        />
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
                {targetProducts.map((product: Product) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  // const size_volume =
                  //   product.product_collection === "shoes"
                  //     ? product.product_volume
                  //     : product.product_size;
                  return (
                    <Stack className="shop_product-info">
                      <Stack className={"product-box"}>
                        <Box
                          className={"img"}
                          sx={{
                            backgroundImage: `url(${image_path})`,
                          }}
                        >
                          <Box className={"dish_sale"}>
                            <div className={"dish_sale-txt"}>Sale 20%</div>
                          </Box>
                          <Button
                            className={"like_view_btn"}
                            style={{ left: "36px" }}
                          >
                            <Badge
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              badgeContent={product.product_likes}
                              color="secondary"
                            >
                              {/* <Checkbox
                                icon={<Favorite style={{ color: "white" }} />}
                                id={product._id}
                                checkedIcon={
                                  <Favorite style={{ color: "red" }} />
                                }
                                onClick={targetLikeProduct}
                                checked={
                                  product?.me_liked &&
                                  product?.me_liked[0]?.my_favorite
                                    ? true
                                    : false
                                } 
                              />*/}
                              <StyledCheckbox
                                icon={<Favorite style={{ color: "white" }} />}
                                id={product._id}
                                checkedIcon={
                                  <Favorite style={{ color: "red" }} />
                                }
                                onClick={targetLikeProduct}
                                checked={
                                  product?.me_liked &&
                                  product?.me_liked[0]?.my_favorite
                                }
                              />
                            </Badge>
                          </Button>
                          <Button
                            onClick={(e) => {
                              props.onAdd(product);
                              e.stopPropagation();
                            }}
                            className={"like_view_btn"}
                            style={{ right: "36px" }}
                          >
                            <Badge
                              badgeContent={product.product_views}
                              color="secondary"
                            >
                              <Checkbox
                                icon={<Visibility style={{ color: "white" }} />}
                                id={product._id}
                                checkedIcon={
                                  <Visibility style={{ color: "red" }} />
                                }
                              />
                            </Badge>
                          </Button>
                        </Box>
                      </Stack>
                      <Stack className={"product_name"}>
                        {product.product_name}
                      </Stack>
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
                          {product.product_price}
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
                  // count={
                  //   targetSearchObject.page >= 3
                  //     ? targetSearchObject.page + 1
                  //     : 3
                  // }
                  // page={targetSearchObject.page}
                  // renderItem={(item) => (
                  //   <PaginationItem
                  //     components={{
                  //       previous: ArrowBackIcon,
                  //       next: ArrowForwardIcon,
                  //     }}
                  //     {...item}
                  //     className="pagination"
                  //   />
                  // )}
                  //onChange={handlePaginationChange}
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
                              onClick={() => searchCollectionHandler("boy")}
                            >
                              Boy
                            </span>
                          }
                        />
                        <FormControlLabel
                          value="girl"
                          control={
                            <Checkbox
                              style={{ color: "#423123" }}
                              onClick={() => searchCollectionHandler("girl")}
                            />
                          }
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
                          control={
                            <Checkbox
                              style={{ color: "#423123" }}
                              onClick={() => searchCollectionHandler("uni")}
                            />
                          }
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
                          onClick={() => searchCollectionHandler("toy")}
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
                          onClick={() => searchCollectionHandler("clothing")}
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
                          onClick={() => searchCollectionHandler("ride-ons")}
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
                          onClick={() => searchCollectionHandler("gift")}
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
                          onClick={() => searchCollectionHandler("baby care")}
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

          {/* <Stack className="comment_section">
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            style={{ marginTop: "-60px", marginBottom: "30px", marginLeft: "20px" }}
          >
            <Stack className="comment">
              <Stack className="rating">
                <Box className="comment_title">Reviews for the Brand</Box>
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
                    Average Rating of the Brand is
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
        </Stack> */}
        </Stack>
      </Container>
    </div>
  );
}
