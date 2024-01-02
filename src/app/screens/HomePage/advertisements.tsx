import { Box, Container, Stack } from "@mui/material";
import React from "react";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

export function Advertisements() {
  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return (
      <div
        className="ads_frame"
        style={{
          width: "430px",
        }}
      >
        <Container>
          <Box className="title">
            <span
              className="category_title"
              style={{ marginLeft: "60px", fontSize: "36px" }}
            >
              Our Partners
            </span>
          </Box>
          <Stack className="ad_video_frame">
            <Stack>
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
              <Box style={{ marginTop: "15px" }}>
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
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="ads_frame">
        <Container>
          <Zoom delay={800}>
            <Box className="title">
              <span className="category_title" style={{ marginLeft: "60px" }}>
                Our Partners
              </span>
            </Box>
          </Zoom>
          <Stack className="ad_video_frame">
            <Zoom delay={1000}>
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
            </Zoom>
            <Stack className="ads_video_frame2">
              <Fade left duration={1750}>
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
                        data-src="/icons/video2.mp4"
                        type="video/mp4"
                        src="/icons/video2.mp4"
                      />
                    </video>
                  </Box>
                </Stack>
              </Fade>
              <Fade right duration={2000}>
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
                        data-src="/icons/video1.mp4"
                        type="video/mp4"
                        src="/icons/video1.mp4"
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
              </Fade>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }
}
