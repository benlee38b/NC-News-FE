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
        order: query.order,
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
      return data;
    });
};

export const getCommentsByArticleId = (article_id, page) => {
  return request
    .get(`articles/${article_id}/comments`, {
      params: {
        p: page,
      },
    })
    .then(({ data }) => {
      return data.comments.data;
    });
};

export const deleteCommentByCommentId = (comment_id) => {
  return request.delete(`comments/${comment_id}`);
};

export const postCommentByArticleId = (props, body) => {
  return request
    .post(`articles/${props.article_id}/comments`, {
      body: body,
      username: props.user,
    })
    .then(({ data }) => {
      return data;
    });
};
