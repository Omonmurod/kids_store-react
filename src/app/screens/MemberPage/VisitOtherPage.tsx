import React, { useState } from "react";
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

export function VisitOtherPage(props: any) {
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("5");

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>Maqolalar</Box>
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
                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers actions_enabled={false} />
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
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing actions_enabled={false} />
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
                  <Box className={"menu_name"}>Maqola yozish</Box>
                  <Box className={"write_content"}></Box>
                </TabPanel>
                <TabPanel value={"5"}>
                  <Box className={"menu_name"}>Tanlangan Maqola</Box>
                  <Box className={"write_content"}>
                    <TViewer text={`<h3>Hello</h3>`} />
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
                    <img
                      src={"/icons/default_user.svg"}
                      className={"order_user_avatar"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src={"/icons/user_icon.png"} />
                    </div>
                  </div>
                  <span className={"order_uer_name"}>Jacob Robertson</span>
                  <span className={"order_uer_prof"}>USER</span>
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
                <p className={"user_desc"}>
                  "Qo'shimcha ma'lumotlar kiritilmagan"
                </p>

                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {true ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            variant={"contained"}
                            style={{ backgroundColor: "#f70909b8" }}
                          >
                            Bekor Qilish
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            variant={"contained"}
                            style={{ backgroundColor: "#30945e" }}
                            // @ts-ignore
                          >
                            Follow Qilish
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>

                <Box className={"my_page_menu"}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tbs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"1"}
                      component={(e) => (
                        <div
                          className={`menu_box ${e}`}
                          onClick={() => setValue("1")}
                        >
                          <img src={"/icons/post.svg"} />
                          <span>Maqolalari</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"2"}
                      component={(e) => (
                        <div
                          className={`menu_box ${e}`}
                          onClick={() => setValue("2")}
                        >
                          <img src={"/icons/followers.svg"} />
                          <span>Followerlari</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"3"}
                      component={(e) => (
                        <div
                          className={`menu_box ${e}`}
                          onClick={() => setValue("3")}
                        >
                          <img src={"/icons/following.svg"} />
                          <span>Followinglari</span>
                        </div>
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
