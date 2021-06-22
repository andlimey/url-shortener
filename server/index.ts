import { initialiseTable, addShortenedUrl, getActualUrl } from "./db";
import express from 'express';
import Str from '@supercharge/strings';

const app = express();

const domain = "localhost"
const port = 4000;
let db: any;

interface ShortenUrlReqBody {
    url: string
    alias ?: string
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json()) // for parsing application/json

app.get('/:shortUrl', async (request: any, response:any) => {
    console.log(request.params.shortUrl);
    const original = await getActualUrl(db, request.params.shortUrl)
    console.log(`Value retrieved is ${original}`);

    if (original.length === 0) {
        return response.status(404).json({ info: "No such alias exists" })
    }
    console.log(`Redirecting to: ${original}`);
    return response.redirect(301, original);
})

app.post('/shortenUrl', (request: any, response: any, next: any) => {
    console.log(request.body);
    let data: ShortenUrlReqBody = request.body

    if (!isValidUrl(data.url)) {
        return response.status(400).json({ info: "Url given is not valid" });
    }

    if (data.alias && !isUrlFriendly(data.alias)) {
        return response.status(400).json({ info: "Alias given is not url-friendly" });
    }
    
    const alias = generateAlias();
    const result = addShortenedUrl(db, alias, data.url)

    if (!result) {
        return response.status(500).json({ info: "Could not fulfil request" })
    }

    return response.status(200).json({ shortenedUrl : `http://${domain}:${port}/${alias}` })
});

app.listen(port, async () => {
    db = await initialiseTable()
    console.log(`App running on port ${port}.`);
});


const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(`((http|https)://)(www.)?` +  // Starts with http/https, followed by "://www."
            `[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]` +    // Subdomain
            `{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`         // Top level domain
        )
    return !!pattern.test(url);
}

const isUrlFriendly = (alias: string): boolean => {
    const pattern = new RegExp(`^[a-zA-Z0-9_-]*$`)

    return pattern.test(alias);
}

const generateAlias = (): string => {
    return Str.random(8)    // Randomly generates an alias of length 8
}