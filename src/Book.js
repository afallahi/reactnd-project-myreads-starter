import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {
    const { book, shelf } = props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`, }} />
              <BookShelfChanger book={book} shelf={shelf} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }

 export default Book 