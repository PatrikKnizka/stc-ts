import fs from "fs"
import cors from "cors"
import http from "http"
import express from "express"
import { Book } from "./types/Book"
import { json, urlencoded } from "body-parser"

let app;

function createServer() {
    app = express();

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    
    http.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000.")
    });

    app.get("/api/library/book/:id/info", (req, res) => {
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });
            
        const _id: number = parseInt(req.params["id"]);

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
        } else {
            res.json("Kniha nebola nájdená.")
        }
    });

    app.post("/api/library/book/:id/info", (req, res) => {
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });

        const _id: number = parseInt(req.params["id"]);

        if (myBooks.has(_id)) {
            let book: Book = myBooks.get(_id);

            res.json(book)
        } else {
            res.json("Kniha nebola nájdená.")
        }
    });

    app.put("/api/library/book/:id/add", (req, res) => {
        let myBooks = new Map();
        let myJSONBooks: Array<Book> = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });

        const _id: number = parseInt(req.params["id"]);

        if (myBooks.has(_id)) {
            res.json("Daná kniha s daným ID už existuje.");
        }
        else {
            myJSONBooks.push({
                "id"              : _id,
                "name"            : req.body["name"],
                "author"          : req.body["author"],
                "gender"          : req.body["gender"],
                "year"            : req.body["year"],
                "publisher"       : req.body["publisher"],
                "country"         : req.body["country"],
                "number_of_pages" : req.body["number_of_pages"]
            });

            let json: string = JSON.stringify(myJSONBooks);
            fs.writeFile('../books.json', json, 'utf8', function (err) {
                res.json("Kniha bola úspešne vložená.")
            });
        }
    });

    app.delete("/api/library/book/:id/delete", (req, res) => {
        let myBooks = new Map();
        let myJSONBooks: Array<Book>  = JSON.parse(fs.readFileSync("../books.json").toString());
        myJSONBooks.forEach((book: Book) => {
            myBooks.set(book.id, book)
        });

        const _id: number = parseInt(req.params["id"]);

        if (myBooks.has(_id)) {
            myJSONBooks = myJSONBooks.filter((item: Book) => item.id !== _id);

            let json: string  = JSON.stringify(myJSONBooks);
            fs.writeFile('../books.json', json, 'utf8', function (err) {
                res.json("Kniha bola úspešne odstránená.")
            });
        }
        else {
            res.json("Daná kniha s daným ID neexistuje.");
        }
    });
}

createServer();