import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export function MySettings(props: any) {
  return (
    <Stack className={"my_settings_page"}>
      <Box className={"member_media_frame"}>
        <img
          src={"/icons/default_user.svg"}
          className={"mb_image"}
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
        />
        <div className={"media_change_box"}>
          <span>Upload your image</span>
          <p>You only can upload JPG, JPEG, PNG!</p>
          <div className={"up_del_box"}>
            <Button component={"label"} style={{ minWidth: "0" }}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"long_input"}>
          <label className={"spec_label"} style={{ marginLeft: "10px" }}>
            Name
          </label>
          <input
            className={"spec_input mb_nick"}
            type="text"
            placeholder="Jacob Robertson"
            name="mb_nick"
          />
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"short_input"}>
          <label className={"spec_label"} style={{ marginLeft: "10px" }}>
            Telephone Number
          </label>
          <input
            className={"spec_input mb_phone"}
            type="text"
            placeholder={"+8210 1234 5678"}
            name="mb_phone"
          />
        </div>
        <div className={"short_input"}>
          <label className={"spec_label"} style={{ marginLeft: "10px" }}>
            Address
          </label>
          <input
            className={"spec_input mb_address"}
            type="text"
            placeholder={"Gyeongsan-si, Gungdang-ro 9gil"}
            name="mb_address"
          />
        </div>
      </Box>
      <Box className={"input_frame"}>
        <div className={"long_input"}>
          <label className={"spec_label"} style={{ marginLeft: "10px" }}>
            Additional Info
          </label>
          <textarea
            className={"spec_textarea mb_description"}
            placeholder={"Not inserted"}
            name="mb_description"
          />
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button
          variant={"contained"}
          style={{
            backgroundColor: "orange",
            width: "150px",
            borderRadius: "15px",
            fontFamily: "Nunito",
            fontSize: "18px",
            fontWeight: "770",
            lineHeight: "24px",
          }}
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
}
