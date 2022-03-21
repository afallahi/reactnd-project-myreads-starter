import React, { Component } from 'react'
import CloseSearchButton from './CloseSearchButton'
import Book from './Book'
import SearchBooksInputWrapper from './SearchBooksInputWrapper'

class BookSearch extends Component {
    render() {
      const { existingBooks, searchBooks, onSearch, onVoidSearch, onMove } = this.props
      return (
        <div className="search-books">
          <SearchBooksBar onSearch={onSearch} onVoidSearch={onVoidSearch} />
          <SearchBookResults existingBooks={existingBooks} searchBooks={searchBooks} onMove={onMove} />
        </div>
      )
    }
  }

  const SearchBooksBar = props => {
    const {onSearch, onVoidSearch} = props;
      return (
        <div className="search-books-bar">
          <CloseSearchButton onVoidSearch={onVoidSearch} />
          <SearchBooksInputWrapper onSearch={onSearch} />
      </div>
      );
  }
  
  const SearchBookResults = props => {
    const {existingBooks, searchBooks, onMove} = props
    console.log(existingBooks)
    const booksUpdate = searchBooks.map(book => {
        existingBooks.map(otherBook => {
            if(book.id === otherBook.id) {
                book.shelf = otherBook.shelf
            }
            return otherBook
        });
        return book
    });
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {booksUpdate.map(book => (
            <Book key={book.id} book={book} shelf={book.shelf ? book.shelf : "none"} onMove={onMove} />
          ))}
        </ol>
    </div>
    )
  }  
  

  export default BookSearch
  