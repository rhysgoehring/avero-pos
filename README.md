# Avero Coding Exercise - Greasy Spoon Point of Sale UI

### Running the App
Clone the Repository
```sh
$ git clone https://github.com/rhysgoehring/avero-pos
```

Install dependencies and devDependencies
```sh
$ yarn install
```
Or with NPM:
```sh
$ npm install
```
Start the App:
```sh
$ yarn start
```
or with NPM:
```sh
$ npm start
```

# Assumptions
Since the instructions state that the App will be used to track sales throughout the day,
and because when I asked if the App should be responsive, the response I got was that the
App would be running on a 13 inch screen, I assumed:
  - The App will not be refreshed and will always be online
  - The Redux Store will not be flushed and its data will always be accessible
  - URL's won't be shared or used outside of the restaurant

These assumptions allowed me to make the following important development decisions:
  - When fetching a check or all checks from the server, I mapped properties from checks in the redux store such as orderedItems and tableNumber instead of mapping the response from the server and matching itemId's to get item details or matching tableId's to get table details.
  - Since URL's aren't publically accessible, the app has only two: /checks and /tables, everything else is handled in Modals.

# Planning / Goals
- Going into the project I wanted to keep dependencies to a minimum and not rely on any particular UI Library (material-ui, semantic-ui, etc.) and be responsible for all styling.
- I used Trello to keep track of User Stories outlined in the Business Requirements:        https://trello.com/b/tMTnmro7/avero-pos
- As I was the only developer on the project and occassionally had to stop before completely finishing a user story, rather than adding an issue to the Trello board, I used highlighted TODOs inside my code to easier pick up where I had left off.
- I used Marvel to design the layout of the Tables page: https://marvelapp.com/6j9ffah/screen/56025437
- This gave me an idea of what I wanted the app to look like (sans the Background color) and I used it as a template for the design language of the rest of the App.

**Thank you for the opportunity to prove I can be part of the awesome dev team at Avero!**
