import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Dispatch } from "@reduxjs/toolkit";

const followings = [
  { mb_nick: "Aziz" },
  { mb_nick: "Xurshid" },
  { mb_nick: "Davron" },
];

export function MemberFollowing(props: any) {
  return (
    <Stack>
      {followings.map((following) => {
        const image_url = "/icons/default_user.svg";
        return(
          <Box className={"follow_box"}>
            <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className={"username_text"}>USER</span>
              <span className={"name_text"}>{following.mb_nick}</span>
            </div>
            {props.actions_enabled && (
              <Button
                variant={"contained"}
                className={"follow_cancel_btn"}
              >
                Unfollow
              </Button>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}