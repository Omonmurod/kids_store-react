import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenProduct } from "./chosenProduct";
import { AllProducts } from "./allProducts";
import "../../../css/product.css";

export function ProductPage() {
  let product = useRouteMatch();
  console.log(product);
  return (
    <div className="product_page">
      <Switch>
        <Route path={`${product.path}/:product_id`}><ChosenProduct /></Route>
        <Route path={`${product.path}`}><AllProducts /></Route>
      </Switch>
    </div>
  );
}