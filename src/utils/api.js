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
      console.log(data);
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const patchVotes = (props, votes) => {
  return request
    .patch(`/${props.type}/${props.article_id || props.comment_id}`, {
      inc_votes: votes,
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
