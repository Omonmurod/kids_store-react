import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Link, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { CalendarMonth, ThumbUp, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";

export function TargetArticles(props: any) {
  /** HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("Success", 1000, false);
      props.setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const parseHTML = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Container>
      <Stack className="community-info">
        {props.targetBoArticles.length > 0 ? (
          props.targetBoArticles?.map((article: BoArticle) => {
            const art_image_url = article?.art_image
              ? `${serverApi}/${article.art_image}`
              : "/icons/default_article.svg";
            return (
              <Stack className={"article_box"} sx={{ textDecoration: "none" }}>
                <Stack className="article_img">
                  <img
                    src={art_image_url}
                    style={{
                      borderRadius: "10px 10px 10px 10px",
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
                      width={"55px"}
                      height={"62px"}
                      style={{
                        borderRadius: "50%",
                        backgroundSize: "cover",
                        marginLeft: "5px",
                        marginTop: "25px",
                      }}
                    />
                    <span className="user">{article?.member_data.mb_nick}</span>
                  </Stack>
                  <Stack className="title">{article?.art_subject}</Stack>
                  <Stack className="date_like_view">
                    <Box>
                      <Checkbox
                        icon={
                          <CalendarMonth
                            style={{
                              color: "#7C81FF",
                              height: "20px",
                              marginLeft: "-10px",
                            }}
                          />
                        }
                        checked={false}
                      />
                      <span style={{ marginRight: "15px" }}>
                        {moment(article?.createdAt).format("YYYY.MM.DD")}
                      </span>
                      <span>{moment(article?.createdAt).format("HH:mm")}</span>
                    </Box>
                    <Box>
                      <Checkbox
                        icon={
                          <Visibility
                            style={{
                              color: "#7C81FF",
                              height: "21px",
                              marginLeft: "16px",
                              marginBottom: "3px",
                            }}
                          />
                        }
                        checkedIcon={<Visibility style={{ color: "red" }} />}
                        checked={false}
                      />
                      <span>{article.art_views}</span>
                      <Checkbox
                        icon={
                          <ThumbUp
                            style={{
                              color: "#7C81FF",
                              height: "18px",
                              marginLeft: "10px",
                              marginBottom: "4px",
                            }}
                          />
                        }
                        checkedIcon={
                          <ThumbUp
                            style={{
                              color: "red",
                              width: "18px",
                              marginLeft: "15px",
                              marginBottom: "2px",
                            }}
                          />
                        }
                        id={article._id}
                        onClick={targetLikeHandler}
                        //*@ts-ignore*/
                        checked={
                          article?.me_liked && article?.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                      />
                      <span>{article.art_likes}</span>
                    </Box>
                  </Stack>
                  <Stack className="some-info">
                    {parseHTML(article?.art_content)}
                  </Stack>
                  <Stack className="link">
                    <Box>
                      <NavLink
                        to={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
                        className="readmore"
                      >
                        see the article
                      </NavLink>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            );
          })
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "150px",
              color: "#cccccc",
              marginBottom: "150px",
              fontSize: "40px",
              fontWeight: "660",
              fontFamily: "nunito",
              width: "600px",
              marginLeft: "280px"
            }}
          >
            {props.serachArticlesObj === 1
              ? "Feel free to evaluate our product"
              : "No articles found on this page"}
          </div>
        )}
      </Stack>
    </Container>
  );
}
