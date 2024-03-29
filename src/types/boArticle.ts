import { MeLiked } from "./product";
import { Member } from "./user";

// interface bu custom typescripti biz yozib olgan
export interface BoArticleInput {
  art_subject: string;
  art_content: string;
  art_image: string;
  bo_id: string;
}

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image: string;
  bo_id: string;
  art_status: string;
  art_likes: number;
  art_views: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
  //me_viewed: MeViewed[];
}

export interface SearchArticlesObj {
  page: number;
  limit: number;
  bo_id: string;
  order?: string | null;
}

export interface SearchMemberArticlesObj {
  page: number;
  limit: number;
  mb_id: string;
}