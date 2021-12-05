import fs from "fs"
import cors from "cors"
import http from "http"
import express from "express"
import { Book } from "./types/Book"
import { json, urlencoded } from "body-parser"
import { arrayify } from "tslint/lib/utils"

let app;

/**
 * Function to find book by the name or the author
 * @param author possible parameter - author's name we are looking for, default ""
 * @param name possible parameter - name of the book we are looking for, default ""
 * @param book object of the book we are inspecting
 * @returns @param book if her's author contains @param author or her's name containts @param name
 */
let findBooks = function (author: string = "", name: string = "", book: Book) {
    if (author) {
        for(let i = 0; i < book.author.length; i++){
            if (book.author[i].toLowerCase().includes(author.toLowerCase())){
                return book
            }
        }
    }
    else if (name) {
        return book.name.toLowerCase().includes(name.toLowerCase()) ? book : false;
    } 
}

function createServer() {
    app = express();

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    
    http.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000.")
    });



    app.get("/api/library/book/:id/info", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });
        
        // Getting _id from request parameters
        const _id: number = parseInt(req.params["id"]);

        // Returning id, name, author, gender of book if _id is in map myBooks
        if (myBooks.has(_id)) {
            let book: Book = myBooks.get(_id);

            res.json(
                {
                    "id"     : book.id,
                    "name"   : book.name,
                    "author" : book.author,
                    "gender" : book.gender    
                }
            )
        }
        // Returning error message 
        else {
            res.json("Kniha nebola nájdená.")
        }
    });

    app.post("/api/library/book/:id/info", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });

        // Getting _id from request parameters
        const _id: number = parseInt(req.params["id"]);

        // Returning whole object of book if _id is in map myBooks
        if (myBooks.has(_id)) {
            let book: Book = myBooks.get(_id);

            res.json(book)
        } else {
            res.json("Kniha nebola nájdená.")
        }
    });
    

    app.post("/api/library/book/find/name", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });
        
        // Getting books's name from request parameters
        const name = req.body["name"];
        // Filtering books by name
        const responseBooks: Array<Book> = myJSONBooks.filter(book => findBooks(undefined, name, book));
        // Sending response - array of book that have match in book's name
        res.json(responseBooks);
    });

    app.post("/api/library/book/find/author", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });
        
        // Getting author's names from request parameters
        const author = req.body["author"];
        // Filtering books by authors
        const responseBooks: Array<Book> = myJSONBooks.filter(book => findBooks(author, undefined, book));
        // Sending response - array of book that have match in authors name
        res.json(responseBooks);
    });


    app.put("/api/library/book/add", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book> = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });
        let _id: number = 0;

        // Generating new and random id
        do {
            _id = Math.floor(Math.random() * (Math.pow(10,6) - 1));
        } while (_id === 0 || myBooks.has(_id))

        // Creating book object from request parameters
        const newBook: Book = {
            "id"              : _id,
            "name"            : req.body["name"],
            "author"          : req.body["author"],
            "gender"          : req.body["gender"],
            "year"            : req.body["year"],
            "publisher"       : req.body["publisher"],
            "country"         : req.body["country"],
            "number_of_pages" : req.body["number_of_pages"]
        };

        // Writing new book into JSON
        myJSONBooks.push(newBook);
        let json: string = JSON.stringify(myJSONBooks);
        fs.writeFile('../books.json', json, 'utf8', function (err) {
            // Sending response - new book
            res.json(newBook)
        });
    });

    app.delete("/api/library/book/:id/delete", (req, res) => {
        // Algoritm to create map of books from JSON
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });

        // Getting _id from request parameters
        const _id: number = parseInt(req.params["id"]);

        // If there is a book with an _id
        if (myBooks.has(_id)) {
            // Filtering and rewriting JSON file
            myJSONBooks = myJSONBooks.filter((item: Book) => item.id !== _id);

            let json: string  = JSON.stringify(myJSONBooks);
            fs.writeFile('../books.json', json, 'utf8', function (err) {
                // Sending response
                res.json("Kniha bola úspešne odstránená.")
            });
        }
        // If the book does not exist
        else {
            // Sending error response
            res.json("Daná kniha s daným ID neexistuje.");
        }
    });
}


createServer();