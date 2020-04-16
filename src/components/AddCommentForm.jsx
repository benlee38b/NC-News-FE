import React, { Component } from 'react';
import * as api from '../utils/api';

export class AddCommentForm extends Component {
  state = {
    body: '',
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-comment">
          <textarea
            id="new-comment"
            rows="5"
            cols="50"
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Post</button>
      </form>
    );
  }

  handleChange = (event) => {
    const comment = event.target.value;
    this.setState({ body: comment }, () => {
      console.log(this.state.body);
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .postCommentByArticleId(this.props, this.state.body)
      .then(() => {
        this.props.fetchArticle();
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
