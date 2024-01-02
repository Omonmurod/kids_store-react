import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { retriveMemberFollowings } from "./selector";
import { Following, FollowSearchObj } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispach(setMemberFollowings(data)),
});

/** REDUX SELECTOR */
const memberFollowingsRetriever = createSelector(
  retriveMemberFollowings,
  (memberFollowings) => ({ memberFollowings })
);

export function MemberFollowing(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({ page: 1, limit: 5, mb_id: props?.mb_id });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  /** HANDLERS */
  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(id);

      await sweetTopSmallSuccessAlert(
        "Unsubscribed successfully!",
        1000,
        false
      );
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFollowingsSearchObj({ ...followingsSearchObj });
  };

  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };

  return (
    <Stack>
      {memberFollowings.length > 0 ? (
        memberFollowings.map((following: Following) => {
          const image_url = following?.follow_member_data?.mb_image
            ? `${serverApi}/${following.follow_member_data.mb_image}`
            : "/icons/default_user.svg";
          return (
            <Box className={"follow_box"}>
              <Avatar
                alt={""}
                src={image_url}
                sx={{
                  width: 99,
                  height: 99,
                  cursor: "pointer",
                  boxShadow: "0px 0px 15px 0px rgba(50, 50, 50, 0.3)",
                }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              />
              <div
                style={{
                  width: "460px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "25px",
                  height: "85%",
                }}
              >
                <span className={"username_text"}>
                  {following?.follow_member_data?.mb_type}
                </span>
                <span
                  className={"name_text"}
                  style={{ cursor: "pointer" }}
                  onClick={() => visitMemberHandler(following?.follow_id)}
                >
                  {following?.follow_member_data?.mb_nick}
                </span>
              </div>
              {props.actions_enabled && (
                <Button
                  variant={"contained"}
                  
                  className={"follow_cancel_btn"}
                  onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                >
                  Unfollow
                </Button>
              )}
            </Box>
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "200px",
            color: "#cccccc",
            marginBottom: "200px",
            fontSize: "40px",
            fontWeight: "660",
            fontFamily: "nunito",
          }}
        >
          {followingsSearchObj.page === 1 ? 
          "You have not done any followings yet" 
          : "No followings found on this page"}
        </div>
      )}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className={"bottom_box"}>
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"primary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
