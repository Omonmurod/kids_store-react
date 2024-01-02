import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FollowSearchObj, Follower } from "../../../types/follow";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";
import { retriveMemberFollowers } from "./selector";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispach(setMemberFollowers(data)),
});

/** REDUX SELECTOR */
const memberFollowersRetriever = createSelector(
  retriveMemberFollowers,
  (memberFollowers) => ({ memberFollowers })
);

export function MemberFollowers(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: props?.mb_id }
  );

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  /** HANDLERS */
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(id);

      await sweetTopSmallSuccessAlert("Subscribed successfully!", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFollowersSearchObj({ ...followersSearchObj });
  };

  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };

  return (
    <Stack>
      {memberFollowers.length > 0 ? (
        memberFollowers.map((follower: Follower) => {
          const image_url = follower?.subscriber_member_data?.mb_image
            ? `${serverApi}/${follower.subscriber_member_data.mb_image}`
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
                onClick={() => visitMemberHandler(follower?.subscriber_id)}
              />
              <div
                style={{
                  width: "480px",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "25px",
                  height: "85%",
                }}
              >
                <span className={"username_text"}>
                  {follower?.subscriber_member_data?.mb_type}
                </span>
                <span
                  className={"name_text"}
                  onClick={() => visitMemberHandler(follower?.subscriber_id)}
                >
                  {follower?.subscriber_member_data?.mb_nick}
                </span>
              </div>
              {props.actions_enabled &&
                (follower?.me_followed &&
                follower?.me_followed[0]?.my_following ? (
                  <Button
                    variant={"contained"}
                    className={"following_already"}
                    disabled
                  >
                    FOLLOWING
                  </Button>
                ) : (
                  <Button
                    variant={"contained"}
                    className={"follow_btn"}
                    onClick={(e) =>
                      subscribeHandler(e, follower?.subscriber_id)
                    }
                  >
                    Follow Back
                  </Button>
                ))}
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
          {followersSearchObj.page === 1
            ? "You have not done any followers yet"
            : "No followers found on this page"}
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
              followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
            }
            page={followersSearchObj.page}
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
