import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrieveTopBrands = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topBrands
);
export const retrieveBestProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestProducts
);
export const retrieveSaleProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.saleProducts
);
export const retrieveBestBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestBoArticles
);