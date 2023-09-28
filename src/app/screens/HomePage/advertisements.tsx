import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Advertisements() {
  return (
    <div className="ads_frame">
      <Container>
        <Box className="title">
          <span className="category_title" style={{ marginLeft: "60px" }}>Our Partners</span>
        </Box>
        <Stack className="ad_video_frame">
          <Stack>
            <video
              className="ads_video1"
              autoPlay={true}
              loop
              muted
              playsInline
              data-video-media=""
            >
              <source
                data-src="/icons/video3.mp4"
                type="video/mp4"
                src="/icons/video3.mp4"
              />
            </video>
          </Stack>
          <Stack className="ads_video_frame2">
            <Stack className="ads_video_frame2-1" flexDirection={"row"}>
              <Box>
                <video
                  className="ads_video2"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                  data-video-media=""
                >
                  <source
                    data-src="/icons/videoplayback.mp4"
                    type="video/mp4"
                    src="/icons/videoplayback.mp4"
                  />
                </video>
              </Box>
              <Box>
                <video
                className="ads_video3"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                  data-video-media=""
                >
                  <source
                    data-src="/icons/video1.mp4"
                    type="video/mp4"
                    src="/icons/video1.mp4"
                  />
                </video>
              </Box>
            </Stack>
            <Stack
              className="ads_video_frame2-1"
              flexDirection={"row"}
              style={{ marginTop: "15px" }}
            >
              <Box>
                <video
                  className="ads_video3"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                  data-video-media=""
                >
                  <source
                    data-src="/icons/video2.mp4"
                    type="video/mp4"
                    src="/icons/video2.mp4"
                  />
                </video>
              </Box>
              <Box>
                <video
                  className="ads_video2"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                  data-video-media=""
                >
                  <source
                    data-src="/icons/video4.mp4"
                    type="video/mp4"
                    src="/icons/video4.mp4"
                  />
                </video>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
