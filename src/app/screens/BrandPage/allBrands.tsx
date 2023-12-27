import { Box, Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, Visibility } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetBrands } from "../../screens/BrandPage/selector";
import { Brand } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBrands } from "../../screens/BrandPage/slice";
import BrandApiService from "../../apiServices/brandApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import ScrollToTopFab from "../../scrollToTopFab";

//const brands_list = Array.from(Array(8).keys());

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBrands: (data: Brand[]) => dispach(setTargetBrands(data)),
});

/** REDUX SELECTOR */
const targetBrandsRetriever = createSelector(
  retrieveTargetBrands,
  (targetBrands) => ({
    targetBrands,
  })
);

export function AllBrands() {
  /** INITIALIZATIONS */
  const { setTargetBrands } = actionDispatch(useDispatch());
  const { targetBrands } = useSelector(targetBrandsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });
  const refs: any = useRef([]);
  const history = useHistory();

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0 });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  useEffect(() => {
    const brandService = new BrandApiService();
    brandService
      .getBrands(targetSearchObject)
      .then((data) => setTargetBrands(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    history.push(`/brand/${id}`);
  };
  const [activeLink, setActiveLink] = useState("mb_point");
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };

   /** Enabling search */
   const [query, setQuery] = useState("");

   const searchedShops = targetBrands.filter((product) => {
    const lowerCaseQuery = query.toLowerCase();

    const nick = product.mb_nick ? product.mb_nick.toLowerCase() : '';
    const address = product.mb_address ? product.mb_address.toLowerCase() : '';
    const phone = product.mb_phone ? product.mb_phone.toLowerCase() : '';

    return nick.includes(lowerCaseQuery) || 
           address.includes(lowerCaseQuery) || 
           phone.includes(lowerCaseQuery);
});


  const targetLikeHandler = async (e: any, id: string) => {
    try {
      //const memberData = localStorage.getItem("member_data");

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
    } catch (error: any) {
      console.log("targetLikeHandler, ERROR:", error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <div className="all_brands_frame">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ScrollToTopFab />
        <Stack className="search">
          <Stack className="search_box">
            <form className="search_form" action="" method="">
              <input
                className="searchInput"
                type={"search"}
                name={"resSearch"}
                placeholder={"Input desired brand name here ..."}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </Stack>
          <Stack className="category_box">
            <a onClick={() => searchHandler("createdAt")}>Newly added</a>
            <a onClick={() => searchHandler("mb_point")}>Trending</a>
            <a onClick={() => searchHandler("mb_likes")}>Most Liked</a>
            <a onClick={() => searchHandler("mb_views")}>Most Viewed</a>
          </Stack>
        </Stack>
        <Stack className="brands">
          <Stack
            className="top-brands"
            style={{
              width: "100%",
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            {searchedShops.map((ele: Brand) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <Stack
                  className="top-brands_box"
                  key={ele._id}
                  onClick={() => chosenBrandHandler(ele._id)}
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
                          서울 홍익로 동교동
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
                          variant="solid"
                          color="neutral"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            right: "1rem",
                            bottom: 45,
                            transform: "translateY(70%)",
                            color: "rgba(0, 0, 0, .4)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Favorite
                            onClick={(e) => targetLikeHandler(e, ele._id)}
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
                            {""}
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
          <Stack>
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  className="pagination"
                />
              )}
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
