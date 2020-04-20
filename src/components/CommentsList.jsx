import React, { Component } from 'react';
import * as api from '../utils/api';
import Voter from './Voter';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';
import AddCommentForm from './AddCommentForm';
import { formatDate } from '../utils/formatDate';
import moment from 'moment';
import { Pages } from './Pages';

export class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null,
    pages: [],
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = (page) => {
    api
      .getCommentsByArticleId({
        article_id: this.props.article_id,
        page: page || 1,
      })
      .then((comments) => {
        if (comments.length > 1) {
          comments.forEach((comment) => {
            if (comment.created_at) {
              comment.created_at = moment(
                formatDate(comment.created_at),
                'YYYY-MM-DD'
              ).fromNow();
            }
          });
        }
        let pageCount = Math.ceil(comments[0].total_count / 10);

        let pageArr = [];

        if (pageCount) {
          for (let i = 1; i <= pageCount; i++) {
            pageArr.push(i);
          }
        }

        this.setState((currentState) => {
          return {
            comments,
            pages: pageArr.length ? pageArr : currentState.pages,
            isLoading: false,
          };
        });
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
                  <span>{comment.author} </span>
                </h3>
                <p>Posted {comment.created_at}</p>
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
        <Pages
          pages={this.state.pages}
          fetchComments={this.fetchComments}
          type={'comments'}
        />
      </>
    );
  }

  handleDelete = (comment_id) => {
    api
      .deleteCommentByCommentId(comment_id)
      .then(() => {
        this.fetchComments();
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
