import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-app-bl.herokuapp.com/api/',
});

export const getTopics = () => {
  return request.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (query) => {
  return request
    .get('/articles', {
      params: {
        sort_by: query.sort_by,
        limit: query.limit,
        p: query.p,
        author: query.author,
        topic: query.topic,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};
