import React from "react";
import { Container, Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = Array.from(Array(5).keys());

  return (
    <div className="events_frame">
      <Container>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Ongoing Events</span>
          </Box>
          <Stack className="event_swiper">
            <Swiper
              className={"events_info"}
              slidesPerView={2}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {events_list.map((value, number) => {
                return (
                  <SwiperSlide>
                    <Stack
                      style={{
                        width: "617px",
                        height: "200px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: "20px",
                        border: "2px dashed #4559f4",
                        background: "#f6f7ff",
                        cursor: "pointer"
                      }}
                    >
                      <Stack className={"events-img"}>
                        <img
                          src="/icons/swiper1.jpeg"
                          className="img-size"
                          style={{ borderRadius: "12px" }}
                        />
                      </Stack>
                      <Stack className={"events-txt"}>
                        <Stack className={"events-date"}>
                          <Box>
                            <img
                              src="/icons/speaker.svg"
                              style={{ height: "14px", width: "14px" }}
                            />{" "}
                            Kids World
                          </Box>
                          <Box>
                            <img
                              src="/icons/calendar.svg"
                              style={{ height: "14px", width: "13px" }}
                            />{" "}
                            Nov 10, 2023{" "}
                          </Box>
                          <Box>
                            <img
                              src="/icons/location.svg"
                              style={{ height: "14px", width: "14px" }}
                            />{" "}
                            Seul
                          </Box>
                        </Stack>
                        <Box className="events-desc">
                          Big List of Free Websites & Companies With Lesson
                          Plans
                        </Box>
                      </Stack>
                    </Stack>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
