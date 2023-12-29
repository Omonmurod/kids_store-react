import React from "react";
import { Container, Box, Stack } from "@mui/material";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      desc: "Birthdays are for loved ones, friends, and family members!",
      author: "Moments",
      date: "Jan 30, 2024",
      location: "Kyongju",
      img: "/icons/about9.png",
    },
    {
      desc: "100 Kids Birthday Party Ideas – The Best Resources for Activities",
      author: "ZARA Kids",
      date: "Dec 30, 2023",
      location: "Seoul",
      img: "/icons/swiper1.jpeg",
    },
    {
      desc: "Indoor camping complete with  blanket tents and s'mores  in the toaste oven",
      author: "H&M store",
      date: "Jan 15, 2024",
      location: "Busan",
      img: "/icons/swiper2.jpeg",
    },
    {
      desc: "5 Fun Things To Do Earth Day For Kids Of All Ages",
      author: "Agabang",
      date: "Jan 5, 2024",
      location: "Daegu",
      img: "/icons/swiper3.jpeg",
    },
    {
      desc: "BIG List Of Best-Selling Preschool Workbooks Your Kids Will Love",
      author: "Nike",
      date: "Jan 20, 2024",
      location: "Jeju",
      img: "/icons/swiper4.jpeg",
    },
    {
      desc: "If you're a first-time parent, put your fears aside and get the basics!",
      author: "New Born",
      date: "Jan 15, 2024",
      location: "Daejon",
      img: "/icons/about8.png",
    },
  ];
  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return null;
  } else {
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
                          cursor: "pointer",
                        }}
                      >
                        <Stack className={"events-img"}>
                          <img
                            src={value.img}
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
                              {value.author}
                            </Box>
                            <Box>
                              <img
                                src="/icons/calendar.svg"
                                style={{ height: "14px", width: "13px" }}
                              />{" "}
                              {value.date}{" "}
                            </Box>
                            <Box>
                              <img
                                src="/icons/location.svg"
                                style={{ height: "14px", width: "14px" }}
                              />{" "}
                              {value.location}
                            </Box>
                          </Stack>
                          <Box className="events-desc">{value.desc}</Box>
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
}
