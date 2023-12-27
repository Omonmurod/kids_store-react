import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/chat.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
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
import { Member } from "../types/user";
import { serverApi } from "../lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
  sweetTopSuccessAlert,
} from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import assert from "assert";
import MemberApiService from "./apiServices/memberApiService";
import "../app/apiServices/verify";
import { CartItem } from "../types/others";
import { Product } from "../types/product";
import { CommunityChats } from "./components/chatting/communityChats";
import { MobileVersion } from "../app/screens/MobileVersion";

function App() {
  /** INITIALIZATIONS */
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
  const open = Boolean(anchorEl);
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);
  const [openAlert, setOpenAlert] = React.useState(false);

  useEffect(() => {
    console.log("=== useEffect: App ===");
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`
        : "/icons/default_user.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);

  /** HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const history = useHistory<History>();
  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("See You Soon! 👋 ", 1000, true);
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      sweetTopSmallSuccessAlert("Added 🎉", 1000, false);
    } else {
      if (product.discountedPrice !== 0) {
        let discountedPrice = Math.floor(product.discountedPrice);
        const new_item: CartItem = {
          _id: product._id,
          quantity: 1,
          name: product.product_name,
          price: discountedPrice,
          image: product.product_images[0],
        };
        const cart_updated = [...cartItems, { ...new_item }];
        setCartItems(cart_updated);
        localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        sweetTopSmallSuccessAlert("Added 🎉", 1000, false);
      } else {
        const new_item: CartItem = {
          _id: product._id,
          quantity: 1,
          name: product.product_name,
          price: product.product_price,
          image: product.product_images[0],
        };
        const cart_updated = [...cartItems, { ...new_item }];
        setCartItems(cart_updated);
        localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        sweetTopSmallSuccessAlert("Added 🎉", 1000, false);
      }
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      sweetTopSmallSuccessAlert("Removed", 1000, false);
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
      sweetTopSmallSuccessAlert("Removed", 1000, false);
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    sweetTopSmallSuccessAlert("Removed", 1000, false);
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
    sweetTopSmallSuccessAlert("Deleted", 1000, false);
  };

  const handleClickOpenAlert = () => {
    history.push("/construction");
  };

  return (
    <Router>
      <Navbar
        setPath={setPath}
        handleLoginOpen={handleLoginOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleCloseLogOut={handleCloseLogOut}
        handleLogOutClick={handleLogOutClick}
        handleLogOutRequest={handleLogOutRequest}
        anchorEl={anchorEl}
        open={open}
        verifiedMemberData={verifiedMemberData}
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
        setOrderRebuild={setOrderRebuild}
      />
      <Switch>
        <Route path="/products">
          <ProductPage />
        </Route>
        <Route path="/brand">
          <BrandPage onAdd={onAdd}/>
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
          />
        </Route>
        <Route path="/member-page">
          <MemberPage onAdd={onAdd}/>
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/mobile">
          <MobileVersion
            openAlert={openAlert}
            handleClickOpenAlert={handleClickOpenAlert}
            setPath={setPath}
          />
        </Route>
        <Route path={["/home", "/"]}>
          <HomePage onAdd={onAdd} />
        </Route>
      </Switch>
      <CommunityChats />
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
