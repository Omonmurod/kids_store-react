import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MemberPage } from "./screens/MemberPage";
import { OrdersPage } from "./screens/OrdersPage";
import { CommunityPage } from "./screens/CommunityPage";
import { BrandPage } from "./screens/BrandPage";
import { AboutPage } from "./screens/AboutPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { Navbar } from "./components/header";
import { Footer } from "./components/footer";
import { ProductPage } from "./screens/ProductPage";
import AuthenticationModel from "./components/auth";

function App() {
  const [path, setPath] = useState();

  return (
    <Router>
      <Navbar setPath={setPath} />
      <Switch>
        <Route path="/products">
          <ProductPage />
        </Route>
        <Route path="/brand">
          <BrandPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthenticationModel />
    </Router>
  );
}

export default App;
