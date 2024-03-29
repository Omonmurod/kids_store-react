import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topBrands: [],
  bestProducts: [],
  saleProducts: [],
  bestBoArticles: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopBrands: (state, action) => {
      state.topBrands = action.payload;
    },
    setBestProducts: (state, action) => {
      state.bestProducts = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
  },
});

export const { setTopBrands, setBestProducts, setSaleProducts, setBestBoArticles } =
  HomePageSlice.actions;

  const HomePageReducer = HomePageSlice.reducer;
  export default HomePageReducer;
