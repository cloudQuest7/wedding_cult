export interface Offer {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
