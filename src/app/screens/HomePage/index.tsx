import React from "react";
import { Container } from "@mui/material";
import { Entrance } from "./entrance";
import { Events } from "./events";
import { TopBrands } from "./topBrands";
import { Statistics } from "./statistics";
import { PopularProducts } from "./popularProducts";
import { OurOffers } from "./ourOffers";
import { Articles } from "./articles";
import "../../../css/home.css";

export function HomePage() {
  return (
    <div className="homepage">
      <Entrance />
      <Events />
      <TopBrands />
      <Statistics />
      <PopularProducts />
      <OurOffers />
      <Articles />
    </div>
  );
}
