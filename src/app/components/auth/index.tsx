import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

export default function AuthenticationModal(props: any) {
  /** INITIALIZATIONS */
  const classes = useStyles();
  const [mb_nick, set_mb_nick] = useState<string>("");
  const [mb_phone, set_mb_phone] = useState<number>(0);
  const [mb_password, set_mb_password] = useState<string>("");

  /** HANDLERS */
  const handleUsername = (e: any) => {
    set_mb_nick(e.target.value);
    console.log(mb_nick);
  };
  const handlePhone = (e: any) => {
    set_mb_phone(e.target.value);
    console.log(mb_phone);
  };
  const handlePassword = (e: any) => {
    set_mb_password(e.target.value);
    console.log(mb_password);
  };

  const handleSignupRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "" && mb_phone !== 0;
      assert.ok(is_fulfilled, Definer.input_err1);

      const signup_data = {
        mb_nick: mb_nick,
        mb_phone: mb_phone,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(signup_data);

      props.handleSignUpClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "";
      assert.ok(is_fulfilled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      props.handleLoginClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.signUpOpen}
        onClose={props.handleSignUpClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.signUpOpen}>
        <Stack
            className={classes.paper}
            direction={"row"}
            sx={{
              width: "820px",
              height: "500",
              borderColor: "white",
              borderRadius: "20px",
            }}
          >
            <ModalImg
              src={"/auth/log-in.gif"}
              alt="camera"
              style={{ marginTop: "30px" }}
            />
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Nunito",
                fontSize: "25px",
                fontWeight: "900",
                color: "#423127",
                marginLeft: "35px",
              }}
            >
              <h2>SignUp Form</h2>
              <TextField
                //onChange={handleUsername}
                sx={{ marginTop: "7px", borderColor: "white" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: "#c9c9c9",
                  },
                }}
              />
              <TextField
                //onChange={handlePhone}
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: "#c9c9c9",
                  },
                }}
              />
              <TextField
                //onChange={handlePassword}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: "#c9c9c9",
                  },
                }}
              />
              <Fab
                //onClick={handleSignupRequest}
                sx={{ marginTop: "30px", width: "150px", marginBottom: "20px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.loginOpen}
        onClose={props.handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.loginOpen}>
        <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px", borderColor: "white", borderRadius: "20px" }}
          >
            <ModalImg src={"/auth/log-in.gif"} alt="camera" />
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Nunito",
                fontSize: "25px",
                fontWeight: "900",
                color: "#423127",
                marginLeft: "53px",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                onChange={handleUsername}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: "#c9c9c9",
                  },
                }}
                sx={{ my: "10px" }}
              />
              <TextField
                onChange={handlePassword}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: "#c9c9c9",
                  },
                }}
              />
              <Fab
                onClick={handleLoginRequest}
                sx={{ marginTop: "27px", width: "150px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}