import React from 'react';

export const Pages = (props) => {
  const handleClick = (page) => {
    if (props.type === 'articles') {
      props.fetchArticles({ p: page });
    } else {
      props.fetchComments(page);
    }
  };

  return (
    <ul className="page-list">
      {props.pages.map((page, index) => {
        return (
          <li
            className="pages"
            key={page + index}
            onClick={() => handleClick(page)}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
};
