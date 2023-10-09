import React, { useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import "../../../css/community.css";
import { Tab, Tabs } from "@material-ui/core";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TargetArticles } from "./targetArticles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme2 from "../../MaterialTheme/theme2";

export function CommunityPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
  };

  return (
    <div className={"community_page"}>
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"community_all_frame"} inputMode={"text"}>
          <TabContext value={value}>
            <Box className={"article_tabs"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <ThemeProvider theme={theme2}>
                  <Tabs
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      className="article-name"
                      label="All Articles"
                      value={"1"}
                    />
                    <Tab
                      className="article-name"
                      label="Market evaluation"
                      value={"2"}
                    />
                    <Tab
                      className="article-name"
                      label="Product review"
                      value={"3"}
                    />
                    <Tab className="article-name" label="Stories" value={"4"} />
                  </Tabs>
                </ThemeProvider>
              </Box>
            </Box>

            <Stack className={"article_main"}>
              <TabPanel value={"1"}>
                <TargetArticles targetBoArticles={[1, 2, 3, 4]} />
              </TabPanel>
              <TabPanel value={"2"}>
                <TargetArticles targetBoArticles={[1, 2, 3]} />
              </TabPanel>
              <TabPanel value={"3"}>
                <TargetArticles targetBoArticles={[1, 2]} />
              </TabPanel>
              <TabPanel value={"4"}>
                <TargetArticles targetBoArticles={[1, 2, 3, 4, 5]} />
              </TabPanel>
            </Stack>

            <Stack alignItems={"center"}>
              <ThemeProvider theme={theme2}>
                <Pagination
                  count={3}
                  page={1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      className="pagination"
                    />
                  )}
                  onChange={handlePaginationChange}
                />
              </ThemeProvider>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
