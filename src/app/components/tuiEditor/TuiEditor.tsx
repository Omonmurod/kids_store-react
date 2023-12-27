import React, { useRef, useState, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticleInput } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { assert } from "console";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router-dom";

export const TuiEditor = (props: any) => {
  /** INITIALIZE */
  const history = useHistory();
  const editorRef = useRef(null);
  const [communityArticleData, setCommunityArticleData] =
    useState<BoArticleInput>({
      art_subject: "",
      bo_id: "",
      art_content: "",
      art_image: "",
    });

  /** HANDLERS */
  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImgeToServer(image);

      communityArticleData.art_image = image_name;
      setCommunityArticleData({ ...communityArticleData });

      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`uploadImage, ERROR:, ${err}`);
    }
  };

  const changeCategorHandler = (e: any) => {
    communityArticleData.bo_id = e.target.value;
    setCommunityArticleData({ ...communityArticleData });
  };

  const changeTitleHandler = useCallback(
    (e: any) => {
      communityArticleData.art_subject = e.target.value;
      setCommunityArticleData({ ...communityArticleData });
    },
    [communityArticleData.art_subject]
  );

  const handleRegisterButton = async () => {
    try {
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();

      communityArticleData.art_content = art_content;

      if (
        communityArticleData.art_content === "" ||
        communityArticleData.bo_id === "" ||
        communityArticleData.art_subject === ""
      ) {
        throw new Error(Definer.input_err1);
      }

      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSmallSuccessAlert("Article created successfully!");
      props.setArticlesRebuild(new Date());
      props.setValue("1");
    } catch (err) {
      console.log(`handleRegisterButton, ERROR:, ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px", width: "770px" }}
        justifyContent={"space-evenly"}
      >
        <Box className={"form_row"} style={{ width: "300px" }}>
          <Typography
            style={{
              color: "orange",
              margin: "10px",
              marginLeft: "-8px",
              fontFamily: "Nunito",
              fontWeight: "880",
              fontSize: "30px",
              width: "150px",
            }}
            variant="h3"
          >
            Category
          </Typography>
          <FormControl
            sx={{ width: "100%", background: "white", marginLeft: "-15px" }}
          >
            <Select
              value={communityArticleData.bo_id}
              displayEmpty
              onChange={changeCategorHandler}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <span style={{ letterSpacing: "1px" }}>Choose a category</span>
              </MenuItem>
              <MenuItem value="celebrity" style={{ letterSpacing: "1px" }}>
                Brand Evaluation
              </MenuItem>
              <MenuItem value="evaluation" style={{ letterSpacing: "1px" }}>
                Product Review
              </MenuItem>
              <MenuItem value="story" style={{ letterSpacing: "1px" }}>
                My Story
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={"form_row"} style={{ width: "300px" }}>
          <Typography
            style={{
              color: "orange",
              margin: "10px",
              fontFamily: "Nunito",
              fontWeight: "880",
              fontSize: "30px",
              marginLeft: "20px",
            }}
            variant="h3"
          >
            Subject
          </Typography>
          <TextField
            //value={}
            id="filled-basic"
            color="primary"
            label="Subject"
            variant="filled"
            style={{
              width: "300px",
              backgroundColor: "white",
              marginLeft: "8px",
            }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>

      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue=" "
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialEditType="wysiwyg"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageURL = await uploadImage(image);
            console.log("uploadImageURL:", uploadImageURL);
            callback(uploadImageURL);
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "30px",
            width: "250px",
            height: "45px",
            fontFamily: "Nunito",
            fontWeight: "770",
            fontSize: "20px",
            letterSpacing: "1.3px",
          }}
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
