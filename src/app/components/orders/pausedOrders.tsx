import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import Marginer from "../marginer";

const pausedOrders = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
];

export default function PausedOrders(props: any) {
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order) => {
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
                  {order.map((item) => {
                    const image_path = `/icons/teddy-bear.jpeg`;
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
                            <div>Sandvich</div>
                            <div>$7</div>
                            <div>3</div>
                            <div>$21</div>
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
                      Address is not Inserted
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
                  <Stack className={"order_right"}>
                    <Box className={"order_payment_info"}>
                      <Box height={"60px"}>
                        <div
                          style={{
                            display: "flex",
                            fontFamily: "Nunito",
                            fontSize: "30px",
                            color: "orange",
                            fontWeight: "770",
                            marginTop: "20px",
                          }}
                        >
                          Payment Methods Info
                        </div>
                      </Box>
                      <Box>
                        <form
                          className={"card_number_form"}
                          action={""}
                          method={""}
                        >
                          <input
                            style={{ marginTop: "5px" }}
                            type="credit card"
                            id="creditCardNumber"
                            name="creditCardNumber"
                            className="cardNumberInput"
                            placeholder={"Card number: 5234 4090 2002 4321"}
                          />
                        </form>
                      </Box>
                      <Box display={"flex"} flexDirection={"row"}>
                        <form
                          className={"card_date_form"}
                          action={""}
                          method={""}
                        >
                          <input
                            type={"input"}
                            className={"cardValidDate"}
                            name={"cardDate"}
                            placeholder={"07/24"}
                          />
                        </form>
                        <form
                          className={"card_date_form"}
                          action={""}
                          method={""}
                        >
                          <input
                            style={{ marginLeft: "8px" }}
                            type={"input"}
                            className={"cardValidDate"}
                            name={"cardCvv"}
                            placeholder={"CVV: 010"}
                          />
                        </form>
                      </Box>
                      <Box>
                        <form
                          className={"card_number_form"}
                          action={""}
                          method={""}
                        >
                          <input
                            style={{ marginTop: "8px" }}
                            type="credit card"
                            id="creditCardName"
                            name="creditCardName"
                            className="cardNumberInput"
                            placeholder={"Jacob Robertson"}
                          />
                        </form>
                        <div
                          style={{
                            marginTop: "15px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <img src="/icons/WesternUnion.png" />
                          <img src="/icons/Maestro.png" />
                          <img src="/icons/Visa.png" />
                          <img src="/icons/MasterCard.png" />
                        </div>
                      </Box>
                    </Box>
                  </Stack>
                  <Marginer
                    direction="vertical"
                    height="315"
                    width="1"
                    bg="#d6d8ff"
                  />
                  <Stack className="order-total">
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
                      marginTop={"25px"}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        marginBottom={"10px"}
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
                          $175
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
                        marginBottom={"10px"}
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
                          $5
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
                          $180
                        </div>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: "30px",
                          color: "#ffffff",
                          // background: "#ff7e9a",
                          background: "#d10302",
                          fontFamily: "Nunito",
                          width: "140px",
                          height: "45px",
                          marginLeft: "70px",
                          marginTop: "25px",
                          fontWeight: "800",
                          fontSize: "16px",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: "30px",
                          color: "#ffffff",
                          // background: "#02bbae",
                          background: "#008001",
                          fontFamily: "Nunito",
                          width: "140px",
                          height: "45px",
                          marginLeft: "70px",
                          marginTop: "25px",
                          fontWeight: "800",
                          fontSize: "16px",
                        }}
                      >
                        Proceed
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
