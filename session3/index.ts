import fs from "fs"
import cors from "cors"
import http from "http"
import express from "express"
import { Book } from "./types/Book"
import { json, urlencoded } from "body-parser"

let app;
const myBooks: Array<Book> = JSON.parse(fs.readFileSync("./books.json").toString())

/**
 * Function, that looks for a book in an array
 * @param sourceArray the array we are looking a book in
 * @param id the id of the book we are looking for 
 * @returns array, which contains if the book is in myBooks, the index of a book in a sourceArray 
 */
function isInArray(sourceArray: Array<Book>, id: string): [boolean, number] {
    for(let i = 0; i < sourceArray.length; i++) {
        if (sourceArray[i].id === Number(id)) {
            return [true, i];
        }
    }
    return [false, -1];
}

function createServer() {
    app = express();

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    
    http.createServer(app).listen(3000, () => {
        console.log("Running server on port 3000.")
    });

    /**
     * GET
     */
    app.get("/api/library/book/:id/info", (req, res) => {
        const id: string = req.params["id"];
        const searchResult = isInArray(myBooks, id);

        if (searchResult[0]) {
            res.json(
                {
                    "id"     : myBooks[searchResult[1]].id,
                    "name"   : myBooks[searchResult[1]].name,
                    "author" : myBooks[searchResult[1]].author,
                    "gender" : myBooks[searchResult[1]].gender    
                }
            )
        } else {
            res.json("Kniha nebola nájdená.")
        }
    });

    /**
     * POST
     */
    app.post("/api/library/book/:id/info", (req, res) => {
        const id: string = req.params["id"];
        const searchResult = isInArray(myBooks, id);

        if (searchResult[0]) {
            res.json(myBooks[searchResult[1]])
        } else {
            res.json("Kniha nebola nájdená.")
        }
    });
}

createServer();