import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { CalendarMonth, ThumbUp, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export function Articles() {
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
          <Stack className="article_box">
            <Stack className="article_img">
              <img
                src="/icons/swiper4.jpeg"
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
                <img src="/icons/default_user.svg" className="img" />{" "}
                <span className="user">Jacob Robertson</span>
              </Stack>
              <Stack className="title">
                Baby Must Haves You Need For A Newborn
              </Stack>
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
                  <span>22.10.2023</span>
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
                  <span style={{ marginTop: "-1px" }}>15</span>
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
                    checkedIcon={<ThumbUp style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span>8</span>
                </Box>
              </Stack>
              <Stack className="link">
                <Box>
                  <NavLink to="/community" className="readmore">
                    read more ...
                  </NavLink>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="article_box">
            <Stack className="article_img">
              <img
                src="/icons/swiper3.jpeg"
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
                <img src="/icons/default_user.svg" className="img" />{" "}
                <span className="user">Jacob Robertson</span>
              </Stack>
              <Stack className="title">
                Baby Must Haves You Need For A Newborn
              </Stack>
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
                  <span>22.10.2023</span>
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
                  <span style={{ marginTop: "-1px" }}>15</span>
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
                    checkedIcon={<ThumbUp style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span>8</span>
                </Box>
              </Stack>
              <Stack className="link">
                <Box>
                  <NavLink to="/community" className="readmore">
                    read more ...
                  </NavLink>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="article_box">
            <Stack className="article_img">
              <img
                src="/icons/swiper4.jpeg"
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
                <img src="/icons/default_user.svg" className="img" />{" "}
                <span className="user">Jacob Robertson</span>
              </Stack>
              <Stack className="title">
                Baby Must Haves You Need For A Newborn
              </Stack>
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
                  <span>22.10.2023</span>
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
                  <span style={{ marginTop: "-1px" }}>15</span>
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
                    checkedIcon={<ThumbUp style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span>8</span>
                </Box>
              </Stack>
              <Stack className="link">
                <Box>
                  <NavLink to="/community" className="readmore">
                    read more ...
                  </NavLink>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="article_box">
            <Stack className="article_img">
              <img
                src="/icons/swiper3.jpeg"
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
                <img src="/icons/default_user.svg" className="img" />{" "}
                <span className="user">Jacob Robertson</span>
              </Stack>
              <Stack className="title">
                Baby Must Haves You Need For A Newborn
              </Stack>
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
                  <span>22.10.2023</span>
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
                  <span style={{ marginTop: "-1px" }}>15</span>
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
                    checkedIcon={<ThumbUp style={{ color: "red" }} />}
                    checked={false}
                  />
                  <span>8</span>
                </Box>
              </Stack>
              <Stack className="link">
                <Box>
                  <NavLink to="/community" className="readmore">
                    read more ...
                  </NavLink>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
