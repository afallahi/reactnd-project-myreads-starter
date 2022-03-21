import React from 'react'
import Book from './Book'

const Bookshelf = props => {
    const {shelf, books} = props
    const shelfBooksList = books.filter(book => book.shelf === shelf.key)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { shelfBooksList.map(book => (
              <Book key={book.id} book={book} shelf={shelf.key} />
            )) }
          </ol>
        </div>
      </div>
    )
  }

export default Bookshelf