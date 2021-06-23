import { initialiseTable, addShortenedUrl, getActualUrl } from "./db";
import { isValidUrl, isUrlFriendly, generateAlias } from "./utils";
import express from "express";

const app = express();

const domain = "localhost";
const port = 5000;
let db: any;

interface ShortenUrlReqBody {
    url: string;
    alias?: string;
}

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});
app.use(express.json()); // for parsing application/json

app.get("/:shortUrl", async (request: any, response: any) => {
    const original = await getActualUrl(db, request.params.shortUrl);

    if (original.length === 0) {
        return response.status(404).json({ info: "No such alias exists" });
    }
    return response.redirect(301, original);
});

app.post("/shortenUrl", (request: any, response: any, next: any) => {
    let data: ShortenUrlReqBody = request.body;

    if (!isValidUrl(data.url)) {
        return response.status(400).json({ info: "Url given is not valid" });
    }

    if (data.alias && !isUrlFriendly(data.alias)) {
        return response
            .status(400)
            .json({ info: "Alias given is not url-friendly" });
    }

    let alias = "";
    data.alias ? (alias = data.alias) : (alias = generateAlias());
    const result = addShortenedUrl(db, alias, data.url);

    if (!result) {
        return response.status(500).json({ info: "Could not fulfil request" });
    }

    return response
        .status(200)
        .json({ shortenedUrl: `http://${domain}:${port}/${alias}` });
});

app.listen(port, async () => {
    db = await initialiseTable();
    console.log(`App running on port ${port}.`);
});
