export interface Post {
  _id: string;
  title: string;
  body: string;
  image?: {
    asset: {
      url: string;
    };
  };
}
