import { NextFunction, Request, Response } from "express";
import {
  BooksService,
  findBookBySpecificCriteria,
  getBook,
  postBooksToDD,
  updatePrices,
} from "./books.service";

//Problem :1

export const postBooks = async (req: Request, res: Response) => {
  const books = await postBooksToDD();
  res.status(200).json({
    status: "Success",
    data: books,
  });
};
// Problem :2

export const getBooksByGenres = async (req: Request, res: Response) => {
  const genre = req.params.genre;
  const books = await getBook({ genre }); // Pass an object with the genre property

  if (books) {
    res.status(200).json(books);
  } else {
    res
      .status(404)
      .json({ message: "No books found for the specified genre." });
  }
};

// Problem :3

export const getBooksByCriteria = async (req: Request, res: Response) => {
  try {
    const genre = req.params.genre;
    const publisher = req.params.publisher;

    const books = await findBookBySpecificCriteria({
      genre,
      publisher: { name: publisher },
    });

    if (books) {
      res.status(200).json(books);
    } else {
      res
        .status(404)
        .json({ message: "No books found for the specified criteria." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//   Problem :4

export class BooksController {
  private booksService: BooksService;

  constructor() {
    this.booksService = new BooksService();
  }

  async getFeaturedBooks(req: Request, res: Response) {
    try {
      const featuredBooks = await this.booksService.getFeaturedBooks();

      res.json(featuredBooks);
    } catch (error) {
      // Handle the error
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

//   Problem :5

export const updatePricesToInt = async (req: Request, res: Response) => {
  try {
    const result = await updatePrices();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error updating prices" });
  }
};
