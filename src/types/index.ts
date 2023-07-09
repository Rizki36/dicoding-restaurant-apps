export type Restaurant = {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
};

export type RestaurantDetail = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  pictureId: string;
  categories: {
    name: string;
  }[];
  menus: {
    foods: {
      name: string;
    }[];
    drinks: {
      name: string;
    }[];
  };
  rating: number;
  customerReviews: {
    name: string;
    review: string;
    date: string;
  }[];
};

export type AddReviewData = {
  id: string;
  name: string;
  review: string;
};
