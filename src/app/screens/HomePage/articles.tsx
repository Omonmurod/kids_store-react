import { Box, Container, Link } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CalendarMonth, ThumbUp, Visibility } from "@mui/icons-material";
import { NavLink, useHistory } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestBoArticles } from "../../screens/HomePage/slice";
import { retrieveBestBoArticles } from "../../screens/HomePage/selector";
import { BoArticle } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispach(setBestBoArticles(data)),
});

/** REDUX SELECTOR */
const bestBoArticlesRetriever = createSelector(
  retrieveBestBoArticles,
  (bestBoArticles) => ({ bestBoArticles })
);

export function Articles(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setBestBoArticles } = actionDispatch(useDispatch());
  const { bestBoArticles } = useSelector(bestBoArticlesRetriever);

  useEffect(() => {
    const communityService = new CommunityApiService();
    let limit = 4;
    if (isMobile()) {
      limit = 1;
    }
    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit,
        order: "art_likes",
      })
      .then((data) => setBestBoArticles(data))
      .catch((err) => console.log(err));
  }, []);

  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div className="articles_frame">
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            width: "430px",
          }}
        >
          <Stack
            style={{ height: "85px", marginTop: "40px" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box>
              <span className="category_title" style={{ fontSize: "36px" }}>
                Best Articles
              </span>
            </Box>
            <Box style={{ marginTop: "60px" }}>
              <NavLink to="/mobile" className="viewall">
                View All
              </NavLink>
            </Box>
          </Stack>
          <Stack className="articles">
            {bestBoArticles?.map((article: BoArticle) => {
              const art_image_url = article.art_image
                ? `${serverApi}/${article.art_image}`
                : "/icons/default_article.svg";
              return (
                <Stack className="article_box" style={{ marginLeft: "50px" }}>
                  <Stack className="article_img">
                    <img
                      src={art_image_url}
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        marginTop: "0.6px",
                        marginLeft: "0.6px",
                      }}
                      className="img"
                    />
                  </Stack>
                  <Stack className="article_info">
                    <Stack className="article_user">
                      <img
                        src={
                          article?.member_data?.mb_image
                            ? `${serverApi}/${article?.member_data?.mb_image}`
                            : "/icons/default_user.svg"
                        }
                        className="img"
                      />{" "}
                      <span className="user">
                        {article.member_data?.mb_nick}
                      </span>
                    </Stack>
                    <Stack className="title">{article?.art_subject}</Stack>
                    <Stack className="date_like_view">
                      <Box>
                        <Checkbox
                          icon={
                            <CalendarMonth
                              style={{
                                color: "#7C81FF",
                                height: "22px",
                                marginBottom: "4px",
                                marginRight: "-5px",
                              }}
                            />
                          }
                          checked={false}
                        />
                        <span>
                          {moment(article?.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </Box>
                      <Box>
                        <Checkbox
                          icon={
                            <Visibility
                              style={{
                                color: "#7C81FF",
                                height: "23px",
                                marginRight: "-5px",
                                marginBottom: "3px",
                              }}
                            />
                          }
                          checkedIcon={<Visibility style={{ color: "red" }} />}
                          checked={false}
                        />
                        <span style={{ marginTop: "-1px" }}>
                          {article?.art_views}
                        </span>
                        <Checkbox
                          icon={
                            <ThumbUp
                              style={{
                                color: "#7C81FF",
                                height: "20px",
                                marginRight: "-5px",
                                marginBottom: "4px",
                              }}
                            />
                          }
                        />
                        <span>{article?.art_likes}</span>
                      </Box>
                    </Stack>
                    <Stack className="link">
                      <Box className="readmore">
                        <NavLink to={`/mobile`}>read more</NavLink>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="articles_frame">
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            style={{ height: "85px", marginTop: "40px" }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box>
              <span className="category_title" style={{ fontSize: "44px" }}>
                Best Articles
              </span>
            </Box>
            <Box style={{ marginTop: "60px" }}>
              <NavLink to="/community" className="viewall">
                View All
              </NavLink>
            </Box>
          </Stack>
          <Stack className="articles">
            {bestBoArticles?.map((article: BoArticle) => {
              const art_image_url = article.art_image
                ? `${serverApi}/${article.art_image}`
                : "/icons/default_article.svg";
              return (
                <Stack className="article_box">
                  <Stack className="article_img">
                    <img
                      src={art_image_url}
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        marginTop: "0.6px",
                        marginLeft: "0.6px",
                      }}
                      className="img"
                    />
                  </Stack>
                  <Stack className="article_info">
                    <Stack className="article_user">
                      <img
                        src={
                          article?.member_data?.mb_image
                            ? `${serverApi}/${article?.member_data?.mb_image}`
                            : "/icons/default_user.svg"
                        }
                        className="img"
                      />{" "}
                      <span className="user">
                        {article.member_data?.mb_nick}
                      </span>
                    </Stack>
                    <Stack className="title">{article?.art_subject}</Stack>
                    <Stack className="date_like_view">
                      <Box>
                        <Checkbox
                          icon={
                            <CalendarMonth
                              style={{
                                color: "#7C81FF",
                                height: "22px",
                                marginBottom: "4px",
                                marginRight: "-5px",
                              }}
                            />
                          }
                          checked={false}
                        />
                        <span>
                          {moment(article?.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </Box>
                      <Box>
                        <Checkbox
                          icon={
                            <Visibility
                              style={{
                                color: "#7C81FF",
                                height: "23px",
                                marginRight: "-5px",
                                marginBottom: "3px",
                              }}
                            />
                          }
                          checkedIcon={<Visibility style={{ color: "red" }} />}
                          checked={false}
                        />
                        <span style={{ marginTop: "-1px" }}>
                          {article?.art_views}
                        </span>
                        <Checkbox
                          icon={
                            <ThumbUp
                              style={{
                                color: "#7C81FF",
                                height: "20px",
                                marginRight: "-5px",
                                marginBottom: "4px",
                              }}
                            />
                          }
                        />
                        <span>{article?.art_likes}</span>
                      </Box>
                    </Stack>
                    <Stack className="link">
                      <Box className="readmore">
                        <NavLink
                          to={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
                        >
                          read more
                        </NavLink>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </div>
    );
  }
}
