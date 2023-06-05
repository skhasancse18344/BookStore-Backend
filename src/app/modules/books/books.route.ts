import express from "express";
import { BooksController, getBooksByCriteria, getBooksByGenres, postBooks, updatePricesToInt} from "./books.controller";

const router = express.Router();
const booksController = new BooksController();

// problem:1
router.post('/', postBooks);
// Problem:2
router.get('/findBooks/:genre',getBooksByGenres);
// Problem:3
router.get('/booksByCriteria/:genre/:publisher', getBooksByCriteria);
// Problem:4
router.post('/featured-books',booksController.getFeaturedBooks.bind(booksController));
// Problem:5
router.put('/updatePriceType',updatePricesToInt);
   
  


  export default router;
  
  
  
  
  
  
  

 




