import React, { useEffect, } from "react";
import { Container, Box, Stack, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, Visibility } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
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
  const [targetProduct, setTargetProduct] = useState<ProductSearch>({
    page: 1,
    limit: 15,
    order: "product_reviews",
    brand_mb_id: "all",
    product_name: "all",
    product_collection: "all",
    product_size: "all",
    product_color: "all",
    product_type: "all",
  });
  const [] = useState<string[]>([]);

  /** HANDLERS */
  const chosenProductHandler = (id: string) => {
    history.push(`brand/products/${id}`);
  };

  useEffect(() => {
    const productApiService = new ProductApiService();
    productApiService
      .getTargetProducts(targetProduct)
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productRebuild]);

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
                        >
                          <Badge badgeContent={8} color="secondary">
                            <Checkbox
                              icon={<Favorite style={{ color: "white" }} />}
                              checkedIcon={
                                <Favorite style={{ color: "red" }} />
                              }
                              //checked={checked}
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
                      >{product.product_price}
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
