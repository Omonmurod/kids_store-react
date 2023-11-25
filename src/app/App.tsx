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
  /** INITIALIZATIONS */
  const [path, setPath] = useState();
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  /** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <Router>
      <Navbar
        setPath={setPath}
        handleLoginOpen={handleLoginOpen}
        handleSignUpOpen={handleSignUpOpen}
      />
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
      <AuthenticationModel
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
      />
    </Router>
  );
}

export default App;
