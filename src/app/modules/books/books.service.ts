import { IBook } from "./books.interface";
import Books from "./books.model";



export const postBooksToDD=async()=>{

    const books = new Books({
    
        "title": "Book 1",
        "author": ["Author 1", "Author 2"],
        "genre": "Mystery",
        "publicationYear": 2020,
        "publisher": { "name": "Publisher A", "location": "City A" },
        "reviews": [
           { "user": "User 1", "comment": "Great book!" },
           { "user": "User 2", "comment": "Interesting plot" }
        ],
        "rating": 4.5,
        "price": 90,
     
  });
  await books.save();
  return books;
 

  }

  //Get Books BY Genre

  export const getBook = async (payload: { genre: string } | null): Promise<IBook[] | null> => {
    if (payload) {
      const books = await Books.find({ genre: payload.genre });
      return books;
    }
    return null;
  }


  //Get Books by Genre and Publisher name
  
  export const findBookBySpecificCriteria = async (payload: { genre: string, publisher: { name: string } } | null): Promise<IBook[] | null> => {
    try {
      if (payload) {
        const { genre, publisher } = payload;
        const books = await Books.find({ genre, 'publisher.name': publisher.name });
        return books;
      }
      return null;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

// Problem :4

  export class BooksService {
    async getFeaturedBooks() {
      try {
        const updatedBooks = await Books.updateMany(
          {
            rating: { $gte: 4, $lt: 4.5 }, // Filter criteria for updating featured books with rating >= 4.5
          },
          {
            $set: {
              featured: 'Popular',
            },
          }
        );
        await Books.updateMany(
          {
            rating: { $gt: 4.5}, // Filter criteria for updating non-featured books with rating < 4.5
          },
          {
            $set: {
              featured: 'BestSeller', // Unset the 'featured' field for non-featured books
            },
          }
        );
        return updatedBooks;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update featured books.');
      }
    }
  }
  

// Problem:5

  export const updatePrices = async (): Promise<any> => {
    try {
      const result = await Books.updateMany(
        { publicationYear: { $gt: 2020 } },
        [
          {
            $set: {
              price: {
                $convert: {
                  input: { $toDouble: '$price' },
                  to: 'int',
                  onError: 0
                }
              }
            }
          }
        ]
      );
      console.log('Prices updated successfully');
      return result;
    } catch (error) {
      console.error('Error updating prices:', error);
      throw error;
    }
  };
  
  
  




  
  
  
  
  
  
  