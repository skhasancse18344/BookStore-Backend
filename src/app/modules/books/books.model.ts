import { Model, Schema, model } from "mongoose";
import { IBook } from "./books.interface";

//Creating Schema Using Interface
const booksSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  publisher: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  reviews: [
    {
      user: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  featured: {
    type: String,
    enum: ["BestSeller", "Popular"],
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
 
});

interface IBooksModel extends Model<IBook> {
  getFeaturedBooks(): Promise<IBook[]>;
}

booksSchema.statics.getFeaturedBooks = function () {
  return this.find({ rating: { $gte: 4 } }).then((books:any) => {
    return books.map((book:any) => {
        
      if (book.rating >= 4.5) {
        book.featured = "BestSeller";
      } else {
        book.featured = "Popular";
        
      }
      
      return book;
      
    });
  });
};

const Books: IBooksModel = model<IBook, IBooksModel>('Books', booksSchema);


export default Books;
