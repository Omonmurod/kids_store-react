import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import ScrollToTopFab from "../../scrollToTopFab";
import { ProductSearchObj } from "../../../types/others";
import BrandApiService from "../../apiServices/brandApiService";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenBrand: (data: Brand) => dispach(setChosenBrand(data)),
  setTargetProducts: (data: Product[]) => dispach(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const chosenBrandRetriever = createSelector(
  retrieveChosenBrand,
  (chosenBrand) => ({ chosenBrand })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({ targetProducts })
);

export function OurOffers() {
  let { brand_id } = useParams<{ brand_id: string }>();
  const { chosenBrand } = useSelector(chosenBrandRetriever);
  const { setChosenBrand } = actionDispatch(useDispatch());
  const [chosenBrandId, setchosenBrandId] = useState<string>(brand_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "createdAt",
      brand_mb_id: brand_id,
      product_name: "all",
      product_collection: "clothing",
      product_size: "all",
      product_color: "all",
      product_type: "all",
      product_volume: "all",
    });
  const history = useHistory();
  const refs: any = useRef([]);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0 });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  useEffect(() => {
    const brandService = new BrandApiService();

    brandService
      .getChosenBrand(chosenBrandId)
      .then((data) => setChosenBrand(data))
      .catch((err) => console.log(err));
  }, [chosenBrandId]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    setchosenBrandId(id);
    targetProductSearchObj.brand_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/brand/654d6039a79bbaaa921aaf01`);
  };

  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div className="our-offers" style={{ height: "580px", width: "430px" }}>
        <Container className="our-offers_frame">
          <Box className="title">
            <span
              className="category_title"
              style={{ marginTop: "-60px", fontSize: "36px" }}
            >
              Our Offers
            </span>
          </Box>
          <Stack className="offer-bottom" style={{ marginTop: "-80px" }}>
            <Stack style={{ marginRight: "50px" }}>
              <Stack
                className="info-box1"
                onClick={() => {
                  window.location.href = "/mobile";
                }}
                style={{ width: "400px", marginTop: "-40px" }}
              >
                <Box className="info-img">
                  <img src="/icons/offer1.svg" />
                </Box>
                <Stack className="info">
                  <div
                    className="bottom-info1"
                    style={{
                      fontSize: "16px",
                      marginLeft: "-20px",
                      marginTop: "20px",
                    }}
                  >
                    New Born & Baby Care Shop
                  </div>
                  <div
                    className="bottom-info"
                    style={{ fontSize: "14px", marginLeft: "-20px" }}
                  >
                    Cras efficitur, lacus non luctus facilisis
                  </div>
                </Stack>
              </Stack>
              <Stack
                className="info-box2"
                onClick={() => {
                  window.location.href = "/mobile";
                }}
                style={{ width: "400px", marginTop: "10px" }}
              >
                <Box className="info-img">
                  <img src="/icons/offer2.svg" />
                </Box>
                <Stack className="info">
                  <div
                    className="bottom-info2"
                    style={{
                      fontSize: "16px",
                      marginLeft: "-20px",
                      marginTop: "20px",
                    }}
                  >
                    Toddlers Clothing & Accessories
                  </div>
                  <div
                    className="bottom-info"
                    style={{ fontSize: "14px", marginLeft: "-20px" }}
                  >
                    Etiam vulputate efficitur nibh sed euismod
                  </div>
                </Stack>
              </Stack>
              <Stack
                className="info-box3"
                onClick={() => {
                  window.location.href = "/mobile";
                }}
                style={{ width: "400px", marginTop: "10px" }}
              >
                <Box className="info-img">
                  <img src="/icons/offer3.svg" />
                </Box>
                <Stack className="info">
                  <div
                    className="bottom-info3"
                    style={{
                      fontSize: "16px",
                      marginLeft: "-20px",
                      marginTop: "20px",
                    }}
                  >
                    Toys and Games
                  </div>
                  <div
                    className="bottom-info"
                    style={{ fontSize: "14px", marginLeft: "-20px" }}
                  >
                    Etiam vulputate efficitur nibh sed euismod
                  </div>
                </Stack>
              </Stack>
              <Stack
                className="info-box4"
                onClick={() => {
                  window.location.href = "/mobile";
                }}
                style={{ width: "400px", marginTop: "10px" }}
              >
                <Box className="info-img">
                  <img src="/icons/offer4.svg" />
                </Box>
                <Stack className="info">
                  <div
                    className="bottom-info4"
                    style={{
                      fontSize: "16px",
                      marginLeft: "-20px",
                      marginTop: "20px",
                    }}
                  >
                    Strollers & Ride-Ons
                  </div>
                  <div
                    className="bottom-info"
                    style={{ fontSize: "14px", marginLeft: "-20px" }}
                  >
                    Cras efficitur, lacus non luctus facilisis
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="our-offers">
        <Container className="our-offers_frame">
          <Zoom delay={500}>
            <Box className="title">
              <span className="category_title">Our Offers</span>
            </Box>
          </Zoom>
          <Stack className="offer-bottom">
            <Box className="offer-img">
              <img src="/icons/offer-bunny.png" />
            </Box>
            <Stack style={{ marginRight: "50px" }}>
              <Fade right duration={1350}>
                <Stack
                  className="info-box1"
                  onClick={() => chosenBrandHandler("baby care")}
                >
                  <Box className="info-img">
                    <img src="/icons/offer1.svg" />
                  </Box>
                  <Stack className="info">
                    <div className="bottom-info1">
                      New Born & Baby Care Shop
                    </div>
                    <div className="bottom-info">
                      Cras efficitur, lacus non luctus facilisis
                    </div>
                  </Stack>
                </Stack>
              </Fade>
              <Fade right duration={1550}>
                <Stack
                  className="info-box2"
                  onClick={() => chosenBrandHandler("baby care")}
                >
                  <Box className="info-img">
                    <img src="/icons/offer2.svg" />
                  </Box>
                  <Stack className="info">
                    <div className="bottom-info2">
                      Toddlers Clothing & Accessories
                    </div>
                    <div className="bottom-info">
                      Etiam vulputate efficitur nibh sed euismod
                    </div>
                  </Stack>
                </Stack>
              </Fade>
              <Fade right duration={1750}>
                <Stack
                  className="info-box3"
                  onClick={() => chosenBrandHandler("baby care")}
                >
                  <Box className="info-img">
                    <img src="/icons/offer3.svg" />
                  </Box>
                  <Stack className="info">
                    <div className="bottom-info3">Toys and Games</div>
                    <div className="bottom-info">
                      Etiam vulputate efficitur nibh sed euismod
                    </div>
                  </Stack>
                </Stack>
              </Fade>
              <Fade right duration={1950}>
                <Stack
                  className="info-box4"
                  onClick={() => chosenBrandHandler("baby care")}
                >
                  <Box className="info-img">
                    <img src="/icons/offer4.svg" />
                  </Box>
                  <Stack className="info">
                    <div className="bottom-info4">Strollers & Ride-Ons</div>
                    <div className="bottom-info">
                      Cras efficitur, lacus non luctus facilisis
                    </div>
                  </Stack>
                </Stack>
              </Fade>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}
