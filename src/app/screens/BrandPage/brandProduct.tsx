import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import { Favorite, FavoriteBorder } from "@mui/icons-material";
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
import { useHistory, useParams } from "react-router-dom";
import { Product, ProductRating } from "../../../types/product";
import { Brand } from "../../../types/user";
import ProductApiService from "../../apiServices/productApiService";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenProduct,
  retrieveChosenBrand,
  retrieveTargetComments,
  retrieveTargetProducts,
} from "../../screens/BrandPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenProduct,
  setChosenBrand,
  setTargetComments,
  setTargetProducts,
} from "../../screens/BrandPage/slice";
import BrandApiService from "../../apiServices/brandApiService";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Comments } from "../../../types/follow";
import { CommentsSearchObj, ProductSearchObj } from "../../../types/others";
import CommentApiService from "../../apiServices/commentApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import moment from "moment";
import ScrollToTopFab from "../../scrollToTopFab";
import ProgressBar from "../../components/others/linear";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenProduct: (data: Product) => dispach(setChosenProduct(data)),
  setChosenBrand: (data: Brand) => dispach(setChosenBrand(data)),
  setTargetComments: (data: Comments[]) => dispach(setTargetComments(data)),
  setTargetProducts: (data: Product[]) => dispach(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenBrandRetriever = createSelector(
  retrieveChosenBrand,
  (chosenBrand) => ({
    chosenBrand,
  })
);
const targetCommentsRetriever = createSelector(
  retrieveTargetComments,
  (targetComments) => ({
    targetComments,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

const progress5 = (8 / 20) * 100;
const progress4 = (12 / 20) * 100;
const progress3 = (0 / 20) * 100;
const progress2 = (0 / 20) * 100;
const progress1 = (0 / 20) * 100;

export function BrandProduct(props: any) {
  const chosenProductInfoRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  //** INITIALIZATIONS */
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  let { product_id } = useParams<{ product_id: string }>();
  const {
    setChosenProduct,
    setChosenBrand,
    setTargetComments,
    setTargetProducts,
  } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenBrand } = useSelector(chosenBrandRetriever);
  const { targetComments } = useSelector(targetCommentsRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const [timeRemainingArray, setTimeRemainingArray] = useState<string[]>([]);
  const [timeRemainingArrayOne, setTimeRemainingArrayOne] = useState<string[]>(
    []
  );
  const [targetProductSearchObj, setTargetProductsSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 15,
      order: "product_likes",
      brand_mb_id: "all",
      product_name: "all",
      product_collection: "all",
      product_size: "all",
      product_color: "all",
      product_type: "all",
      product_volume: "all",
    });

  const [targetCommentSearchObj, setTargetCommentSearchObj] =
    useState<CommentsSearchObj>({
      page: 1,
      limit: 3,
      comment_ref_product_id: product_id,
      order: "createdAt",
    });

  const chosenProductHandler = (id: string) => {
    history.push(`/brand/products/${id}`);
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    setProductRebuild(new Date());
  };

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

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

  const formatTimeRemainingOne = (endTime: Date): string => {
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

  const chosenCommentHandler = (id: string) => {
    targetCommentSearchObj.comment_ref_product_id = id;
    setTargetCommentSearchObj({ ...targetCommentSearchObj });
    setProductRebuild(new Date());
  };
  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);

      const brandService = new BrandApiService();
      const brand = await brandService.getChosenBrand(product.brand_mb_id);
      setChosenBrand(brand);
    } catch (err: any) {
      console.log(`productRelatedProcess, ERROR:`, err);
    }
  };

  useEffect(() => {
    productRelatedProcess().then();

    const commentApiService = new CommentApiService();
    commentApiService
      .getTargetComments(targetCommentSearchObj)
      .then((data) => setTargetComments(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [productRebuild, targetCommentSearchObj]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (chosenProduct) {
        setTimeRemainingArrayOne([
          formatTimeRemainingOne(chosenProduct.discount.endDate),
        ]);
      } else {
        setTimeRemainingArrayOne([]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [chosenProduct]);

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
  //** for Creating values *//
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  /** HANDLERS */
  const handleCommentPaginationChange = (event: any, value: number) => {
    window.scrollTo({ left: 0, top: 600, behavior: "smooth" });
    setTargetCommentSearchObj((prevObj) => ({
      ...prevObj,
      page: value,
    }));
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

  const targetLikeComment = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "comment",
      });
      assert.ok(like_result, Definer.auth_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeComment,ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const handleCommentRequest = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const is_fulfilled = comment !== "" && rating !== 0;
      assert.ok(is_fulfilled, Definer.input_err1);
      const comment_data = {
        comment_content: comment,
        product_rating: rating,
        comment_ref_product_id: chosenProduct?._id,
        comment_ref_brand_id: chosenProduct?.brand_mb_id,
      };
      const commentApiService = new CommentApiService();
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
      await commentApiService.createComment(comment_data);
      window.location.reload();
      setComment("");
      setRating(0);
    } catch (err) {
      console.log(err);
      setComment("");
      setRating(0);
      sweetErrorHandling(err).then();
    }
  };

  const passwordKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      handleCommentRequest();
    }
  };

  const CommentDelteHAndler = async (art_id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      let confirmation = window.confirm("Are you sure to delete your article?");
      if (confirmation) {
        const commentApiService = new CommentApiService();
        const comment_result = await commentApiService.CommentArticleDelte(
          art_id
        );
        assert.ok(comment_result, Definer.auth_err1);
        await sweetTopSmallSuccessAlert("success", 700, false);
        setProductRebuild(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const discountedPrice: number = Math.floor(
    chosenProduct?.discountedPrice ?? 0
  );

  return (
    <div className="brand_product" ref={chosenProductInfoRef}>
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
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {chosenProduct?.product_images.map(
                (ele: string, index: number) => {
                  const image_path = `${serverApi}/${ele}`;
                  let discountedPrice = Math.floor(
                    chosenProduct.discountedPrice
                  );
                  return (
                    <SwiperSlide key={ele}>
                      <img className="img" src={image_path} />
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </Stack>
          <Stack className={"chosen_dish_info_container"}>
            <Box className={"chosen_dish_info_box"}>
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <span className={"dish_txt"}>
                  {chosenProduct?.product_name}
                </span>
                <span
                  className={"dish_sale"}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "12px",
                    marginLeft: "0px",
                  }}
                >
                  {chosenProduct?.discountedPrice ? (
                    <>
                      <span
                        className={"dish_sale-txt"}
                        style={{ textDecoration: "underline" }}
                      >
                        {chosenProduct.discount?.type === "amount" ? (
                          <Box className="discount_fon">
                            {chosenProduct.discount?.value}$ Sale
                          </Box>
                        ) : (
                          <Box className="discount_fon">
                            {chosenProduct.discount?.value}% Sale
                          </Box>
                        )}
                      </span>
                      <span
                        style={{
                          marginLeft: "30px",
                          fontSize: "14px",
                          marginTop: "3px",
                        }}
                      >
                        {timeRemainingArrayOne[0] !== "00:00:00"
                          ? timeRemainingArrayOne[0]
                          : ""}
                      </span>
                    </>
                  ) : null}
                </span>
              </Box>

              <div className={"resto_name"}>
                Product of :{" "}
                <span
                  style={{
                    color: "orange",
                    marginLeft: "5px",
                    fontSize: "22px",
                  }}
                >
                  {chosenBrand?.mb_nick}
                </span>
              </div>
              <Box className={"rating_box"}>
                <Rating
                  key={chosenProduct?._id}
                  name="read-only"
                  value={chosenProduct?.product_rating}
                  precision={0.5}
                  readOnly
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
                      icon={<FavoriteBorder style={{ color: "#182b4e" }} />}
                      id={chosenProduct?._id}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      onClick={targetLikeProduct}
                      checked={
                        chosenProduct?.me_liked &&
                        chosenProduct?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                    <span>{chosenProduct?.product_likes}</span>
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
                    <span>{chosenProduct?.product_views}</span>
                  </div>
                </div>
              </Box>
              <div
                className={"resto_name"}
                style={{ marginTop: "10px", width: "100%" }}
              >
                Size :
                <span
                  style={{
                    color: "orange",
                    marginLeft: "5px",
                    fontSize: "20px",
                  }}
                >
                  {chosenProduct?.product_collection === "shoes"
                    ? chosenProduct?.product_volume + " mm"
                    : chosenProduct?.product_size}
                </span>
                <span style={{ marginLeft: "44px" }}>Left in Stock :</span>
                <span
                  style={{
                    color: "orange",
                    marginLeft: "5px",
                    fontSize: "20px",
                  }}
                >
                  {chosenProduct?.product_left_cnt}
                </span>
              </div>
              <div className={"dish_desc_info"} style={{ height: "125px" }}>
                <span className={"resto_name"}>Description :</span>
                <div
                  style={{
                    marginLeft: "77px",
                    fontSize: "18px",
                    marginTop: "5px",
                    height: "78px",
                    fontStyle: "italic",
                  }}
                >
                  Made of organic cotton rib knit stretch fabric that feels
                  gentle and soft on babies' sensitive skin, this coverall is
                  all about comfort the smallest. We have the same overall
                  available for adults.
                </div>
              </div>
              <div className={"dish_price_box"}>
                <span>Price:</span>
                <span>
                  {chosenProduct?.discountedPrice ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginLeft: "55px",
                          textDecorationThickness: "2px",
                          color: "#423127",
                          position: "absolute",
                          
                          zIndex: "3",
                        }}
                      >
                        ${chosenProduct?.product_price}
                      </span>
                      <span
                        style={{
                          color: "orange",
                          fontWeight: "bold",
                          marginRight: "60px",
                        }}
                      >
                        ${discountedPrice}
                      </span>
                    </>
                  ) : (
                    <span>${chosenProduct?.product_price}</span>
                  )}
                </span>
              </div>
              <div className={"button_box"}>
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "770",
                    fontStyle: "Nunito",
                    backgroundColor: "orange",
                  }}
                  onClick={() => {
                    props.onAdd(chosenProduct);
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
                <Box className="comment_title">Reviews for the Product</Box>
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
                    Average Rating of the Product is
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
                    {chosenProduct?.product_rating}{" "}
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontSize: "20px",
                        color: "#724D37",
                        fontWeight: "700",
                        lineHeight: "24px",
                        marginTop: "15px",
                        marginBottom: "4px",
                      }}
                    >
                      out of 5,
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontSize: "26px",
                        color: "#FF961A",
                        fontWeight: "880",
                        lineHeight: "normal",
                        marginBottom: "4px",
                        marginLeft: "40px",
                        marginRight: "8px",
                      }}
                    >
                      {chosenProduct?.product_reviews}
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito",
                        fontSize: "20px",
                        color: "#724D37",
                        fontWeight: "700",
                        lineHeight: "24px",
                        marginTop: "15px",
                        marginBottom: "4px",
                      }}
                    >
                      ratings
                    </span>
                  </div>
                  <div>
                    <Rating
                      key={chosenProduct?._id}
                      name="read-only"
                      value={chosenProduct?.product_rating}
                      precision={0.5}
                      readOnly
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
                    <Box>40%</Box>
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
                      onChange={(event, rating) => {
                        setRating(rating);
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
                      onChange={handleCommentChange}
                      onKeyPress={passwordKeyDownHandler}
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
                      onClick={handleCommentRequest}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Stack>
            </Stack>
            <Stack className="reviews">
              <Stack>
                {targetComments.length > 0 ? (
                  targetComments.map((comment: Comments) => {
                    const image_member = comment?.member_data?.mb_image
                      ? `${serverApi}/${comment?.member_data?.mb_image}`
                      : "/icons/default_user.svg";

                    return (
                      <Stack className="review_box" key={comment._id}>
                        <Box>
                          <img
                            src={image_member}
                            style={{
                              width: "95px",
                              height: "99px",
                              marginLeft: "30px",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                        <Stack
                          style={{
                            marginLeft: "30px",
                            marginTop: "35px",
                            flexDirection: "column",
                          }}
                        >
                          <Stack style={{ flexDirection: "row" }}>
                            <Box style={{ width: "150px" }}>
                              <div className={"review_txt"}>
                                {comment?.member_data?.mb_nick}
                              </div>
                              <div className={"review_date"}>
                                {moment(comment?.createdAt).format(
                                  "YYYY.MM.DD     HH:mm"
                                )}
                              </div>
                              <Rating
                                name="half-rating"
                                value={comment?.product_rating}
                                precision={0.5}
                                style={{
                                  color: "#1876d2",
                                  fontSize: "24px",
                                  marginTop: "10px",
                                }}
                              />
                            </Box>
                            <Stack
                              style={{
                                width: "100px",
                                height: "50px",
                                marginTop: "6px",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginLeft: "122px",
                              }}
                            >
                              <Box style={{}}>
                                {(verifiedMemberData?._id ===
                                  comment.member_data._id ||
                                  verifiedMemberData?.mb_type === "ADMIN") && (
                                  <DeleteIcon
                                    style={{
                                      color: "black",
                                      marginLeft: "2px",
                                      marginTop: "-2px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      CommentDelteHAndler(comment?._id)
                                    }
                                  />
                                )}
                              </Box>
                              <Box style={{ marginLeft: "20px" }}>
                                <span
                                  style={{
                                    fontSize: "16.25px",
                                  }}
                                >
                                  {comment?.comment_likes}
                                </span>
                                <Checkbox
                                  sx={{ mt: "-11px" }}
                                  icon={<ThumbUpOffAltIcon />}
                                  checkedIcon={
                                    <ThumbUpOffAltIcon
                                      style={{ color: "red" }}
                                    />
                                  }
                                  id={comment._id}
                                  onClick={targetLikeComment}
                                  //*@ts-ignore
                                  checked={
                                    comment?.me_liked &&
                                    comment?.me_liked[0]?.my_favorite
                                      ? true
                                      : false
                                  }
                                />
                              </Box>
                            </Stack>
                          </Stack>
                          <Box>
                            <p className={"review_info"}>
                              - {comment?.comment_content}
                            </p>
                          </Box>
                        </Stack>
                      </Stack>
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "285px",
                      color: "#cccccc",
                      marginBottom: "285px",
                      fontSize: "40px",
                      fontWeight: "660",
                      fontFamily: "nunito",
                    }}
                  >
                    {targetCommentSearchObj.page == 1
                      ? "Feel free to evaluate our product"
                      : "No comments found on this page"}
                  </div>
                )}
              </Stack>
              <Stack>
                <Box marginBottom={"12px"} width={"600px"}>
                  <Marginer direction="horizontal" height="1" bg="#ffa500" />
                </Box>
                <Stack>
                  <Pagination
                    count={
                      targetCommentSearchObj.page >= 3
                        ? targetCommentSearchObj.page + 1
                        : 3
                    }
                    page={targetCommentSearchObj.page}
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
                    onChange={(event, value) => handleCommentPaginationChange(event, value)}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="best_pro">
          <Stack className={"chosen_p_products_main"}>
            <Box className={"p_products_text"}>
              <span className={"title"}>You also may like these</span>
            </Box>
            <Stack className="swiper">
              <Box className={"prev_btn Brand-prev"}>
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
                  nextEl: ".Brand-next",
                  prevEl: ".Brand-prev",
                }}
              >
                {targetProducts.map((product: Product, index: number) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  let discountedPrice = Math.floor(product.discountedPrice);
                  return (
                    <SwiperSlide
                      className={"product_info_frame"}
                      key={product._id}
                    >
                      <Stack
                        className={"product-box"}
                        key={product._id}
                        onClick={() => {
                          chosenProductHandler(product._id);
                          chosenCommentHandler(product._id);
                        }}
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
                              color="secondary"
                            >
                              <Checkbox
                                icon={
                                  <FavoriteBorder
                                    style={{
                                      color: "white",
                                    }}
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
                          value={product?.product_rating}
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
              <Box className={"next_btn Brand-next"} style={{ color: "white" }}>
                <ArrowForwardIosNewIcon
                  style={{ color: "#1876d2", fontSize: "40px" }}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <ScrollToTopFab />
      </Container>
    </div>
  );
}
