import React, { useEffect } from "react";
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
