import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { verifiedMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings(props: any) {
  /** INITIALIZATIONS */
  const [file, setFile] = useState(verifiedMemberData?.mb_image);

  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  /** HANDLERS */
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImagePreviewer = (e: any) => {
    try {
      console.log(e.target.files);
      const file = e.target.files[0];

      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR ::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async () => {
    try {
      const memberService = new MemberApiService();
      console.log("memberUpdate", memberUpdate);
      const result = await memberService.updateMemberData(memberUpdate);

      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified Successfully!",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR ::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className={"my_settings_page"}>
      <Box className={"member_media_frame"}>
        <img
          src={file}
          className={"mb_image"}
          style={{ borderRadius: "50%", marginLeft: "10px", marginRight: "5px" }}
          width={"100px"}
          height={"100px"}
        />
        <div className={"media_change_box"}>
          <span>Update your image</span>
          <p>You only can upload JPG, JPEG, PNG!</p>
          <div className={"up_del_box"}>
            <Button
              component={"label"}
              style={{ minWidth: "0" }}
              onChange={handleImagePreviewer}
            >
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
            placeholder={verifiedMemberData?.mb_nick}
            name="mb_nick"
            onChange={changeMemberNickHandler}
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
            placeholder={verifiedMemberData?.mb_phone}
            name="mb_phone"
            onChange={changeMemberPhoneHandler}
          />
        </div>
        <div className={"short_input"}>
          <label className={"spec_label"} style={{ marginLeft: "10px" }}>
            Address
          </label>
          <input
            className={"spec_input mb_address"}
            type="text"
            placeholder={
              verifiedMemberData?.mb_address ?? "Address is not inserted!"
            }
            name="mb_address"
            onChange={changeMemberAddressHandler}
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
            placeholder={
              verifiedMemberData?.mb_description ??
              "There is no additional info!"
            }
            name="mb_description"
            onChange={changeMemberDescriptionHandler}
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
          onClick={handleSubmitButton}
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
}
