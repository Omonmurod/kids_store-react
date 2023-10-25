import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../css/my_page.css";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";

export function MemberPage() {
  let member = useRouteMatch();
  console.log(member);
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/other`}><VisitOtherPage /></Route>
        <Route path={`${member.path}`}><VisitMyPage /></Route>
      </Switch>
    </div>
  );
}