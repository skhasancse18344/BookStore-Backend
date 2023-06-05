
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Schema, model } from 'mongoose';

const app:Application = express()

//Application routes
import booksRouter from './app/modules/books/books.route'
//Using Cors 
app.use(cors());

//Parse Data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/api/v1/books',booksRouter);


export default app;