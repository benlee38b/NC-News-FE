import React, { Component } from 'react';
import * as api from '../utils/api';

export class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    console.log(this.props.user);
    api.getCommentsByArticleId(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };

  render() {
    // const { comments } = this.state;
    return this.state.isLoading ? (
      <p>Loading....</p>
    ) : (
      <ul className="comment-list">
        {this.state.comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-list-item">
              <h3>
                <span>{comment.author} on </span>
                {comment.created_at}
              </h3>
              {this.props.user === comment.author ? (
                <button onClick={() => this.handleDelete(comment.comment_id)}>
                  Delete Comment
                </button>
              ) : null}
              <h4>Total votes: {comment.votes}</h4>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }

  handleDelete = (comment_id) => {
    api.deleteCommentByCommentId(comment_id).then(() => {
      this.fetchComments(this.props.article_id);
    });
  };
}

export default CommentsList;
