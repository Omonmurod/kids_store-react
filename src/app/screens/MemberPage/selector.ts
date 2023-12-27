import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;
export const retriveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);
export const retriveChosenMemberBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberBoArticles
);
export const retriveChosenSingleBoArticle = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleBoArticle
);
export const retriveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retriveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);
export const retriveTargetProducts= createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.targetProducts
);
export const retriveTargetComments = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.targetComments
);