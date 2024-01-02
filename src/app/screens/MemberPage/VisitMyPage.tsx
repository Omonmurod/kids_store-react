import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ThemeProvider } from "@material-ui/core/styles";
import theme2 from "../../MaterialTheme/theme2";
import { WishList } from "./wishList";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
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
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import ScrollToTopFab from "../../scrollToTopFab";
import { useHistory } from "react-router-dom";

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

export function VisitMyPage(props: any) {
  /** INITIALIZATIONS */
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );

  const history = useHistory();
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = React.useState("1");
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 4 });

  useEffect(() => {
    if (!verifiedMemberData) {
      sweetFailureProvider("Please login first!", true, true);
    }

    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();
    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    memberService
      .getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, articlesRebuild, followRebuild]);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  /** HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "40px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>My Articles</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticlehandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
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
                      actions_enabled={true}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Followings</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={true}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={verifiedMemberData?._id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Writing an Article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor
                      setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Chosen Article</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>Change Information</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>

                {/* <TabPanel value={"7"}>
                  <Box className={"menu_name"}>Wish List</Box>
                  <Box className={"write_content"}></Box>
                  <WishList actions_enabled={true} onAdd={props.onAdd} />
                </TabPanel> */}
              </Box>
            </Stack>

            <Stack
              className={"my_page_right"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("6")} className={"settings_btn"}>
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      src={verifiedMemberData?.mb_image}
                      className={"order_user_avatar"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img
                        src={
                          chosenMember?.mb_type === "BRAND"
                            ? "/icons/brand.png"
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
                  <FacebookIcon
                    sx={{ color: "orange" }}
                    className={"media_box"}
                  />
                  <InstagramIcon
                    sx={{ color: "orange" }}
                    className={"media_box"}
                  />
                  <TelegramIcon
                    sx={{ color: "orange" }}
                    className={"media_box"}
                  />
                  <YouTubeIcon
                    sx={{ color: "orange" }}
                    className={"media_box"}
                  />
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
                    {/* <Tab
                      style={{ flexDirection: "column" }}
                      value={"7"}
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
                            fontWeight: "770",
                          }}
                          onClick={() => setValue("7")}
                        >
                          Wish list
                        </Button>
                      )}
                    /> */}
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
                            fontWeight: "770",
                          }}
                          onClick={() => setValue("1")}
                        >
                          My Articles
                        </Button>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
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
                            fontWeight: "770",
                          }}
                          onClick={() => setValue("4")}
                        >
                          Writing an Article
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
                            fontWeight: "770",
                          }}
                          onClick={() => setValue("2")}
                        >
                          Followers
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
                            fontWeight: "770",
                          }}
                          onClick={() => setValue("3")}
                        >
                          Followings
                        </Button>
                      )}
                    />
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
