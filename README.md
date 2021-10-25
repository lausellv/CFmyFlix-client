# CFmyFlix - client-side

CFmyFlix Application is the front end client built to work with my myFLix - server side API. (Movie App)

# goal
Building the client-side of the myFlix app by creating an SPA using React to render the data stored in mongoDB. The client and the server side communicate through https://github.com/lausellv/CFmovie_api. 
# purpose
Provides users with access to information about different movies , directors and genres.  Users can register, select their favorite movies and update their profile.

# features
- Allows users to see a list of all movies in the database
- Allows users to get detailed information about a single movie by movie title
- Allows users to get detailed information about a genre by genre name
- Allows users to get detailed information about a director by name
- Allows new users to create an user account
- Allows existing users to update their user info or to delete their account
- Allows existing users to add or remove movies to/from their list of favorites

# Stack, Dependencies, Environment, Hosting
### Stack, Tools Used: 
-React

### Dependencies:
   "axios": "^0.21.1",
    "parcel": "^2.0.0-beta.3.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-devtools-extension": "^2.13.9"
    "@parcel/transformer-sass": "^2.0.0-beta.3.1"

### Environment
- VS code v1.61.2
- npm v7.24.1
- Node.js v14.15.4

### Hosting:
Run "parcel src/index.html" for a dev server. Navigate to `http://localhost:1234/`.

# Project status
-complete


