import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BrandProduct } from "./brandProduct";
import { OneBrand } from "./oneBrand";
import { AllBrands } from "./allBrands";
import "../../../css/brand.css";

export function BrandPage() {
  let brand = useRouteMatch();
  return (
    <div className="brand_page">
      <Switch>
        <Route path={`${brand.path}/products/:product_id`}>
          <BrandProduct />
        </Route>
        <Route path={`${brand.path}/:brand_id`}>
          <OneBrand />
        </Route>
        <Route path={`${brand.path}`}>
          <AllBrands />
        </Route>
      </Switch>
    </div>
  );
}
