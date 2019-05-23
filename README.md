# foodcep-api

<img  alt="alt text" src="https://foodcep.com/assets/logo/loco-circle.png" width="200">

## Summary

This is the API of the [foodcep](https://foodcep.com) project.

## Development Stack

- NodeJS
- Express 
- MySQL

## Plugins

- bcrypt
- nodemailer
- morgan
- jsonwebtoken
- express-jwt
- dotenv
- request
- uuid

## Routes

All the data of this API is managed through JSON objects/arrays

### Authentication

1. `/signin/restaurant` 
    - Action: Signs in an user with a restaurant.
    - Expects: `{ email, password, name, restaurant_name, phone, adress, description, language, currency }`
    - Method: POST

2. `/signin/`
    - Action: Signs in an user and relate it to a restaurant.
    - Expects: `{ email, password, name, language, currency }`
    - Method: POST
    
3. `/verify/:code`
    - Action: Verifies the user email.
    - Method: GET

4. `/verify/resed/`
    - Action: Resends the verification code to the user's email.
    - Expects `{ user_id }`
    - Method: POST
    
5. `/forgot-password?email=<something>`
    - Action: Sends an email to the user with a link to change its password
    - Method: GET
    
6. `/forgot-password/update`
    - Action: Changes the user password
    - Expects: { code, newPassword }
    - Method: POST
    
7. `/login`
    - Action: Generates JWT token and sends it through cookies. Generates and store a session_id related to the user
    - Expects: { email, password }
    - Method: POST

7. `/logout`
    - Action: Clears the cookies and revoke the session_id on the DB
    - Expects: SESSION_ID (it's stored on the SESSION_ID cookie)
    - Method: POST

8. `/refresh`
    - Action: Cheks if the session_id is valid on the DB and signs a new JWT token
    - Expects: SESSION_ID (it's stored on the SESSION_ID cookie)
    - Method: POST
    
9. `/captcha/verify`
    - Action: Verifies the token with the Google API and redirects the request if the token is valid
    - Expects: { token, redirection }
    - Method: POST
    
9. `/captcha/verify`
    - Action: Verifies the token with the Google API and redirects the request if the token is valid
    - Expects: { token, redirection }
    - Method: POST
    
9. `/currencies`
    - Action: Send the currencies stores on the DB
    - Method: GET

### Products 

1. `/api/products/create`
    - Action: Creates a product and relates it to a restaurant.
    - Expects: { name, price, loss, cost, category } / token (taken from the cookie token)
    - Method: POST
    
2. `/api/products/update`
    - Action: Updates a product.
    - Expects: { name, price, loss, cost, category } / token (taken from the cookie token)
    - Method: PUT
    
3. `/api/products/read?product=<something>&&page=<something>`
    - Action: Reads products parametered with the query related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
4. `/api/products/delete/:id`
    - Action: Deletes a product related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: DELETE

5. `/api/products/read/pdf`
    - Action: Reads every product related to a restaurant .
    - Expects: token (taken from the cookie token)
    - Method: GET

6. `/api/products/categories/create/`
    - Action: Creates a category related to a restaurant.
    - Expects: { name } / token (taken from the cookie token)
    - Method: POST

7. `/api/products/categories/read/`
    - Action: Reads every category related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
8. `/api/products/categories/update/:id
    - Action: Updates a category related to a restaurant.
    - Expects: { name } / token (taken from the cookie token)
    - Method: PUT
    
9. `/api/products/categories/delete/:id`
    - Action: Deletes a category related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: DELETE
    
### Dishes

1. `/api/dishes/create/`
    - Action: Creates a dish related to a restaurant.
    - Expects: { name, category, cost, ingredients } / token (taken from the cookie token)
    - Method: POST


2. `/api/dishes/read/`
    - Action: Reads every dish related to a restaurant without its ingredients.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
3. `/api/dishes/read/without-recipe`
    - Action: Reads a dish related to a restaurant without it's recipe.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
4. `/api/dishes/read/complete/:id`
    - Action: Reads a dish related to a restaurant with its ingredients.
    - Expects: token (taken from the cookie token)
    - Method: GET


5. `/api/dishes/patch/`
    - Action: Updates a dish related to a restaurant.
    - Expects: JSON Patchs with the [RFC 6902](https://tools.ietf.org/html/rfc6902) especification / token (taken from the cookie token)
    - Patch Paths: `ingredients/:id`, `product/:id`, `/cost`
    - Method: PATCH


6. `/api/dishes/delete/:id`
    - Action: Deletes a dish related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: DELETE
    
### Orders

1. `/api/orders/create/`
    - Action: Creates a order and relates it to a restaurant.
    - Expects: { supplier, items } / token (taken from the cookie token)
    - Method: POST

2. `/api/orders/read/last`
    - Action: Reads last order without items made by the user's restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
3. `/api/orders/read/:id`
    - Action: Reads an order with items realed to a restaurant
    - Expects: token (taken from the cookie token)
    - Method: GET
    
4. `/api/orders/read`
    - Action: Reads the last 20 orders from a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
### Suppliers 

1. `/api/suppliers/create/`
    - Action: Creates a category related to a restaurant.
    - Expects: { name, email, phone, comertial } / token (taken from the cookie token)
    - Method: POST

2. `/api/suppliers/read/`
    - Action: Reads every supplier related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
3. `/api/suppliers/read/:id`
    - Action: Read one supplier related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
4. `/api/suppliers/update/:id`
    - Action: Updates a supplier related to a restaurant.
    - Expects: { name, email, phone, comertial } / token (taken from the cookie token)
    - Method: PUT
    
5. `/api/suppliers/delete/:id`
    - Action: Deletes a supplier related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: DELETE
    
### Users

1. `/api/users/profile`
    - Action: Creates a category related to a restaurant.
    - Expects: session_id (taken from the cookie SESSION_ID)
    - Method: GET

2. `/api/users/currency/update/`
    - Action: Updates the user's currency.
    - Expects: { symbol, user_id }
    - Method: PUT
    
3. `/api/users/email/update/`
    - Action: Updates the user's email.
    - Expects: { user_id, language }
    - Method: PUT
    
4. `/api/users/language/update/`
    - Action: Updates the user's language.
    - Expects: { email, password, newEmail }
    - Method: PUT
    
5. `/api/users/name/update/`
    - Action: Updates the user's name.
    - Expects: { email, name }
    - Method: PUT
    
6. `/api/users/password/update/`
    - Action: Updates the user's name.
    - Expects: { email, currentPassword, newPassword }
    - Method: PUT
    
7. `/api/users/delete/`
    - Action: Deletes an user's account.
    - Expects: { email, password }
    - Method: DELETE
    
6. `/api/users/delete/`
    - Action: Deletes an user's account.
    - Expects: { email, password }
    - Method: DELETE

7. `/api/users/stats/`
    - Action: Get the stats of the restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
    
#### Restaurant admin routes

1. `/api/users/invite/`
    - Action: Generates an invitation link for a new user.
    - Expects: token (taken from the cookie token)
    - Method: POST
    
2. `/api/users/team/`
    - Action: Reads every user related to a restaurant.
    - Expects: token (taken from the cookie token)
    - Method: GET
    
3. `/api/users/team/user`
    - Action: Updates a user's role.
    - Expects: { user_id } / token (taken from the cookie token)
    - Method: PUT
    
4. `/api/users/team/delete/:id`
    - Action: Deletes an user from a restaurant. This action will delete the user's account too.
    - Expects: token (taken from the cookie token)
    - Method: DELETE

## Notes

- This server is not supposed to serve static files neither on development or production.

- You can find all the SQL code used to make the DB Schema and every Stored Procedure of the MySQL Server on this repository.

- The authentication system is using JWT through cookies and sessions to store refresh token codes.
