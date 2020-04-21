import React, { Component } from 'react';
import * as api from '../utils/api';

export class AddCommentForm extends Component {
  state = {
    body: '',
  };

  render() {
    return (
      <form id="add-comment-form" onSubmit={this.handleSubmit}>
        <label htmlFor="new-comment">
          Add a new comment:
          <textarea
            value={this.state.body}
            id="new-comment"
            rows="5"
            cols="60"
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit" id="comment-submit">
          Post
        </button>
      </form>
    );
  }

  handleChange = (event) => {
    const comment = event.target.value;
    this.setState({ body: comment });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .postCommentByArticleId(this.props, this.state.body)
      .then(() => {
        this.setState({ body: '' });
        this.props.fetchComments();
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

export default AddCommentForm;
