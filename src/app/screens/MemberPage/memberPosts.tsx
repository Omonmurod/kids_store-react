import React, { ChangeEvent, useRef, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { CalendarMonth, ThumbUp, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

export function MemberPosts(props: any) {
  const {
    chosenMemberBoArticles,
    renderChosenArticlehandler,
    setArticlesRebuild,
  } = props;

  /** HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
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
    <Box className={"post_content"}>
      {chosenMemberBoArticles.length > 0 ? (
        chosenMemberBoArticles.map((article: BoArticle) => {
          const image_path = article.art_image
            ? `${serverApi}/${article.art_image}`
            : "/icons/default_article.svg";
          return (
            <Stack
              className="article_box"
              sx={{ cursor: "pointer" }}
              onClick={() => renderChosenArticlehandler(article?._id)}
            >
              <Stack className="article_img">
                <img
                  src={image_path}
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
                  />{" "}
                  <span className="user">{article?.member_data?.mb_nick}</span>
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
                    <span
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      {moment(article?.createdAt).format("YYYY.MM.DD")}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {moment(article?.createdAt).format("HH:mm")}
                    </span>
                  </Box>
                  <Box>
                    <Checkbox
                      icon={
                        <Visibility
                          style={{
                            color: "#7C81FF",
                            height: "21px",
                            marginLeft: "17px",
                            marginBottom: "3px",
                          }}
                        />
                      }
                      checkedIcon={<Visibility style={{ color: "red" }} />}
                      checked={false}
                    />
                    <span style={{ marginTop: "-1px", marginLeft: "-2px" }}>
                      {article?.art_views}
                    </span>
                    <Checkbox
                      icon={
                        <ThumbUp
                          style={{
                            color: "#7C81FF",
                            height: "18px",
                            marginLeft: "6px",
                            marginBottom: "4px",
                          }}
                        />
                      }
                      checkedIcon={
                        <ThumbUp
                          style={{
                            color: "red",
                            width: "18px",
                            marginLeft: "10px",
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
                    <span style={{ marginLeft: "-2px" }}>
                      {article?.art_likes}
                    </span>
                  </Box>
                </Stack>
                <Stack className="some-info">
                  {parseHTML(article?.art_content)}
                </Stack>
              </Stack>
            </Stack>
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "200px",
            color: "#cccccc",
            marginBottom: "200px",
            fontSize: "40px",
            fontWeight: "660",
            fontFamily: "nunito",
            width: "800px",
            marginLeft: "20px"
          }}
        >
          {chosenMemberBoArticles.page === 1 ? 
          "You do not have any articles yet" 
          : "No articles found on this page"}
        </div>
      )}
    </Box>
  );
}
