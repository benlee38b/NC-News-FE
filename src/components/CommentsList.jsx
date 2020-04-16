import React, { Component } from 'react';
import * as api from '../utils/api';
import Voter from './Voter';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';
import AddCommentForm from './AddCommentForm';

export class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    api
      .getCommentsByArticleId(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        console.dir(err);
        this.setState({
          error: {
            status: err.response.status,
            msg: err.response.data.message,
          },
          isLoading: false,
        });
      });
  };

  render() {
    const { comments, error } = this.state;
    if (error) {
      return (
        <ErrorDisplay
          status={this.state.error.status}
          msg={this.state.error.msg}
        />
      );
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <>
        <AddCommentForm
          article_id={this.props.article_id}
          user={this.props.user}
          fetchComments={this.fetchComments}
        />
        <ul className="comment-list">
          {comments.map((comment) => {
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
                <Voter
                  votes={comment.votes}
                  type={'comments'}
                  comment_id={comment.comment_id}
                />
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  handleDelete = (comment_id) => {
    api
      .deleteCommentByCommentId(comment_id)
      .then(() => {
        this.fetchComments(this.props.article_id);
      })
      .catch((err) => {
        console.dir(err);
        this.setState({
          error: {
            status: err.response.status,
            msg: err.response.data.message,
          },
          isLoading: false,
        });
      });
  };
}

export default CommentsList;
