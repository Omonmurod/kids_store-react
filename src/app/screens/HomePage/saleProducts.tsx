import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import assert from "assert";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestProducts, setSaleProducts } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveBestProducts, retrieveSaleProducts } from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { ProductSearch } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setSaleProducts: (data: Product[]) => dispach(setSaleProducts(data)),
});

/** REDUX SELECTOR */
const saleProductsRetriever = createSelector(
  retrieveSaleProducts,
  (saleProducts) => ({
    saleProducts,
  })
);

export function SaleProducts(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({
        page: 1,
        limit: 15,
        order: "discount.value",
        product_name: "all",
        product_collection: "all",
        brand_mb_id: "all",
        product_size: "all",
        product_color: "all",
        product_volume: "all",
      })
      .then((data) => setSaleProducts(data))
      .catch((err) => console.log(err));
  }, [productRebuild]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemainingArray(
        saleProducts.map((product: Product) =>
          formatTimeRemaining(product.discount.endDate)
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [saleProducts]);

  /** HANDLERS */
  const chosenProductHandler = (id: string) => {
    history.push(`brand/products/${id}`);
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

  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div
        className="p_products_sale"
        style={{
          width: "430px",
        }}
      >
        <Container sx={{ overflow: "hidden" }}>
          <Stack className={"p_products_main"}>
            <Box className={"p_products_text"}>
              <span
                className={"title"}
                style={{ marginTop: "20px", fontSize: "36px" }}
              >
                Products on Sale
              </span>
            </Box>
            <Stack className="swiper">
              <Swiper
                className={"swiper_wrapper"}
                slidesPerView={1}
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
                {saleProducts.map((product: Product, index: number) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  let discountedPrice = Math.floor(product.discountedPrice);
                  return (
                    <SwiperSlide className={"product_info_frame"}>
                      <Stack
                        className={"product-box"}
                        key={product._id}
                        onClick={() => {
                          window.location.href = "/mobile";
                        }}
                      >
                        <Box
                          className={"img"}
                          sx={{
                            backgroundImage: `url(${image_path})`,
                            marginLeft: "170px",
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
                        </Box>
                      </Stack>
                      <Stack
                        className={"product_name"}
                        style={{ marginLeft: "90px" }}
                      >
                        {product.product_name}
                      </Stack>
                      <Stack
                        className={"rating_box"}
                        style={{ marginLeft: "20px" }}
                      >
                        <Rating
                          className="half-rating"
                          defaultValue={0}
                          precision={0.5}
                          value={product.product_rating}
                        />
                      </Stack>
                      <Stack
                        className={"price"}
                        style={{ marginLeft: "170px" }}
                      >
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
                        marginLeft={"45px"}
                        marginTop={"15px"}
                        style={{ marginLeft: "130px" }}
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
                            marginBottom: "35px",
                          }}
                          onClick={(e) => {
                            props.onAdd(product);
                            e.stopPropagation();
                          }}
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
  } else {
    return (
      <div className="p_products_sale">
        <Container sx={{ overflow: "hidden" }}>
          <Stack className={"p_products_main"}>
            <Box className={"p_products_text"}>
              <span className={"title"}>Products on Sale</span>
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
                {saleProducts.map((product: Product, index: number) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  let discountedPrice = Math.floor(product.discountedPrice);
                  return (
                    <SwiperSlide
                      className={"product_info_frame"}
                      key={product._id}
                    >
                      <Stack
                        className={"product-box"}
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
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
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
                                  <FavoriteBorder style={{ color: "white" }} />
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
                          precision={0.5}
                          value={product.product_rating}
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
                          onClick={(e) => {
                            props.onAdd(product);
                            e.stopPropagation();
                          }}
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
}
