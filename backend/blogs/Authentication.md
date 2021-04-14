# Authentication:

## Authentication flow

### First time
         Authenticate user's name, email from their google accounts.
         Adds their name email and token (generated as access token by google) to the database
         Serialize the token as store it in the client's browser, after successful athentication.

### Existing User
         user sends request along with the token
         if the token exist in database, userId is extracted
         This userId will be passed to the database along with the requested query
         User will get the requested resource, which is associated by his and only his userID.

### User logging out
         user sends the logout out request
         database fetches the userID associated with the token
         database deletes the token of the fetched userID
         if the userID associated with the token is not found, then the user session is considered to be timed out

### User requesting after log out:
         user sends a request with none or invalid token
         the token does not point to any existing user
         Server redirects the page

<br>

## Advantages

1. User session can be regulated from server-side.
1. Clients token is validated on each request, cannot access secured endpoints without valid token
1. UserId is not shared with the client, only temporary token is shared, so other users can't access/modify the data
1. UserID need not be shared in transaction item, entity item can decrease payload size (decreased transaction and entity size by 12% and 18% respectively)
1. Even if the userID leaks out, protected endpoints are configured to take userID from the server after validation of token.
   
<br>

## Disadvantages

1. Each authentication function using different accounts (facebook, twitter, github etc), requires their own implementation.
1. Configuration of authentication server on their own dashboard.
1. User may or may not have access to google account.

<br>

## Challenges we faced

1. Configuring oauth dashboard for google authentication, needed deployment url in consent screen due to which needed to deploy the app before configuring callback and redirect urls.
1. Passport documentation is not enough, for our requirements.
1. Needed to implement CRUD operation on database for validation, token refresh and token deletion.
1. Redirect to cross-domain with cookies. (which is not possible, learnt it the hard way)

<br>

## Next Goals

1. Implement local authentication using email and password
1. Add facebook as authentication partner
1. Separate user table from authentication table in database (for one to many relation mapping)
1. Add token and userID of active user in cache.
