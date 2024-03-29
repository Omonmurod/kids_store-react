export interface MeLiked {
  mb_id: string;
  like_ref_id: string;
  my_favorite: boolean;
}

// export interface MeViewed {
//   mb_id: string;
//   view_ref_id: string;
//   my_view: boolean;
// }

export interface Product {
  length: number;
  me_viewed: any;
  _id: string;
  me_liked: MeLiked[];
  product_name: string;
  product_collection: string;
  product_type: string;
  product_status: string;
  product_price: number;
  discount: Discount;
  product_left_cnt: number;
  product_size: string;
  product_volume: number;
  product_description: string;
  product_images: string[];
  product_likes: number;
  product_views: number;
  product_rating: number;
  product_reviews: number;
  brand_mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  discountedPrice: number;
  sortDiscountValue: number;
  product_ratings: ProductRating[];
}

export interface Discount {
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
}

export interface ProductRating {
  product_rating: number;
  count: number;
  percentage: number;
}
