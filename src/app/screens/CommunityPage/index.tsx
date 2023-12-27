import React, { useEffect, useLayoutEffect, useState } from "react";
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
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "../../screens/CommunityPage/slice";
import { retriveTargetBoArticles } from "../../screens/CommunityPage/selector";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import { useHistory } from "react-router-dom";
import ScrollToTopFab from "../../scrollToTopFab";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispach(setTargetBoArticles(data)),
});

/** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
  retriveTargetBoArticles,
  (targetBoArticles) => ({ targetBoArticles })
);

export function CommunityPage(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = React.useState("1");
  const [serachArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 6,
    }
  );
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0 });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(serachArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [serachArticlesObj, articlesRebuild]);

  /** HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    serachArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        serachArticlesObj.bo_id = "all";
        break;
      case "2":
        serachArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        serachArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        serachArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...serachArticlesObj });
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    serachArticlesObj.page = value;
    setSearchArticlesObj({ ...serachArticlesObj });
  };

  return (
    <div className={"community_page"} style={{ backgroundColor: "white" }}>
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <ScrollToTopFab />
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
                <TargetArticles
                  targetBoArticles={targetBoArticles}
                  setArticlesRebuild={setArticlesRebuild}
                />
              </TabPanel>
              <TabPanel value={"2"}>
                <TargetArticles
                  targetBoArticles={targetBoArticles}
                  setArticlesRebuild={setArticlesRebuild}
                />
              </TabPanel>
              <TabPanel value={"3"}>
                <TargetArticles
                  targetBoArticles={targetBoArticles}
                  setArticlesRebuild={setArticlesRebuild}
                />
              </TabPanel>
              <TabPanel value={"4"}>
                <TargetArticles
                  targetBoArticles={targetBoArticles}
                  setArticlesRebuild={setArticlesRebuild}
                />
              </TabPanel>
            </Stack>

            <Stack alignItems={"center"}>
              <Pagination
                style={{ marginTop: "35px", marginBottom: "-10px" }}
                count={
                  serachArticlesObj.page >= 3 ? serachArticlesObj.page + 1 : 3
                }
                page={serachArticlesObj.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={handlePaginationChange}
              />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
