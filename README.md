# NC-News-FE

This repo contains the front-end for news app that allows user to interact with an api containing articles on a number of topics. Furthermore the front-end allows users to filter and sort through the article data received from the api requests. The user also has the ability to view comments specific to each article as well as post new comments under a default user and delete comments owned by that user. The app incorporates pagination to allow greater user readability.

The App is hosted using Netlify at https://nc-news-bl.netlify.app/ and interacts with a bespoke backend API which is hosted using Heroku at https://nc-news-app-bl.herokuapp.com. The backend repo can be found at https://github.com/benlee38b/NC-news.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to successfully run this repo on your local machine you will require node version v13.8.0

### cloning & installing

To clone this repo run the below code:

```
git clone https://github.com/benlee38b/NC-News-FE

```

change directory into that repo and open the repo in your preferred code editor, then run:

```
npm install


```

to install dependencies for the app. Axios is being used for the HTTP requests due to the clear promised based structure of the requests, however another HTTP client could be used instead if desired.

### Built With

- [React](https://reactjs.org/) - Web Framework

### Deployment

As mentioned I used Netlify to deploy the App and below are the instructions for deployment:

Create an updated build version of your code:

```
npm run build

```

Deploy to a draft url:

```
cd ./build
netlify deploy

```

review the draft and decide if there is anything that requires changing before deploying the production url.

Deploy to your production url:

```
netlify deploy --prod
```
