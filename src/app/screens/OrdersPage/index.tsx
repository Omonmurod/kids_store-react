import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import "../../../css/order.css";
import { Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { ThemeProvider } from "@material-ui/core/styles";
import theme2 from "../../MaterialTheme/theme2";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setFinishedOrders,
  setPausedOrders,
  setProcessOrders,
} from "../../screens/OrdersPage/slice";
import OrderApiService from "../../apiServices/orderApiService";
import { Order } from "../../../types/order";
import { useHistory } from "react-router-dom";
import ScrollToTopFab from "../../scrollToTopFab";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispach(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispach(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispach(setFinishedOrders(data)),
});

export function OrdersPage(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);

  /** HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container>
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <ThemeProvider theme={theme2}>
                  <Tabs
                    value={value}
                    style={{ color: theme2.palette.primary.main }}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      className="article-name"
                      label="My Orders"
                      style={{ marginRight: "30px" }}
                      value={"1"}
                    />
                    <Tab
                      className="article-name"
                      label="In Process"
                      style={{ marginRight: "30px" }}
                      value={"2"}
                    />
                    <Tab
                      className="article-name"
                      label="Delivered"
                      value={"3"}
                    />
                  </Tabs>
                </ThemeProvider>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders setOrderRebuild={props.setOrderRebuild} setValue={setValue}/>
              <ProcessOrders setOrderRebuild={props.setOrderRebuild} setValue={setValue}/>
              <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
            </Stack>
          </TabContext>
        </Stack>
        <ScrollToTopFab />
      </Container>
    </div>
  );
}
