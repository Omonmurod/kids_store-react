import React, { useEffect, useLayoutEffect } from "react";
import { Entrance } from "./entrance";
import { Events } from "./events";
import { TopBrands } from "./topBrands";
import { Statistics } from "./statistics";
import { BestProducts } from "./bestProducts";
import { OurOffers } from "./ourOffers";
import { Articles } from "./articles";
import { Advertisements } from "./advertisements";
import "../../../css/home.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopBrands } from "../../screens/HomePage/slice";
import { retrieveTopBrands } from "../../screens/HomePage/selector";
import { Brand } from "../../../types/user";
import BrandApiService from "../../apiServices/brandApiService";
import ScrollToTopFab from "../../scrollToTopFab";
import { SaleProducts } from "./saleProducts";
import { useHistory } from "react-router-dom";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTopBrands: (data: Brand[]) => dispach(setTopBrands(data)),
});

/** REDUX SELECTOR */
const topBrandsRetriever = createSelector(retrieveTopBrands, (topBrands) => ({
  topBrands,
}));

export function HomePage(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setTopBrands } = actionDispatch(useDispatch());

  useEffect(() => {
    const brandService = new BrandApiService();
    brandService
      .getTopBrands()
      .then((data) => {
        setTopBrands(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  return (
    <div className="homepage">
      <Entrance />
      <Statistics />
      <Events />
      <TopBrands />
      <BestProducts onAdd={props.onAdd} />
      <SaleProducts onAdd={props.onAdd} />
      <Advertisements />
      <OurOffers />
      <Articles />
      <ScrollToTopFab />
    </div>
  );
}
