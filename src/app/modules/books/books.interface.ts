   //Create an interface
   export interface IBook {
    id: string;
    title: string;
    author: string[];
    genre: string;
    publicationYear: number;
    publisher: {
      name: string;
      location: string;
    };
    reviews: {
      user: string;
      comment: string;
    }[];
    featured: string;
    rating: number;
    price: number;
  }
  