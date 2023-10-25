import React, { ChangeEvent, useRef, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { CalendarMonth, ThumbUp, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export function MemberPosts(props: any) {
  return (
      <Stack className={"post_content"}>
        {["1", "2", "3", "4"].map((article) => {
          return (
            <Stack className="article_box">
              <Stack className="article_img">
                <img
                  src="/icons/swiper3.jpeg"
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
                            height: "20px",
                            marginLeft: "-3px",
                            marginBottom: "3px",
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
                            height: "21px",
                            marginLeft: "45px",
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
                            height: "18px",
                            marginLeft: "10px",
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
                <Stack className="some-info">
                  Suspendisse fermentum ante eu libero molestie aliquam.
                  Pellentesque ut diam condimentum, pellentesque ante imperdiet,
                  ultricies dui. Praesent eu lectus enim.
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
          );
        })}
      </Stack>
  );
}
