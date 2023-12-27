import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { CartItem } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import OrderApiService from "../../apiServices/orderApiService";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

export default function Basket(props: any) {
  /** INITIALIZATIONS **/
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const itemsPrice = cartItems.reduce(
    (a: any, c: CartItem) => a + c.price * c.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 5;
  const totalPrice = itemsPrice + shippingPrice;

  /** HANDLERS **/
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const processOrderHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const order = new OrderApiService();
      await order.createOrder(cartItems);

      onDeleteAll();
      handleClose();

      props.setOrderRebuild(new Date());
      history.push("/orders");
    } catch (err: any) {
      console.log(err);
      handleClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img
            src={"/auth/shopping-cart.png"}
            style={{ width: "35px", marginLeft: "10px", marginRight: "10px" }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket_frame"}>
          <Box className={"all_check_box"}>
            <div>
              <span>My Cart Items:</span>
              {cartItems.length > 0 ? (
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "125px",
                    fontSize: "15.5px",
                    fontWeight: "710",
                    color: "#1876d2",
                    textDecoration: "underline",
                  }}
                  onClick={onDeleteAll}
                >
                  Delete All
                </span>
              ) : (
                ""
              )}
            </div>
          </Box>
          <Box className={"orders_main_wrapper"}>
            {cartItems.length > 0 ? (
              <Box className={"orders_wrapper"}>
                {cartItems?.map((item: CartItem) => {
                  const image_path = `${serverApi}/${item.image}`;
                  return (
                    <Box className={"basket_info_box"} key={item._id}>
                      <div className={"cancel_btn"}>
                        <CancelIcon
                          color={"primary"}
                          onClick={() => onDelete(item)}
                        />
                      </div>
                      <img src={image_path} className={"product_img"} />
                      <span className={"product_name"}>{item.name}</span>
                      <p className={"product_price"}>
                        ${item.price} x {item.quantity}
                      </p>
                      <Box sx={{ minWidth: 100, marginLeft: "10px" }}>
                        <div className="col-2">
                          <button
                            onClick={() => onRemove(item)}
                            className="remove"
                            style={{
                              cursor: "pointer",
                              fontSize: "17px",
                              width: "24px",
                            }}
                          >
                            -
                          </button>{" "}
                          <button
                            style={{
                              cursor: "pointer",
                              marginLeft: "4px",
                              fontSize: "17px",
                            }}
                            onClick={() => onAdd(item)}
                            className="add"
                          >
                            +
                          </button>
                        </div>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <div
                style={{
                  color: "#cccccc",
                  fontFamily: "nunito",
                  fontSize: "24px",
                  fontWeight: "660",
                  marginLeft: "165px",
                  marginTop: "85px",
                }}
              >
                Cart is empty
              </div>
            )}
          </Box>

          {cartItems.length > 0 ? (
            <Box className={"to_order_box"}>
              <span className={"price_text"}>
                Total : ${totalPrice} ({itemsPrice} + {shippingPrice})
              </span>
              <Button
                onClick={processOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                style={{
                  fontFamily: "Nunito",
                  fontSize: "16px",
                  fontWeight: "770",
                  letterSpacing: "1.5px",
                  marginRight: "35px",
                }}
              >
                Order
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
