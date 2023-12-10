import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import assert from "assert";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestProducts } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveBestProducts } from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { ProductSearch } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

//SwiperCore.use([Autoplay, Navigation, Pagination]);

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setBestProducts: (data: Product[]) => dispach(setBestProducts(data)),
});

/** REDUX SELECTOR */
const bestProductsRetriever = createSelector(
  retrieveBestProducts,
  (bestProducts) => ({
    bestProducts,
  })
);

export function BestProducts() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setBestProducts } = actionDispatch(useDispatch());
  const { bestProducts } = useSelector(bestProductsRetriever);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({
        page: 1,
        limit: 15,
        order: "product_likes",
        product_name: "all",
        product_collection: "all",
        product_size: "all",
        product_color: "all",
      })
      .then((data) => setBestProducts(data))
      .catch((err) => console.log(err));
  }, [productRebuild]);

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

  return (
    <div className="p_products_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"p_products_main"}>
          <Box className={"p_products_text"}>
            <span className={"title"}>Popular Sellers this Week</span>
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
              {bestProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                return (
                  <SwiperSlide className={"product_info_frame"}>
                    <Stack
                      className={"product-box"}
                      key={product._id}
                      onClick={() => chosenProductHandler(product._id)}
                    >
                      <Box
                        className={"img"}
                        sx={{
                          backgroundImage: `url(${image_path})`,
                        }}
                      >
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
                          <Badge badgeContent={16} color="secondary">
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
                        {product.discountedPrice}
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
