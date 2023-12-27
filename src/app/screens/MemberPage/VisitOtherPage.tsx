import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ThemeProvider } from "@material-ui/core/styles";
import theme2 from "../../MaterialTheme/theme2";
import TViewer from "../../components/tuiEditor/TViewer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "../../screens/MemberPage/slice";
import {
  retriveChosenMember,
  retriveChosenMemberBoArticles,
  retriveChosenSingleBoArticle,
} from "../../screens/MemberPage/selector";
import MemberApiService from "../../apiServices/memberApiService";
import CommunityApiService from "../../apiServices/communityApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import FollowApiService from "../../apiServices/followApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { useHistory } from "react-router-dom";
import ScrollToTopFab from "../../scrollToTopFab";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispach(setChosenSingleBoArticle(data)),
});

/** REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retriveChosenMember,
  (chosenMember) => ({ chosenMember })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retriveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({ chosenMemberBoArticles })
);
const chosenSingleBoArticleRetriever = createSelector(
  retriveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({ chosenSingleBoArticle })
);

export function VisitOtherPage(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { chosen_mb_id, chosen_art_id } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = React.useState("1");
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }
    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, chosen_mb_id, articlesRebuild]);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const memberService = new MemberApiService();
    memberService
      .getChosenMember(memberArticleSearchObj.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberData, chosen_mb_id, followRebuild]);

  /** HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);
      await sweetTopSmallSuccessAlert("Subscribed successfully!", 1000, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const unsubscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(e.target.value);
      await sweetTopSmallSuccessAlert(
        "UnSubscribed successfully!",
        1000,
        false
      );
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const image_path = chosenMember?.mb_image 
  ? `${serverApi}/${chosenMember.mb_image}` 
  : "/icons/default_user.svg";
  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>Articles</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                      renderChosenArticlehandler={renderChosenArticleHandler}
                    />
                    <Stack
                      sx={{ mt: "50px", mb: "20px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <ThemeProvider theme={theme2}>
                          <Pagination
                            count={
                              memberArticleSearchObj.page >= 3
                                ? memberArticleSearchObj.page + 1
                                : 3
                            }
                            page={memberArticleSearchObj.page}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBackIcon,
                                  next: ArrowForwardIcon,
                                }}
                                {...item}
                                color={"primary"}
                              />
                            )}
                            onChange={handlePaginationChange}
                          />
                        </ThemeProvider>
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers
                      actions_enabled={false}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={chosen_mb_id}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={false}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={chosen_mb_id}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Chosen Article</Box>
                  <Box className={"write_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img src={image_path} className={"order_user_avatar"} />
                    <div className={"order_user_icon_box"}>
                      <img
                        src={
                          chosenMember?.mb_type === "RESTAURANT"
                            ? "/icons/restaurant.svg"
                            : "/icons/user_icon_box.svg"
                        }
                      />
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {chosenMember?.mb_nick}
                  </span>
                  <span className={"order_user_prof"}>
                    {chosenMember?.mb_type}
                  </span>
                </Box>
                <Box className={"user_media_box"}>
                  <FacebookIcon style={{ color: "orange" }} />
                  <InstagramIcon style={{ color: "orange" }} />
                  <TelegramIcon style={{ color: "orange" }} />
                  <YouTubeIcon style={{ color: "orange" }} />
                </Box>
                <Box className={"user_media_box"}>
                  <p className={"follows"}>
                    Followers: {chosenMember?.mb_subscriber_cnt}
                  </p>
                  <p className={"follows"}>
                    Followings: {chosenMember?.mb_follow_cnt}
                  </p>
                </Box>
                <p className={"user_desc"}>
                  {chosenMember?.mb_description ??
                    "There is no additional info!"}
                </p>

                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    className="custom-tab-list"
                    onChange={handleChange}
                    style={{
                      marginRight: "5px",
                      borderBottom: "none !important",
                      borderRight: 1,
                      borderColor: "divider",
                    }}
                    aria-label="lab API tabs example"
                  >
                    {chosenMember?.me_followed &&
                    chosenMember.me_followed[0]?.my_following ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                            value={chosenMember?._id}
                            variant={"contained"}
                            style={{
                              backgroundColor: "#f70909b8",
                              borderRadius: "43px",
                              marginBottom: "40px",
                              width: "275px",
                              height: "45px",
                              fontFamily: "nunito",
                              fontSize: "18px",
                              letterSpacing: "1px",
                              fontWeight: "660",
                              marginLeft: "3px"
                            }}
                            onClick={unsubscribeHandler}
                          >
                            Cancel Following
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                            value={chosenMember?._id}
                            variant={"contained"}
                            style={{
                              backgroundColor: "#43bc59",
                              marginBottom: "35px",
                              borderRadius: "43px",
                              width: "280px",
                              height: "45px",
                              fontFamily: "nunito",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                              fontWeight: "660",
                            }}
                            onClick={subscribeHandler}
                          >
                            Follow
                          </Button>
                        )}
                      />
                    )}

                    <TabList
                      orientation="vertical"
                      value={value}
                      style={{
                        marginRight: "5px",
                        borderBottom: "none !important",
                        borderRight: 1,
                        borderColor: "divider",
                      }}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                    >
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"1"}
                        component={() => (
                          <Button
                            variant={"contained"}
                            style={{
                              backgroundColor: "orange",
                              borderRadius: "43px",
                              marginBottom: "7px",
                              width: "280px",
                              height: "45px",
                              fontFamily: "nunito",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                              fontWeight: "660",
                            }}
                            onClick={() => setValue("1")}
                          >
                            <span className="menu_box">Articles</span>
                          </Button>
                        )}
                      />
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"2"}
                        component={() => (
                          <Button
                            variant={"contained"}
                            style={{
                              backgroundColor: "orange",
                              borderRadius: "43px",
                              marginBottom: "7px",
                              width: "280px",
                              height: "45px",
                              fontFamily: "nunito",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                              fontWeight: "660",
                            }}
                            onClick={() => setValue("2")}
                          >
                            <span>Followers</span>
                          </Button>
                        )}
                      />
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"3"}
                        component={() => (
                          <Button
                            variant={"contained"}
                            style={{
                              backgroundColor: "orange",
                              borderRadius: "43px",
                              marginBottom: "15px",
                              width: "280px",
                              height: "45px",
                              fontFamily: "nunito",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                              fontWeight: "660",
                            }}
                            onClick={() => setValue("3")}
                          >
                            <span>Followings</span>
                          </Button>
                        )}
                      />
                    </TabList>
                  </TabList>
                </Box>
              </Box>
            </Stack>
          </TabContext>
        </Stack>

        <ScrollToTopFab />
      </Container>
    </div>
  );
}
