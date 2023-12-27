import React, { useLayoutEffect } from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import Marginer from "../marginer";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { useHistory } from "react-router-dom";

/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

export default function ProcessOrders(props: any) {
  /** INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm("Confirm delivery of your order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        setTimeout(() => {
          props.setOrderRebuild(new Date());
          props.setValue("3");
        }, 500); 
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders.length > 0 ? (
          processOrders.map((order: Order) => {
            return (
              <Stack className={"order_main_box"}>
                <Stack className="order-top">
                  <Box className="order-name">
                    <div>Product</div>
                    <div>Price</div>
                    <div>Qty</div>
                    <div>Total</div>
                  </Box>
                  <Box sx={{ borderBottom: 1, borderColor: "#facb95" }}></Box>
                  <Stack className={"order_box_scroll"}>
                    {order.order_items.map((item) => {
                      const product: Product = order.product_data.filter(
                        (ele) => ele._id === item.product_id
                      )[0];
                      const image_path = `${serverApi}/${product.product_images[0]}`;
                      return (
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          width={"100%"}
                        >
                          <Box className={"ordersName_price"}>
                            <Box className="order-img">
                              <img src={image_path} className="orderDishImg" />
                            </Box>
                            <Box className="order-info">
                              <div
                                style={{
                                  width: "26%",
                                  fontSize: "18px",
                                  letterSpacing: "0.8px",
                                }}
                              >
                                {product.product_name}
                              </div>
                              <div
                                style={{ width: "4%", marginLeft: "-120px" }}
                              >
                                ${item.item_price}
                              </div>
                              <div style={{ width: "4%" }}>
                                {item.item_quantity}
                              </div>
                              <div style={{ width: "4%" }}>
                                ${item.item_price * item.item_quantity}
                              </div>
                            </Box>
                          </Box>
                          <Box
                            sx={{ borderBottom: 1, borderColor: "#facb95" }}
                          ></Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>

                <Stack className={"total_price_box"}>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-evenly"}
                  >
                    <Box height={"60px"}>
                      <div
                        style={{
                          display: "flex",
                          fontFamily: "Nunito",
                          fontSize: "35px",
                          color: "orange",
                          fontWeight: "880",
                          marginTop: "20px",
                        }}
                      >
                        Delivery
                      </div>
                    </Box>
                    <Box>
                      <div
                        style={{
                          display: "flex",
                          fontFamily: "Nunito",
                          fontSize: "14px",
                          color: "#b0b0b0",
                          fontWeight: "770",
                          marginTop: "15px",
                        }}
                      >
                        Address
                      </div>
                      <div
                        style={{
                          display: "flex",
                          fontFamily: "Nunito",
                          fontSize: "18px",
                          color: "#423127",
                          fontWeight: "770",
                        }}
                      >
                        Track your Order
                      </div>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "#d6d8ff",
                      marginTop: "20px",
                    }}
                  ></Box>
                  <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    width={"100%"}
                    justifyContent={"space-evenly"}
                  >
                    <Stack
                      className="order-total"
                      style={{ marginTop: "20px" }}
                    >
                      <Box>
                        <div
                          style={{
                            color: "orange",
                            fontFamily: "Nunito",
                            fontSize: "35px",
                            fontWeight: "880",
                            lineHeight: "normal",
                            fontStyle: "normal",
                          }}
                        >
                          Cart Totals
                        </div>
                      </Box>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        marginTop={"35px"}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          marginBottom={"20px"}
                        >
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "14px",
                              fontWeight: "880",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            Cart Subtotal
                          </div>
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "16px",
                              fontWeight: "550",
                              lineHeight: "24px",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            $
                            {order.order_total_amount -
                              order.order_delivery_cost}
                          </div>
                        </Box>
                        <Marginer
                          direction="horizontal"
                          height="1"
                          bg="#d6d8ff"
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          marginTop={"25px"}
                          marginBottom={"20px"}
                        >
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "14px",
                              fontWeight: "880",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            Shipping Fee
                          </div>
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "16px",
                              fontWeight: "550",
                              lineHeight: "24px",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            ${order.order_delivery_cost}
                          </div>
                        </Box>
                        <Marginer
                          direction="horizontal"
                          height="1"
                          bg="#d6d8ff"
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          marginTop={"15px"}
                        >
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "14px",
                              fontWeight: "880",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            Order Total
                          </div>
                          <div
                            style={{
                              color: "#423127",
                              fontFamily: "Nunito",
                              fontSize: "16px",
                              fontWeight: "770",
                              lineHeight: "24px",
                              fontStyle: "normal",
                              textTransform: "uppercase",
                            }}
                          >
                            ${order.order_total_amount}
                          </div>
                        </Box>
                      </Box>
                    </Stack>
                    <Marginer
                      direction="vertical"
                      height="310"
                      width="1"
                      bg="#d6d8ff"
                    />
                    <Stack className="order-receive">
                      <Box>
                        <img
                          src="/icons/order-receive.jpeg"
                          style={{
                            width: "400px",
                            borderRadius: "12px",
                            boxShadow: "0px 10px 10px 0px rgb(0 0 0 / 10%)",
                          }}
                        />
                      </Box>
                      <Box>
                        <Button
                          value={order._id}
                          onClick={finishOrderHandler}
                          variant="contained"
                          style={{
                            borderRadius: "30px",
                            color: "#ffffff",
                            // background: "#ff7e9a",
                            background: "orange",
                            fontFamily: "Nunito",
                            width: "160px",
                            height: "45px",
                            marginLeft: "20px",
                            marginTop: "105px",
                            fontWeight: "800",
                            fontSize: "16px",
                          }}
                        >
                          Received
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            );
          })
        ) : (
          <p
            style={{
              fontWeight: "660",
              fontSize: "40px",
              height: "250px",
              fontFamily: "nunito",
              color: "#cccccc",
              marginLeft: "330px",
              marginTop: "120px",
            }}
          >
            You do not have any orders yet
          </p>
        )}
      </Stack>
    </TabPanel>
  );
}
