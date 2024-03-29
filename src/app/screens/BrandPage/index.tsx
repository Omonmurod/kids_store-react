import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { BrandProduct } from "./brandProduct";
import { OneBrand } from "./oneBrand";
import { AllBrands } from "./allBrands";
import "../../../css/brand.css";

export function BrandPage(props: any) {
  let brand = useRouteMatch();
  return (
    <div className="brand_page">
      <Switch>
        <Route path={`${brand.path}/products/:product_id`}>
          <BrandProduct onAdd={props.onAdd}/>
        </Route>
        <Route path={`${brand.path}/:brand_id`}>
          <OneBrand onAdd={props.onAdd}/>
        </Route>
        <Route path={`${brand.path}`}>
          <AllBrands />
        </Route>
      </Switch>
    </div>
  );
}
