# readingList app

## Github link - https://github.com/niallcolbert/readingList

## Hosting link - https://niallcolbert.github.io/readingList/

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# deploy to github pages
$ npm run deploy
```

## Technologies

The project was completed in JavaScript, using Vue.js and Nuxt.js. UI is using vue-bootstrap.

The app is frontend only, so data is being stored in local storage. A Vuex store is being used to handle state data, while the nuxt-vuex-localstorage node-module is automatically saving all Vuex changes encrypted to local storage. 

## Version control and hosting

For version control I've opted for github. Due to the small scale of the project, and working alone, I stuck with creating a new branch from main for each feature, then PR and merge directly back to main before moving on.

The hosting is being done using github pages. The app's static files are being generated and pushed on a gh_pages branch which auto deploys.

## Additional functionality

### Get book detail via API

Since the book object was to include the ISBN by default, I am capitalising on the openlibrary API to retrieve the rest of the book details as a way of saving the user time on manual entry.

Manual entry is still an option, and is often still necessary with a successful GET call to the API, as the author details are not included for eveybook through the API.

### Import from YAML/Import from Pantry

Expanding on the initial requirement for export functionality, I've also included import. The app can accept a .yaml file and parse the contents into the Vuex store, or it can use the same Pantry ID and Basket Name from the export to perform a GET against Pantry and populate the Vuex store that way.

This feature makes up for the frontend only, single tenancy nature of the app relying on localstorage. The ability to feed the app a .yaml file or capitalise on a cloud storage account allows the same list to be consumed cross-browser/cross-device.

### Star ratings

Each book can be assigned a rating of 1-5 stars. More useful in a public profile reading list like you'd find somewhere like Goodreads, but still a nice little extra for the user who likes to track these things.
