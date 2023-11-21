import React, { ChangeEvent, useEffect, useState } from "react";
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

export function VisitMyPage(props: any) {
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
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
                    <MemberPosts />
                    <Stack
                      sx={{ mt: "50px", mb: "20px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <ThemeProvider theme={theme2}>
                          <Pagination
                            count={3}
                            page={2}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBackIcon,
                                  next: ArrowForwardIcon,
                                }}
                                {...item}
                                style={{
                                  color: theme2.palette.secondary.main,
                                }}
                              />
                            )}
                          />
                        </ThemeProvider>
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers actions_enabled={true} />
                    <Stack
                      sx={{ mt: "50px", mb: "20px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <ThemeProvider theme={theme2}>
                          <Pagination
                            count={3}
                            page={2}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBackIcon,
                                  next: ArrowForwardIcon,
                                }}
                                {...item}
                                style={{
                                  color: theme2.palette.secondary.main,
                                }}
                              />
                            )}
                          />
                        </ThemeProvider>
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Followings</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={true} />
                    <Stack
                      sx={{ mt: "50px", mb: "20px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className={"bottom_box"}>
                        <ThemeProvider theme={theme2}>
                          <Pagination
                            count={3}
                            page={2}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBackIcon,
                                  next: ArrowForwardIcon,
                                }}
                                {...item}
                                style={{
                                  color: theme2.palette.secondary.main,
                                }}
                              />
                            )}
                          />
                        </ThemeProvider>
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Wish List</Box>
                  <Box className={"write_content"}></Box>
                  <WishList actions_enabled={true} />
                  <Stack
                    sx={{ mt: "50px", mb: "20px" }}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box className={"bottom_box"}>
                      <ThemeProvider theme={theme2}>
                        <Pagination
                          count={3}
                          page={2}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              style={{
                                color: theme2.palette.secondary.main,
                              }}
                            />
                          )}
                        />
                      </ThemeProvider>
                    </Box>
                  </Stack>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Writing an Article</Box>
                  <Box className={"write_content"}>
                    <TuiEditor />
                  </Box>
                </TabPanel>

                <TabPanel value={"6"}>
                  <Box className={"menu_name"}>Chosen Article</Box>
                  <Box className={"menu_content"}>
                    <TViewer text={`<h3>Hello</h3>`} />
                  </Box>
                </TabPanel>

                <TabPanel value={"7"}>
                  <Box className={"menu_name"}>Change Information</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack
              className={"my_page_right"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("7")} className={"settings_btn"}>
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      src={"/icons/default_user.svg"}
                      className={"order_user_avatar"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src={"/icons/user_icon.png"} />
                    </div>
                  </div>
                  <span className={"order_user_name"}>Jacob Roberts</span>
                  <span className={"order_user_prof"}>USER</span>
                </Box>
                <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box className={"user_media_box"}>
                  <p className={"follows"}>Followers: 3</p>
                  <p className={"follows"}>Followings: 4</p>
                </Box>
                <p className={"user_desc"}>"Salom mening ismim Jacob"</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"3"}
                      component={(e) => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("3")}
                        >
                          Wish list
                        </Button>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"2"}
                      component={(e) => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("2")}
                        >
                          Writing an Article
                        </Button>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"1"}
                      component={(e) => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("1")}
                        >
                          My Articles
                        </Button>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={(e) => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("4")}
                        >
                          Followers
                        </Button>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"5"}
                      component={(e) => (
                        <Button
                          variant={"contained"}
                          onClick={() => setValue("5")}
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
      </Container>
    </div>
  );
}
