import React, { useEffect, useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import "../../../css/order.css";
import { Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { ThemeProvider } from "@material-ui/core/styles";
import theme2 from "../../MaterialTheme/theme2";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";

export function OrdersPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = useState("1");

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
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
                      style={{ marginRight: "30px"}}
                      value={"1"}
                    />
                    <Tab
                      className="article-name"
                      label="In Process"
                      style={{ marginRight: "30px"}}
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
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
