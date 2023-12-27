import React, { useLayoutEffect } from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Marginer from "../marginer";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);
export default function FinishedOrders(props: any) {
  /** INITIALIZATIONS */
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders.length > 0 ? (
          finishedOrders?.map((order: Order) => {
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
                          color: "red",
                          fontWeight: "770",
                        }}
                      >
                        Delivery Completed
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
                    <Stack className="order-complete">
                      <Box>
                        <img
                          src="/icons/delivery-complete.jpeg"
                          style={{
                            width: "400px",
                            borderRadius: "12px",
                            boxShadow: "0px 10px 10px 0px rgb(0 0 0 / 10%)",
                          }}
                        />
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
