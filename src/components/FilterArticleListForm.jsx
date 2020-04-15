import React, { Component } from 'react';

export class FilterArticleListForm extends Component {
  state = {
    query: {},
  };

  render() {
    return (
      <form>
        <label htmlFor="sort-by">Sort articles by:</label>
        <select id="sort-by" onChange={this.handleChange}>
          <option value="">-</option>
          <option value="created_at">Date created</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Number of comments</option>
        </select>
        <select id="order">
          <option value="">-</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleChange = (event) => {};
}

export default FilterArticleListForm;
