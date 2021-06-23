# About

The client-side program was bootstrapped with `npx create-react-app`. Material UI was also used.

The server-side program was done in Typescript.

# Instructions

## To run the program

Open 2 terminals. `cd` into `client/` and `server/` respectively.
Install dependencies using `npm i` and run `npm start`.

The client runs on port 3000 while the server runs on port 5000.

### Using the application

The web application is as seen below. The only compulsory field is the `Url` field. A placeholder value is also used to guide the users on how to input the url.

![URL-Shortener placeholder](/images/url-shortener-placeholder.png)

Upon submitting the request, the shortened URL will appear in a card component as seen below.

Users can then copy the link to the clipboard or be redirected to the link.

![URL-Shortener placeholder](/images/url-shortener-card.png)

## For Testing

Several unit tests were written to test the behaviour of the server. They were written using the Mocha framework and the Chai assertion library.

To run the tests:

```
cd server
npm test
```

# Basic Requirements

Given a URL, the service should generate a shorter and unique alias. The current service generates a random url-friendly string using the `@supercharge/strings` library. This also ensures that the links are not predictable.

When users access a shortened link, the service should redirect them to the original link.

## Additional Features

### Custom Alias

Users are able to specify the alias they want for the shortened url. This alias will be checked against to ensure that it is url-friendly.

## Possible Extensions

### Expiry Date

A possible extension would be to allow users to specify an expiry date, or set a default, for the shortened URL. This information can be stored in the database, allowing an external garbage collector or cleaning service to clear the database of expired shortened links.

# Database

SQLite was chosen as it was easy to setup. In a production environment, other relational databases can possibly be considered instead.

The table name is `url`. There are currently only 2 columns: `shortened` and `original`.

# Known Bugs

Regex to check if a url is valid or not is not perfect. E.g. `www.google` will still pass.

# Design Decisions

Several design choices were made over others.

## Typescript over Golang

Given more time, I would have written the backend server in Golang instead. I haven't used Golang since last December and I didn't have time to familiarise myself with it again. Instead, I chose to implement it in Typescript first as I am more familiar with it.

Golang would have been more ideal as this type of service is expected to be read-heavy. i.e. Many clients will be sending GET requests to the shortened url. The service will therefore have to process many of these concurrent requests. Golang's native (and lightweight) goroutines would probably be more ideal for this situation.

## Using a random string generator over an external service

Another possible design consideration would be to implement another service, `ShortURLService`, to provide random url-friendly strings of varying sizes. This service would have already prepared these strings beforehand. Hence, when the `url-shortener service` requests for an alias, the external service can quickly provide a random string, rather than generate it on the spot.

However, for the purposes of this assessment, a random url-friendly string generator was sufficient. In a production environment, it might be useful to determine how many concurrent requests the server can expect from clients to shorten urls.
