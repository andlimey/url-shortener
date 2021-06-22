# Instructions
## To run the program
Open 2 terminals. `cd` into `client/` and `server/` respectively.
Install dependencies using `npm i` and run `npm start`.

The client runs on port 3000 while the server runs on port 4000.

## For Testing
Several unit tests were written to test the behaviour of the server.

# Basic Requirements
Given a URL, the service should generate a shorter and unique alias. The current service generates a random url-friendly string using the `@supercharge/strings` library. This also ensures that the links are not predictable.

When users access a shortened link, the service should redirect them to the original link. 

## Additional Features
### Custom Alias
Users are able to specify the alias they want for the shortened url. This alias will be checked against to ensure that it is url-friendly. 

## Possible Extensions
### Expiry Date
A possible extension would be to allow users to specify an expiry date, or set a default, for the shortened URL. This information can be stored in the database, allowing an external garbage collector or cleaning service to clear the database of expired shortened links.

# Database Design
SQLite was chosen as it was easy to setup. In a production environment, other relational databases can possibly be considered instead.

The table name is `url`. There are currently only 2 columns: `shortened` and `original`.