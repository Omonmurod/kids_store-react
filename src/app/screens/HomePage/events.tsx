import React from "react";
import { Container, Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Sanitizer } from "@mui/icons-material";
import Marginer from "../../components/marginer";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = Array.from(Array(5).keys());
  // [
  //   {
  //     title: "Bo'yin Foodga marhamat",
  //     desc: "Yangicha uslubda, yangicha tam va yangicha uslub",
  //     author: "Abdurahmon Mufid",
  //     date: "2022/09/02",
  //     location: "Toshkent, Nurafshon ko'cha",
  //     img: "/restaurant/boynfood.jpeg",
  //   },
  //   {
  //     title: "Katta chegirma endi Belissimoda",
  //     desc: "Faqat 25 ~ 31 ~ iyul kunlari antiqa Pitsa yegani tashrif buyuring",
  //     author: "BelissimoUz",
  //     date: "2022/07/25",
  //     location: "Toshkent, Chilonzor",
  //     img: "/restaurant/belissimo.jpeg",
  //   },
  //   {
  //     title: "Hali bilmagan hisni bilmoqchimisiz?",
  //     desc: "Merhaba promokodi orqali 50% chegirma qo'lga kiriting",
  //     author: "Stake House",
  //     date: "2022/09/10",
  //     location: "Toshkent, Qo'yliq",
  //     img: "/restaurant/merhaba.jpeg",
  //   },
  //   {
  //     title: "Yangicha yondashuv endi O'zbekistonda",
  //     desc: "O'zbekistondagi eng yirik ulgurji bozor.\n",
  //     author: "Food City",
  //     date: "2022/08/08",
  //     location: "Toshkent, yangi Qo'yliq bozori",
  //     img: "/restaurant/food_city.jpeg",
  //   },
  // ];

  return (
    <div className="event_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Ongoing Events</span>
          </Box>
          <Swiper
            className={"events_info swiper_wrapper"}
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
                <SwiperSlide className={"events_info_frame"}>
                  <Stack className={"events-img"}>
                    <img src="/icons/swiper1.jpeg" className="img-size" />
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
                      Big List of Free Websites & Companies With Lesson Plans
                    </Box>
                  </Stack>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Box className={"prev_next_frame"}>
            <div className={"dot_frame_pagination swiper-pagination"}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
