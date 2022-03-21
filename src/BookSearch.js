import React, { Component } from 'react'
import CloseSearchButton from './CloseSearchButton'
import Book from './Book'
import SearchBooksInputWrapper from './SearchBooksInputWrapper'

class BookSearch extends Component {
    render() {
      const { books, onSearch, onVoidSearch } = this.props
      return (
        <div className="search-books">
          <SearchBooksBar onSearch={onSearch} onVoidSearch={onVoidSearch} />
          <SearchBookResults books={books} />
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
    const {books} = props
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} shelf="none" />
          ))}
        </ol>
    </div>
    )
  }  
  

  export default BookSearch
  