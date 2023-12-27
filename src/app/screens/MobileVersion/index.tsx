import React from "react";
import { Box, Container, Stack } from "@mui/material";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";
import { NavLink } from "react-router-dom";
import { Entrance } from "../HomePage/entrance";

export function MobileVersion(props: any) {
  const { isMobile } = useDeviceDetect();

  if (isMobile()) {
    return (
      <div>
        <Container>
          <div
            style={{
              width: "430px",
              height: "620px",
              marginTop: "140px",
              backgroundColor: "white",
              marginLeft: "-15px",
              color: "#423127",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                width: "330px",
                fontFamily: "nunito",
                fontSize: "22px",
                fontWeight: 770,
                marginLeft: "55px",
                marginTop: "200px"
              }}
            >
              Please, use desktop version! 👨‍💻
            </p>
            <p
              style={{
                fontFamily: "nunito",
                fontSize: "22px",
                fontWeight: 770,
                marginTop: "-15px",
                marginLeft: "59px",
              }}
            >
              Mobile version is on its way 😊
            </p>
          </div>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}
