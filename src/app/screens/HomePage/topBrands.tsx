import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useRef } from "react";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopBrands } from "../../screens/HomePage/selector";
import { Brand } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { MemberLiken } from "../../../types/others";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import Zoom from "react-reveal/Zoom";

/** REDUX SELECTOR */
const topBrandsRetriever = createSelector(retrieveTopBrands, (topBrands) => ({
  topBrands,
}));

export function TopBrands() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { topBrands } = useSelector(topBrandsRetriever);
  console.log("topBrands:::", topBrands);
  const refs: any = useRef([]);

  /** HANDLERS */
  const chooseBrandHandler = (id: string) => {
    history.push(`/brand/${id}`);
  };

  const goBrandsHandler = () => history.push("/brand");

  const targetLikeTop = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }

      await sweetTopSmallSuccessAlert("Success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const { isMobile } = useDeviceDetect();
  if (isMobile()) {
    return null;
  } else {
    return (
      <div className="top_brands_frame">
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Zoom duration={1000}>
            <Box
              style={{ height: "75px", marginTop: "30px" }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <div style={{ marginTop: "-15px", marginRight: "30px" }}>
                <img src="/icons/left.png" style={{ marginTop: "0px" }} />
              </div>
              <span className="category_title">Featured Brands</span>
              <div style={{ marginTop: "-15px", marginLeft: "30px" }}>
                <img src="/icons/right.png" />
              </div>
            </Box>
          </Zoom>
          <Stack
            className="top-brands"
            style={{
              height: "480px",
              width: "100%",
              marginTop: "40px",
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {topBrands.map((ele: Brand) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <Stack
                  className="top-brands_box"
                  key={ele._id}
                  onClick={() => chooseBrandHandler(ele._id)}
                >
                  <Stack className="brand-img">
                    <img src={image_path} className="img" />
                  </Stack>
                  <Stack className="brand-info">
                    <CssVarsProvider>
                      <Stack className="info-top">
                        <Box className="info-top_nick">{ele.mb_nick}</Box>
                        <Box className="info-top_address">
                          <img
                            src="/icons/location.svg"
                            style={{ marginRight: "8px" }}
                          />
                          서울 강남구 가로수길 18
                        </Box>
                        <Box className="info-top_address">
                          <img
                            src="/icons/call.svg"
                            style={{ marginRight: "8px" }}
                          />
                          {ele.mb_phone}
                        </Box>
                      </Stack>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 0.4,
                        }}
                      >
                        <IconButton
                          aria-label="Like minimal photography"
                          size="md"
                          variant="solid"
                          color="neutral"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            right: "1rem",
                            bottom: 35,
                            transform: "translateY(50%)",
                            color: "rgba(0, 0, 0, .4)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Favorite
                            /*@ts-ignore*/
                            onClick={(e) => targetLikeTop(e, ele._id)}
                            style={{
                              fill:
                                ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                  ? "red"
                                  : "white",
                            }}
                          />
                        </IconButton>
                        <Typography
                          //level="body3"
                          sx={{
                            fontWeight: "md",
                            color: "#423126",
                            alignItems: "center",
                            display: "flex",
                            fontSize: "15px",
                          }}
                        >
                          <Visibility
                            sx={{
                              fontSize: 20,
                              marginLeft: "5px",
                              marginRight: "5px",
                            }}
                          />
                          {ele.mb_views}
                        </Typography>
                        <Box sx={{ width: 2, bgcolor: "divider" }} />
                        <Typography
                          //level="body3"
                          sx={{
                            fontWeight: "md",
                            color: "#423126",
                            alignItems: "center",
                            display: "flex",
                            fontSize: "15px",
                          }}
                        >
                          <Favorite
                            sx={{
                              fontSize: 20,
                              marginLeft: "5px",
                              marginRight: "5px",
                            }}
                          />
                          <div
                            ref={(element) => (refs.current[ele._id] = element)}
                          >
                            {ele.mb_likes}
                          </div>
                        </Typography>
                      </CardOverflow>
                    </CssVarsProvider>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack
            style={{
              height: "60px",
              width: "100%",
              marginTop: "0px",
              marginBottom: "12px",
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
          >
            <Button onClick={goBrandsHandler}>
              <NavLink to="/brand" className="see-btn success">
                See All Brands
              </NavLink>
            </Button>
          </Stack>
        </Container>
      </div>
    );
  }
}
