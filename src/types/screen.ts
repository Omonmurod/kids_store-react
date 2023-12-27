import { BoArticle } from "./boArticle";
import { Comments, Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { OrdersPage } from "../app/screens/OrdersPage/index";
import { Brand, Member } from "./user";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
  memberPage: Member;
  brandPage: BrandPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
}

/** HOMEPAGE STATE */
export interface HomePageState {
  saleProducts: any;
  topBrands: Brand[]; 
  bestProducts: Product[];
  bestBoArticles: BoArticle[];
}

/** PRODUCT PAGE STATE */
export interface ProductPageState {
  randomProduts: Product[];
  targetProducts: Product[];
  chosenProduct: Product | null;
  targetComments: Comments[];
}

/** BRAND PAGE STATE */
export interface BrandPageState {
  targetBrands: Brand[];
  randomBrands: Brand[];
  chosenBrand: Brand | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
  targetComments: Comments[];
}

/** ORDER PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

/** COMMUNITY PAGE */
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

/** MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
  targetComments: Comments[];
  targetProducts: Product[];
}