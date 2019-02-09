<!-- prettier-ignore-start -->
# DevLink - Social Network for Developers

[Add Description]

## Back-end

* [x] Install dependencies
    * express
    * mongoose
    * passport
    * passport-jwt
    * jsonwebtoken
    * body-parser
    * bcryptjs
    * validator
    * gravatar
* [x] Install dev-dependencies
    * nodemon
* [x] Create server.js
* [x] Connect to MongoDB
* [x] Define schemas
    * [x] User
    * [x] Profile
    * [x] Post
* [x] Set API routes
    * [x] api/users/
        * [x] Register user
            * [x] Import Gravatar
            * [x] Encrypt password
        * [x] Login user
            * [x] Decrypt password
            * [x] Return signed JWT token
    * [x] api/profiles/
        * [x] Fetch current user profile
        * [x] Fetch user profile by username
        * [x] Fetch user profile by id
        * [x] Fetch all profiles
        * [x] Save new/edit profile
    * [x] api/profiles/ [more tings..]
        * [x] Add work experience
        * [x] Delete work experience
        * [x] Add education
        * [x] Delete education
    * [x] api/posts/
        * [x] Create post
        * [x] Delete post
        * [x] Get all posts
        * [x] Get single post by id
    * [x] api/posts/ [more tings..]
        * [x] Like post
        * [x] Unlike post
        * [x] Add comment
        * [x] Remove comment
* [x] Input validation
    * [x] Registration fields
    * [x] Login fields
    * [x] User profile fields
    * [x] Post fields
    * [x] Comment fields  

## Front-end

* [x] Install dependencies
    * [x] react-router-dom
    * [x] axios
    * [x] classnames
    * [x] redux
    * [x] react-redux
    * [x] redux-thunk
* [x] App.js
    * [x] Redux provider & store
    * [x] Check token & maintain user session throughout
* [x] Routes/Protected routes
* [x] Landing
    * [x] Login
        * [x] Display any errors
        * [x] Save user token in browser
        * [x] Decode token
        * [x] Set state to user information
    * [x] Register
        * [x] Display any errors
* [ ] Dashboard
    * [ ] Profile
    * [x] No profile
* [x] Create/Edit profile
* [ ] Developers
* [ ] Posts
    * [ ] Comments
    * [ ] Like



<!-- prettier-ignore-end -->
