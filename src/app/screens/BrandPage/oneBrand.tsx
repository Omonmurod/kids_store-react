import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import Marginer from "../../components/marginer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import BrandApiService from "../../apiServices/brandApiService";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { ProductSearchObj, SearchObj } from "../../../types/others";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import Typography from "@mui/material/Typography";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenBrand,
  retrieveRandomBrands,
  retrieveTargetProducts,
} from "../../screens/BrandPage/selector";
import { Brand } from "../../../types/user";
import { Dispatch, createAction } from "@reduxjs/toolkit";
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
import { verifiedMemberData } from "../../apiServices/verify";
import ScrollToTopFab from "../../scrollToTopFab";
import ChatIcon from "@mui/icons-material/Chat";

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
  const [scrollDisabled, setScrollDisabled] = useState(true);
  let { brand_id } = useParams<{ brand_id: string }>();
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
      product_name: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
      product_volume: "all",
    });
  const [timeRemainingArray, setTimeRemainingArray] = useState<string[]>([]);

  const formatTimeRemaining = (endTime: Date): string => {
    const now = new Date();
    const endDate = new Date(endTime);
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return "00:00:00";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days > 0 ? `${days}d ` : ""}${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const history = useHistory();
  const refs: any = useRef([]);
  const { product } = props;
  useEffect(() => {
    console.log("Product:", product);
  }, [product]);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  useEffect(() => {
    const brandService = new BrandApiService();
    brandService
      .getBrands({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomBrands(data))
      .catch((err) => console.log(err));

    brandService
      .getChosenBrand(chosenBrandId)
      .then((data) => setChosenBrand(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenBrandId, targetProductSearchObj, productRebuild]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemainingArray(
        targetProducts.map((product: Product) =>
          formatTimeRemaining(product.discount.endDate)
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetProducts]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    setchosenBrandId(id);
    targetProductSearchObj.brand_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/brand/${id}`);
  };
  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_name = event.target.value;
    targetProductSearchObj.product_collection = "all";
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  /** Enabling search */

  const handleSearchIconClick = () => {
    // Perform the search with the searchValue
    console.log(
      "targetProductSearchObj.product_name:",
      targetProductSearchObj.product_name
    );
  };

  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetProductSearchObj.page = value;
    window.scrollTo({ left: 0, top: 60, behavior: "smooth" });
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const chosenProductHandler = (id: string) => {
    history.push(`/brand/products/${id}`);
  };

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
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
                prevEl: ".restaurant-prev",
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
            <span className="category_title">{chosenBrand?.mb_nick}</span>
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
                {targetProducts.length > 0 ? (
                  targetProducts.map((product: Product, index: number) => {
                    const image_path = `${serverApi}/${product.product_images[0]}`;
                    let discountedPrice = Math.floor(product.discountedPrice);
                    return (
                      <Stack className="shop_product-info">
                        <Stack
                          className={"product-box"}
                          key={`${product._id}`}
                          onClick={() => chosenProductHandler(product._id)}
                        >
                          <Box
                            className={"img"}
                            sx={{
                              backgroundImage: `url(${image_path})`,
                            }}
                          >
                            {product.discountedPrice !== 0 && (
                              <Box className={"dish_sale"}>
                                <span className={"dish_sale-txt"}>
                                  {product.discount?.type === "amount" ? (
                                    <Box className="discount_fon">
                                      -{product.discount?.value}$
                                    </Box>
                                  ) : (
                                    <Box className="discount_fon">
                                      -{product.discount?.value}%
                                    </Box>
                                  )}
                                </span>
                                <span className="endDate">
                                  {product.discountedPrice ? (
                                    <span className={"discount_timer"}>
                                      {timeRemainingArray[index]}
                                    </span>
                                  ) : null}
                                </span>
                              </Box>
                            )}

                            <Button
                              className={"like_view_btn"}
                              style={{ left: "36px" }}
                            >
                              <Badge
                                badgeContent={product.product_likes}
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  console.log("Badge clicked!");
                                  console.log(
                                    "product_likes:",
                                    product.product_likes
                                  );
                                  console.log(
                                    "my_favorite value:",
                                    product?.me_liked?.[0]?.my_favorite
                                  );
                                }}
                                color="secondary"
                              >
                                <Checkbox
                                  icon={
                                    <FavoriteBorder
                                      style={{ color: "white" }}
                                    />
                                  }
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
                                badgeContent={product.product_reviews}
                                color="secondary"
                              >
                                <ChatIcon style={{ color: "white" }} />
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
                            defaultValue={0}
                            value={product.product_rating}
                            precision={0.5}
                          />
                        </Stack>
                        <Stack className={"price"}>
                          <span
                            style={{
                              fontFamily: "Nunito",
                              fontWeight: "900",
                              color: "orange",
                              fontSize: "20px",
                              marginLeft: product.discountedPrice
                                ? "0px"
                                : "20px",
                            }}
                          >
                            $
                            {product.discountedPrice ? (
                              <>
                                <span
                                  style={{
                                    color: "orange",
                                    position: "relative",
                                  }}
                                >
                                  {product.product_price}
                                  <span
                                    style={{
                                      position: "absolute",
                                      bottom: "50%",
                                      left: 0,
                                      right: 0,
                                      height: "3px",
                                      backgroundColor: "orange",
                                    }}
                                  ></span>
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Nunito",
                                    fontWeight: "900",
                                    color: "#423127",
                                    fontSize: "20px",
                                    marginLeft: "6px",
                                  }}
                                >
                                  ${discountedPrice}
                                </span>
                              </>
                            ) : (
                              <>
                                <span>{product.product_price}</span>
                              </>
                            )}
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
                            onClick={(e) => {
                              props.onAdd(product);
                              e.stopPropagation();
                            }}
                          >
                            ADD TO CART
                          </Button>
                        </Stack>
                      </Stack>
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "200px",
                      color: "#cccccc",
                      marginBottom: "600px",
                      fontSize: "40px",
                      fontWeight: "660",
                      fontFamily: "nunito",
                      marginLeft: "100px",
                    }}
                  >
                    No products found on this page
                  </div>
                )}
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
                    count={
                      targetProductSearchObj.page >= 3
                        ? targetProductSearchObj.page + 1
                        : 3
                    }
                    page={targetProductSearchObj.page}
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
                    onChange={handlePaginationChange}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack className="right_shop">
              <Stack
                className={`right_shop-top ${
                  scrollDisabled ? "no-scroll" : ""
                }`}
              >
                <Stack className="search">
                  <Box className="right_shop-title">Search</Box>
                  <Box className={"search_big_box"}>
                    <input
                      className="search_product_input"
                      type={"search"}
                      name={"resSearch"}
                      placeholder={"Input product name here ..."}
                      onChange={changeNameHandler}
                    />
                    <Button
                      className={"button_search"}
                      variant="contained"
                      endIcon={<SearchIcon onClick={handleSearchIconClick} />}
                    ></Button>
                  </Box>
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
                    <Box
                      className="category_info1"
                      style={{ marginLeft: "5px" }}
                    >
                      <div>
                        <img
                          src="/icons/category6.jpeg"
                          style={{ width: "165px", borderRadius: "20px" }}
                          onClick={() => searchCollectionHandler("shoes")}
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
                          Baby Shoes
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
                      style={{ marginLeft: "5px" }}
                    >
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
                            borderRadius: "20px",
                          }}
                          onClick={() => searchCollectionHandler("baby care")}
                        />
                      </div>
                      <div
                        style={{
                          width: "160px",
                          marginTop: "8px",
                          marginLeft: "8px",
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
                          Baby Care Products
                        </span>
                      </div>
                    </Box>
                    <Box
                      className="category_info1"
                      style={{ marginLeft: "5px" }}
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
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <ScrollToTopFab />
      </Container>
    </div>
  );
}
