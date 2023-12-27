import React, { useLayoutEffect } from "react";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import "../../../css/my_page.css";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  const history = useHistory();
  const query = useQuery();
  let member = useRouteMatch();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;

  useLayoutEffect(() => {
    const scrollIntoView = () => {
      window.scrollTo({ top: 0, left: 0 });
    };

    scrollIntoView();
  }, [history.location.pathname]);

  console.log("Query mb_id:::", query.get("mb_id"));

  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
}
