import React from "react";

const Book = ({ data }) => {
  const { imageUrl, title, authorName} = data;
  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <div>
        <p className="title">{title}</p>
        <p className="author">Author: {authorName}</p>
      </div>
    </div>
  );
};

export default Book;
